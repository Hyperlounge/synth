import ModularSynth from './modules/ModularSynth.js';

function mapRange(a, b, func) {
    return Array.from(Array(b - a + 1)).map((item, index) => func(index + a));
}


function verticalSlider(id, label, min, max, list) {
    const isValuesList = !!(!!list && !!list.length && typeof list[0] === 'object');
    return `
    <span class="control">
        <label>${label}</label>
        <div class="control-body">
            <input id="${id}" type="range" min="${min}" max="${max}" ${isValuesList ? `list="${id}-values"` : ''} orient="vertical"/>   
            ${isValuesList ? `
            <datalist id="${id}-values">
                ${list.map(item => `<option value="${item.value}"></option>`).join('')}
            </datalist>
            ` : ''}
            ${!!list && !!list.length ? `
            <div class="labels">
                ${list.map(item => `<div class="label">${isValuesList ? item.label || '' : item}</div>`).join('')}
            </div>
            ` : ''}
        </div>
    </span>
    `
}

const labels0to10 = [10,9,8,7,6,5,4,3,2,1,0];
const labels0to10log = [10,5,2.5,1.2,600,300,150,70,30,10,0];

const waveforms = [
    {value: '3', label: 'SIN', param: 'sine'},
    {value: '2', label: 'TRI', param: 'triangle'},
    {value: '1', label: 'SAW', param: 'sawtooth'},
    {value: '0', label: 'SQU', param: 'square'},
];

const lfoWaveforms = [
    {value: '4', label: 'SIN', param: 'sine'},
    {value: '3', label: 'TRI', param: 'triangle'},
    {value: '2', label: 'SAW', param: 'sawtooth'},
    {value: '1', label: 'WAS', param: 'inverse-sawtooth'},
    {value: '0', label: 'SQU', param: 'square'},
];

const filterTypes = [
    {value: '2', label: 'HIGH', param: 'highpass'},
    {value: '1', label: 'BAND', param: 'bandpass'},
    {value: '0', label: 'LOW', param: 'lowpass'},
];

const oscTemplate = id => `
<div class="control-group">
    ${verticalSlider(`${id}-waveform`, 'Wave', 0, 3, waveforms)}
    ${verticalSlider(`${id}-range`, 'Range', -2, 2, [
        {value: 2, label: '32'},
        {value: 1, label: '16'},
        {value: 0, label: '8'},
        {value: -1, label: '4'},
        {value: -2, label: '2'},
    ])}
    ${verticalSlider(`${id}-tune`, 'Tune', -7, 7, [
        {value: 7, label: '+7'},
        {value: 6},
        {value: 5},
        {value: 4},
        {value: 3},
        {value: 2},
        {value: 1},
        {value: 0, label: '0'},
        {value: -1},
        {value: -2},
        {value: -3},
        {value: -4},
        {value: -5},
        {value: -6},
        {value: -7, label: '-7'},
    ])}
    ${verticalSlider(`${id}-fine-tune`, 'Fine', -50, 50, ['+0.5', '0', '–0.5'])}
    ${verticalSlider(`${id}-level`, 'Level', 0, 100, labels0to10)}
</div>
`;

const ADSRTemplate = id => `
<div class="control-group">
    ${verticalSlider(`${id}-attack`, 'Attack', 0, 100, labels0to10log)}
    ${verticalSlider(`${id}-decay`, 'Decay', 0, 100, labels0to10log)}
    ${verticalSlider(`${id}-sustain`, 'Sustain', 0, 100, labels0to10)}
    ${verticalSlider(`${id}-release`, 'Release', 0, 100, labels0to10log)}
    ${verticalSlider(`${id}-velocity`, 'Velocity', 0, 100, labels0to10)}
</div>
`;

const controllersTemplate = `
<div class="control-group">
    ${verticalSlider(`voices`, 'Voices', 0, 8, [
        {value: 8, label: '8'},
        {value: 7, label: '7'},
        {value: 6, label: '6'},
        {value: 5, label: '5'},
        {value: 4, label: '4'},
        {value: 3, label: '3'},
        {value: 2, label: '2'},
        {value: 1, label: '1'},
        {value: 0, label: 'legato'},
    ])}
    ${verticalSlider(`glide-time`, 'Glide', 0, 100, labels0to10log)}
</div>
`;

function bindControl(controlId, module, parameterName, controlToParam = a => Number(a), paramToControl = a => String(a)) {
    const control = document.getElementById(controlId);
    if (!control) {
        throw new Error(`control #${controlId} does not exist.`)
    }
    const updateControl = evt => {
        if (control.type === 'checkbox') {
            control.checked = module.getParam(parameterName);
        } else {
            control.value = paramToControl(module.getParam(parameterName));
        }
    }
    updateControl();
    const updateModule = evt => {
        if (control.type === 'checkbox') {
            module.setParam(parameterName, control.checked);
        } else {
            module.setParam(parameterName, controlToParam(control.value));
        }
    }
    control.addEventListener(control.type === 'checkbox' ? 'change' : 'input', updateModule);
}

function linearToLog(linearMax, logMax, logMin = 0) {
    return linear => (Math.pow(2, 10*Number(linear)/linearMax) - 1) * logMax / 1023;
}

function logToLinear(logMax, linearMax, logMin = 0) {
    return log => Math.log2(1023 * Number(log)/logMax + 1) * linearMax/10;
}

function linearToLogRange(linearMax, logMin, logMax) {
    const maxValue = Math.log2(logMax);
    const minValue = Math.log2(logMin);

    return linear => {
        const value = minValue + (Number(linear)/linearMax)*(maxValue-minValue);
        return Math.pow(2, value);
    }
}

function logRangeToLinear(logMin, logMax, linearMax) {
    const maxValue = Math.log2(logMax);
    const minValue = Math.log2(logMin);

    return log => {
        const value = Math.log2(Number(log));
        return linearMax * (value-minValue)/(maxValue-minValue);
    }
}

function optionToParam(list) {
    return a => list.find(item => item.value === a).param;
}

function paramToOption(list) {
    return a => list.find(item => item.param === a).value;
}

export default class PolySynth extends ModularSynth {
    constructor(elementId) {
        super();
        this._root = document.getElementById(elementId);

        this._render();

        this._softKeyboard = this.createSoftKeyboardModule('softKeyboard');
        this._voiceAllocator = this.createVoiceAllocatorModule('voiceAllocator');
        this._osc1 = this.createPolyOscillatorModule('osc1');
        this._amplifier = this.createPolyAmpModule('amplifier');
        this._loudnessEnvelope = this.createPolyEnvelopeModule('loudnessEnvelope');

        this.loadPatch();
        window.addEventListener('unload', () => {
            this.savePatch();
        });

        bindControl('glide-time', this._voiceAllocator, 'glideTime', linearToLog(100, 10), logToLinear(10, 100));
        bindControl('voices', this._voiceAllocator, 'numberOfVoices');
        const bindOscillator = number => {
            const osc = this[`_osc${number}`];
            bindControl(`oscillator-${number}-waveform`, osc, 'waveform', optionToParam(waveforms), paramToOption(waveforms));
            bindControl(`oscillator-${number}-range`, osc, 'range');
            bindControl(`oscillator-${number}-tune`, osc, 'tune');
            bindControl(`oscillator-${number}-fine-tune`, osc, 'fineTune');
        }
        bindOscillator(1);

        const bindADSR = (id, module) => {
            bindControl(`${id}-attack`, module, 'attackSeconds', linearToLog(100, 10), logToLinear(10, 100));
            bindControl(`${id}-decay`, module, 'decaySeconds', linearToLog(100, 10), logToLinear(10, 100));
            bindControl(`${id}-sustain`, module, 'sustainLevel', a => Number(a)/100, a => String(a*100));
            bindControl(`${id}-release`, module, 'releaseSeconds', linearToLog(100, 10), logToLinear(10, 100));
            bindControl(`${id}-velocity`, module, 'velocityAmount', a => Number(a)/100, a => String(a*100));
        }
        bindADSR('loudness-envelope', this._loudnessEnvelope);

        this._voiceAllocator.C4Offset.connect(this._osc1.offsetCentsIn);
        this._osc1.audioOut.connect(this._amplifier.audioIn);
        //this._osc1.audioOut.connect(this.audioContext.destination);
        //this._loudnessEnvelope.envelopeOut.connect(this._amplifier.modulationIn);
        this._amplifier.modulationIn.connectFrom(this._loudnessEnvelope.envelopeOut);
        this._amplifier.audioOut.connect(this.audioContext.destination);
    }

    savePatch() {
        localStorage.setItem('PolySynth-current-patch', JSON.stringify(this.patch))
    }

    loadPatch() {
        const patch = localStorage.getItem('PolySynth-current-patch');
        patch && (this.patch = JSON.parse(patch));
    }

    _render() {

        this._root && (this._root.innerHTML = `
            <div class="synth">
                <div class="header">
                    <p>Synth</p>
                </div>
                <div class="controls">
                    <div class="panel">
                        <h2>Controllers</h2>
                        <div id="controllers">${controllersTemplate}</div>
                    </div>
                    <div class="panel">
                        <h2>Oscillator 1</h2>
                        <div id="oscillator-1">${oscTemplate('oscillator-1')}</div>
                    </div>
                    <div class="panel">
                        <h2>Amp Envelope</h2>
                        <div id="loudness-envelope">${ADSRTemplate('loudness-envelope')}</div>
                    </div>
                    <div class="panel keyboard">
                        <div class="ivory keys">
                            ${mapRange(36, 84, note => {
                                const isEbony = [1, 3, 6, 8, 10].includes((note - 36) % 12);
                                return isEbony ? '' : `<div class="key" data-note="${note}"> </div>`;
                            }).join('')}
                        </div>
                        <div class="ebony keys">
                            <div class="first spacer"> </div>
                            ${mapRange(36, 84, note => {
                                const isEbony = [1, 3, 6, 8, 10].includes((note - 36) % 12);
                                return `${isEbony ? `<div class="key" data-note="${note}"> </div>` : '<div class="spacer"> </div>'}`;
                            }).join('')}
                            <div class="last spacer"> </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}
