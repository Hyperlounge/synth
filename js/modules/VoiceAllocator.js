import AudioModule from './AudioModule.js';
import MidiEvent from '../events/MidiEvent.js';
import NoteChangeEvent from '../events/NoteChangeEvent.js';
import PolyVoice from './PolyVoice.js';


export default class VoiceAllocator extends AudioModule {
    _initialise() {
        super._initialise();

        this._pitches = new PolyVoice(() => {
            const pitch = new this._audioContext.createConstantSource();
            pitch.start();
            return pitch;
        }, pitch => {
            pitch.stop();
        });
        this._initializeVoices();

        this._eventBus.addEventListener(MidiEvent.type, event => this._onMIDIMessage(event));
    }

    get _initialPatch() {
        return {
            glideTime: 0,
        }
    }

    _onGlobalPatchChange(evt) {
        super._onGlobalPatchChange(evt);
        this._globalPatch.hasChanged('totalVoices', this._initializeVoices);
    }

    _initializeVoices() {
        const { totalVoices } = this.globalPatch;
        this._usedVoices = [];
        this._freeVoices = Array(totalVoices).fill().map((item, i) => i);
        this._pitches.totalVoices = totalVoices;
        this._downNotes = [];
    }

    _onMIDIMessage(event) {
        const { statusByte, dataByte1, dataByte2 } = event.detail;
        if (statusByte >= 128 && statusByte <= 143) {
            this._onKeyUp(dataByte1, dataByte2);
        } else if (statusByte >= 144 && statusByte <= 159) {
            this._onKeyDown(dataByte1, dataByte2);
        }
    }

    _onKeyDown(note, velocity) {
        this._downNotes.unshift(note);
        let voiceNumber, oldNote;
        if (this._freeVoices.length) {
            voiceNumber = this._freeVoices.shift();
            this._usedVoices.push({voiceNumber, note});
        } else {
            const stolenVoice = this._usedVoices.shift();
            voiceNumber = stolenVoice.voiceNumber;
            oldNote = stolenVoice.note;
            this._usedVoices.push({voiceNumber, note});
        }
        this._eventBus.dispatchEvent(new NoteChangeEvent(note, oldNote, voiceNumber, velocity));
        this._setPitch(voiceNumber, note);
    }

    _onKeyUp(note, velocity) {
        let newNote;
        this._downNotes = this._downNotes.filter(item => item !== note);
        const usedVoice = this._usedVoices.find(item => item.note === note);
        if (usedVoice) {
            let voiceNumber = usedVoice.voiceNumber;
            if (this.globalPatch.totalVoices === 1 && this._downNotes.length) {
                newNote = this._downNotes.shift();
                usedVoice.note = newNote;
            } else {
                this._usedVoices = this._usedVoices.filter(item => item.voiceNumber !== voiceNumber);
                this._freeVoices.push(voiceNumber);
            }
            this._eventBus.dispatchEvent(new NoteChangeEvent(newNote, note, voiceNumber, velocity));
            newNote && this._setPitch(voiceNumber, newNote);
        }
    }

    _setPitch(voiceNumber, note) {
        const middleCOffset = (note - 60) * 100;
        this._pitches.voices[voiceNumber].offset.setTargetAtTime(middleCOffset, this._now, Math.max(this._patch.get('glideTime'), this._minimumTimeConstant));
    }

    get C4Offset() {
        return this._pitches;
    }
}
