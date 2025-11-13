import AudioModule from './AudioModule.js';
import MidiEvent from '../events/MidiEvent.js';
import '../components/KeyboardAdjuster.js';
import '../components/CycleSwitch.js';

function mapRange(a, b, func) {
    return Array.from(Array(b - a + 1)).map((item, index) => func(index + a));
}

const template = data => `
<div class="keyboard-controls">
    <keyboard-adjuster 
        id="keyboard-adjuster"
        bottom-note="${data.bottomNote}"
        top-note="${data.topNote}"
        data-module="keyboard"
        data-control="adjuster"
    > </keyboard-adjuster>
    <span>Keys:</span>
    <button class="keyboard-range" value="88">88</button>
    <button class="keyboard-range" value="61">61</button>
    <button class="keyboard-range" value="49">49</button>
    <button class="keyboard-range" value="default">Reset</button>
    <cycle-switch id="keyboard-velocity" data-module="keyboard" data-control="velocity" format="horizontal" title="">
        ${data.isTouchDevice ? `<option value="touch" ${data.velocity === 'touch' ? 'selected' : ''}>TOUCH</option>` : ''}
        <option value="position" ${data.velocity === 'position' ? 'selected' : ''}>POS&apos;N</option>
        <option value="100" ${data.velocity === '100' ? 'selected' : ''}>MAX</option>
        <option value="70" ${data.velocity === '70' ? 'selected' : ''}>70%</option>
        <option value="50" ${data.velocity === '50' ? 'selected' : ''}>50%</option>
        <option value="30" ${data.velocity === '30' ? 'selected' : ''}>30%</option>
    </cycle-switch>
</div>
<div class="keyboard-keys">${keyBoardTemplate(data)}</div>
`;

const keyBoardTemplate = data => `
<div class="ivory keys">
    ${mapRange(data.bottomNote, data.topNote, note => {
        const octave = Math.floor(note / 12) - 1;
        const noteInOctave = note % 12;
        const addLabel = noteInOctave === 0;
        const isEbony = [1, 3, 6, 8, 10].includes(noteInOctave);
        return isEbony ? '' : `<div class="key ${addLabel ? 'with-label' : ''} ${note === 60 ? 'middle-c' : ''}" data-note="${note}">${addLabel ? octave : '0'}</div>`;
    }).join('')}
</div>
<div class="ebony keys">
    <div class="first spacer"> </div>
    ${mapRange(data.bottomNote, data.topNote, note => {
        const noteInOctave = note % 12;
        const isEbony = [1, 3, 6, 8, 10].includes(noteInOctave);
        return `${isEbony ? `<div class="key note-${noteInOctave}" data-note="${note}"> </div>` : `<div class="spacer"> </div>`}`;
    }).join('')}
    <div class="last spacer"> </div>
</div>
`

export default class SoftKeyboardModule extends AudioModule {
    _initialise() {
        super._initialise()
        this._downKeys = [];
        this._currentNote = undefined;
        this._isTouchDevice = !this._options.mousePointer;

        this._render();

        this._keyboard = document.querySelector('.keyboard-keys');
        if (this._isTouchDevice) {
            this._notesTouched = [];
            this._keyboard.addEventListener('touchstart', evt => this._compareNotesTouched(evt));
            this._keyboard.addEventListener('touchmove', evt => this._compareNotesTouched(evt));
            this._keyboard.addEventListener('touchcancel', evt => this._compareNotesTouched(evt));
            this._keyboard.addEventListener('touchend', evt => this._compareNotesTouched(evt));

        } else {
            this._keyboard.addEventListener('mousedown', evt => this._onKeyMouseDown(evt));
        }

        Array.from(document.querySelectorAll('button.keyboard-range')).forEach(button => {
            button.addEventListener('click', evt => this._onKeyboardRangeClick(evt));
        })

        this._eventBus.addEventListener(MidiEvent.type, evt => this._onMidiEvent(evt));

        document.getElementById('keyboard-adjuster').addEventListener('input', evt => {
            this._state.set({
                bottomNote: evt.target.bottomNote,
                topNote: evt.target.topNote,
            });
            this._update();
        });

        document.getElementById('keyboard-velocity').addEventListener('change', evt => {
            this._state.set({
                velocity: evt.target.value,
            });
            this._update();
        });
    }

    get _initialState() {
        return {
            velocity: this._isTouchDevice ? 'touch' : '70',
            bottomNote: 45,
            topNote: 84,
            isTouchDevice: this._isTouchDevice,
        }
    }

    _render() {
        document.querySelector('.keyboard').innerHTML = template(this._state.attributes);
    }

    _update() {
        document.querySelector('.keyboard-keys').innerHTML = keyBoardTemplate(this._state.attributes);
        const adjuster = document.getElementById('keyboard-adjuster');
        adjuster.bottomNote = this._state.get('bottomNote');
        adjuster.topNote = this._state.get('topNote');
    }

    _onKeyboardRangeClick(evt) {
        const { bottomNote, topNote } = this._state.attributes;
        switch (evt.target.value) {
            case 'transpose-down':
                if (bottomNote > 21) {
                    this._state.set({
                        bottomNote: bottomNote - 12,
                        topNote: topNote - 12,
                    });
                }
                break;
            case 'transpose-up':
                if (topNote < 108) {
                    this._state.set({
                        bottomNote: bottomNote + 12,
                        topNote: topNote + 12,
                    });
                }
                break;
            case 'fewer-octaves':
                if (topNote - bottomNote > 24) {
                    this._state.set({
                        topNote: topNote - 12,
                    });
                }
                break;
            case 'more-octaves':
                if (topNote - bottomNote < 87) {
                    let newBottom = bottomNote;
                    let newTop = topNote + 12;
                    if (topNote > 96) {
                        newBottom -= 12;
                        newTop -= 12;
                    }
                    this._state.set({
                        topNote: newTop,
                        bottomNote: newBottom,
                    });
                }
                break;
            case '88':
                this._state.set({
                    topNote: 108,
                    bottomNote: 21,
                });
                break;
            case '76':
                this._state.set({
                    topNote: 103,
                    bottomNote: 28,
                });
                break;
            case '61':
                this._state.set({
                    topNote: 96,
                    bottomNote: 36,
                });
                break;
            case '49':
                this._state.set({
                    topNote: 84,
                    bottomNote: 36,
                });
                break;
            case 'default':
                this._state.set(this._initialState);
                break;
        }
        this._update();
    }

    _onMidiEvent(evt) {
        const { statusByte, dataByte1 } = evt.detail;
        if (statusByte >= 128 && statusByte <= 143) {
            const key = this._keyboard.querySelector(`.key[data-note="${dataByte1}"]`);
            key && key.classList.toggle('down', false);
        } else if (statusByte >= 144 && statusByte <= 159) {
            const key = this._keyboard.querySelector(`.key[data-note="${dataByte1}"]`);
            key && key.classList.toggle('down', true);
        }
    }

    _onKeyMouseDown(evt) {
        evt.preventDefault();
        const key = evt.target;
        if (key.classList.contains('key')) {
            const velocity = this.state.velocity === 'position' ? Math.floor(128*evt.offsetY/key.offsetHeight) : Math.floor(parseInt(this.state.velocity)*1.28);
            const note = Number(key.getAttribute('data-note'));
            this._eventBus.dispatchEvent(new MidiEvent(MidiEvent.NOTE_ON, note, velocity));
            this._currentNote = note;
            document.body.addEventListener('mousemove', this._onKeyMouseMove);
            document.body.addEventListener('mouseup', this._onKeyMouseUp);
        }
    }

    _onKeyMouseMove = evt => {
        const key = document.elementFromPoint(evt.pageX, evt.pageY);
        if (key.classList.contains('key')) {
            const note = Number(key.getAttribute('data-note'));
            if (note !== this._currentNote) {
                const velocity = this.state.velocity === 'position' ? Math.floor(128*evt.offsetY/key.offsetHeight) : Math.floor(parseInt(this.state.velocity)*1.28);
                this._eventBus.dispatchEvent(new MidiEvent(MidiEvent.NOTE_ON, note, velocity));
                this._eventBus.dispatchEvent(new MidiEvent(MidiEvent.NOTE_OFF, this._currentNote, 70));
                this._currentNote = note;
            }
        } else {
            this._eventBus.dispatchEvent(new MidiEvent(MidiEvent.NOTE_OFF, this._currentNote, 70));
            delete this._currentNote;
            document.body.removeEventListener('mousemove', this._onKeyMouseMove);
            document.body.removeEventListener('mouseup', this._onKeyMouseUp);
        }
    }

    _onKeyMouseUp = evt => {
        if (this._currentNote) {
            this._eventBus.dispatchEvent(new MidiEvent(MidiEvent.NOTE_OFF, this._currentNote, this._state.get('velocity')));
            delete this._currentNote;
            document.body.removeEventListener('mousemove', this._onKeyMouseMove);
            document.body.removeEventListener('mouseup', this._onKeyMouseUp);
        }
    }

    _compareNotesTouched(evt) {
        evt.preventDefault();
        const notesTouched = [];
        const pressures = {};
        Array.from(evt.touches).forEach(touch => {
            const key = document.elementFromPoint(touch.pageX, touch.pageY);
            if (key.classList.contains('key')) {
                const note = Number(key.getAttribute('data-note'));
                if (!notesTouched.includes(note)) {
                    notesTouched.push(note);
                }
                pressures[note] = touch.radiusX / 20;
            }
        });
        // any notes newly in the array trigger a keyDown
        notesTouched.filter(note => !this._notesTouched.includes(note)).forEach(note => {
            this._eventBus.dispatchEvent(new MidiEvent(MidiEvent.NOTE_ON, note, this._state.get('velocity') * pressures[note]));
        });
        // any notes now missing trigger a keyUp
        this._notesTouched.filter(note => !notesTouched.includes(note)).forEach(note => {
            this._eventBus.dispatchEvent(new MidiEvent(MidiEvent.NOTE_OFF, note, this._state.get('velocity')));
        });
        this._notesTouched = notesTouched;
    }
}
