import AudioModule from './AudioModule.js';
import MidiEvent from '../events/MidiEvent.js';

const NOTE_OFF = 128;
const NOTE_ON = 144;
const PITCH_BEND = 224;
const CONTROLLER = 176;
const MOD_WHEEL = 1;

export default class SoftKeyboardModule extends AudioModule {
    _initialise() {
        super._initialise()
        this._downKeys = [];
        this._currentNote = undefined;

        this._isTouchDevice = (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));

        this._keyboard = document.querySelector('.keyboard');
        if (this._isTouchDevice) {
            this._notesTouched = [];
            this._keyboard.addEventListener('touchstart', evt => this._onKeyTouchStart(evt))
        } else {
            this._keyboard.addEventListener('mousedown', evt => this._onKeyMouseDown(evt))
        }

        this._eventBus.addEventListener(MidiEvent.type, evt => this._onMidiEvent(evt))
    }

    get _initialState() {
        return {
            velocity: 70,
        }
    }

    _onMidiEvent(evt) {
        const { statusByte, dataByte1 } = evt.detail;
        if (statusByte >= 128 && statusByte <= 143) {
            const key = this._keyboard.querySelector(`.key[data-note="${dataByte1}"]`);
            key.classList.toggle('down', false);
        } else if (statusByte >= 144 && statusByte <= 159) {
            const key = this._keyboard.querySelector(`.key[data-note="${dataByte1}"]`);
            key.classList.toggle('down', true);
        }
    }

    _onKeyMouseDown(evt) {
        evt.preventDefault();
        const key = evt.target;
        if (key.classList.contains('key')) {
            const note = Number(key.getAttribute('data-note'));
            this._eventBus.dispatchEvent(new MidiEvent(NOTE_ON, note, this._state.get('velocity')));
            this._currentNote = note;
            document.body.addEventListener('mousemove', this._onKeyMouseMove);
            document.body.addEventListener('mouseup', this._onKeyMouseUp);
        }
    }

    _onKeyMouseMove = evt => {
        evt.preventDefault();
        const key = document.elementFromPoint(evt.pageX, evt.pageY);
        if (key.classList.contains('key')) {
            const note = Number(key.getAttribute('data-note'));
            if (note !== this._currentNote) {
                this._eventBus.dispatchEvent(new MidiEvent(NOTE_ON, note, this._state.get('velocity')));
                this._eventBus.dispatchEvent(new MidiEvent(NOTE_OFF, this._currentNote, this._state.get('velocity')));
                this._currentNote = note;
            }
        } else {
            this._eventBus.dispatchEvent(new MidiEvent(NOTE_OFF, this._currentNote, this._state.get('velocity')));
            delete this._currentNote;
        }
    }

    _onKeyMouseUp = evt => {
        evt.preventDefault();
        if (this._currentNote) {
            this._eventBus.dispatchEvent(new MidiEvent(NOTE_OFF, this._currentNote, this._state.get('velocity')));
            delete this._currentNote;
            document.body.removeEventListener('mousemove', this._onKeyMouseMove);
            document.body.removeEventListener('mouseup', this._onKeyMouseUp);
        }
    }

    _onKeyTouchStart(evt) {
        evt.preventDefault();
        const key = evt.target;
        if (key.classList.contains('key')) {
            const note = Number(key.getAttribute('data-note'));
            this._eventBus.dispatchEvent(new MidiEvent(NOTE_ON, note, this._state.get('velocity')));
            this._notesTouched.includes(note) || this._notesTouched.push(note);
            key.addEventListener('touchmove', this._onKeyTouchMove);
            key.addEventListener('touchcancel', this._onKeyTouchCancel);
            key.addEventListener('touchend', this._onKeyTouchEnd);
        }
    }

    _compareNotesTouched(evt) {
        const notesTouched = [];
        Array.from(evt.touches).forEach(touch => {
            const key = document.elementFromPoint(touch.pageX, touch.pageY);
            if (key.classList.contains('key')) {
                const note = Number(key.getAttribute('data-note'));
                notesTouched.includes(note) || notesTouched.push(note);
            }
        });
        // any notes newly in the array trigger a keyDown
        notesTouched.filter(note => !this._notesTouched.includes(note)).forEach(note => {
            this._eventBus.dispatchEvent(new MidiEvent(NOTE_ON, note, this._state.get('velocity')));
        });
        // any notes now missing trigger a keyUp
        this._notesTouched.filter(note => !notesTouched.includes(note)).forEach(note => {
            this._eventBus.dispatchEvent(new MidiEvent(NOTE_OFF, this._currentNote, this._state.get('velocity')));
        });
        this._notesTouched = notesTouched;
    }

    _onKeyTouchMove = evt => {
        evt.preventDefault();
        this._compareNotesTouched(evt);
    }

    _onKeyTouchCancel = evt => {
        evt.preventDefault();
        this._onKeyTouchEnd(evt);
    }

    _onKeyTouchEnd = evt => {
        evt.preventDefault();
        this._compareNotesTouched(evt);
        const key = evt.target;
        key.removeEventListener('touchmove', this._onKeyTouchMove);
        key.removeEventListener('touchcancel', this._onKeyTouchCancel);
        key.removeEventListener('touchend', this._onKeyTouchEnd);
    }
}
