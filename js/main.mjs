import Model from './Model.js';
import OscillatorView from './OscillatorView.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start').addEventListener('click', () => {
        startSynth();
    });
})

function startSynth() {
    let midi = null; // global MIDIAccess object

    const state = new Model({
        currentNote: null,
        baseFrequency: 440,
        pitchBend: 0,
        modWheel: 0,
    });

    const defaultOscillatorState = {
        waveform: 'sine',
        range: 1,
        tune: 0,
        fineTune: 0,
        level: 50,
    }
    const defaultEnvelopeState = {
        attack: 0,
        decay: 0,
        sustain: 100,
        release: 0,
    }
    const storedPatch = localStorage.getItem('synth-patch');
    const patch = new Model({
        oscillator1: new Model(defaultOscillatorState),
        oscillator2: new Model(defaultOscillatorState),
        loudnessEnvelope: new Model(defaultEnvelopeState),
    });
    if (storedPatch) {
        patch.set(JSON.parse(storedPatch));
    }
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('synth-patch', JSON.stringify(patch.attributes));
    });

    const oscillatorViews = [
        new OscillatorView('oscillator-1', patch.get('oscillator1')),
        new OscillatorView('oscillator-2', patch.get('oscillator2')),
    ]

    const smoothingInterval = 0.02;

    function onMIDISuccess(midiAccess) {
        console.log("MIDI ready!", midiAccess);
        for (const entry of midiAccess.inputs) {
            const input = entry[1];
            console.log(
                `Input port [type:'${input.type}']` +
                ` id:'${input.id}'` +
                ` manufacturer:'${input.manufacturer}'` +
                ` name:'${input.name}'` +
                ` version:'${input.version}'`
            );
        }
        midiAccess.inputs.forEach((entry) => {
            entry.onmidimessage = onMIDIMessage;
        });
        midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
    }

    function onMIDIFailure(msg) {
        console.error(`Failed to get MIDI access - ${msg}`);
    }
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

    function onMIDIMessage(event) {
        const message = event.data;
        switch (message[0]) {
            case 159:
                onKeyDown(message[1], message[2]);
                break;
            case 143:
                onKeyUp(message[1], message[2]);
                break;
            case 239:
                onPitchBend(message[2]);
        }
        let str = ``;
        for (const character of event.data) {
            str += `${character.toString(10)} `;
        }
        console.log(event.data[0], str);
    }


    function onKeyDown(note, velocity) {
        state.set({
            baseFrequency: 440 * Math.pow(2, (note - 69)/12),
            currentNote: note,
        });
        updateAllOscillators();
        const now = audioContext.currentTime;
        gainNode.gain.setTargetAtTime(velocity/200, now, smoothingInterval);
    }

    function onKeyUp(note, velocity) {
        if (note === state.get('currentNote')) {
            const now = audioContext.currentTime;
            gainNode.gain.setTargetAtTime(0, now, smoothingInterval);
        }
    }

    function onPitchBend(value) {
        state.set({pitchBend: (value - 64)/32});
        updateAllOscillators();
    }

    function updateOscillator(index) {
        const osc = oscillators[index];
        const model = patch.get('oscillator' + (index + 1));
        const { baseFrequency, pitchBend } = state.attributes;
        const { waveform, range, tune, fineTune, level } = model.attributes;
        const multiplier = range * Math.pow(2, tune/12) * Math.pow(2, fineTune/12);
        osc.type = waveform;
        osc.frequency.setTargetAtTime(baseFrequency * Math.pow(2, pitchBend/12) * multiplier, audioContext.currentTime, 0.01)
    }

    function updateAllOscillators() {
        updateOscillator(0);
        updateOscillator(1);
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const oscillators = [osc1, osc2];

    oscillators.forEach((osc, index) => {
        updateOscillator(index);
        patch.get('oscillator' + (index + 1)).addEventListener('change', evt => {
            updateOscillator(index);
        })
        osc.connect(gainNode);
        osc.start();
    });

}
