import '../components/RotaryKnob.js';
import '../components/RotarySwitch.js';
import '../components/VerticalSlider.js';
const SVG = '../media/svg'

const lfoTemplate = `
<div class="control-group">
    <div class="vertical-group">
        <rotary-switch id="lfo-waveform" title="Waveform">
            <option value="sine"><img alt="sine" src="${SVG}/sine-wave.svg"/></option>
            <option value="triangle" selected><img alt="triangle" src="${SVG}/triangle.svg"/></option>
            <option value="sawtooth"><img alt="sawtooth" src="${SVG}/saw-tooth.svg"/></option>
            <option value="inverse-sawtooth"><img alt="reverse sawtooth" src="${SVG}/reverse-saw.svg"/></option>
            <option value="square"><img alt="square" src="${SVG}/square-wave.svg"/></option>
            <option value="sample-hold"><img alt="sample and hold" src="${SVG}/sample-and-hold.svg"/></option>
            <option value="noise"><img alt="noise" src="${SVG}/noise.svg"/></option>
        </rotary-switch>
        <rotary-knob id="lfo-frequency" value="60" max-value="100">Rate</rotary-knob>
    </div>
    <div class="vertical-group">
        <rotary-knob id="lfo-mod-wheel-level" value="10" max-value="100">Mod Wheel</rotary-knob>
        <rotary-knob id="lfo-mod-delay" value="70" max-value="100">Delay</rotary-knob>
    </div>
    <vertical-slider id="lfo-fixed-level" value="10" max-value="100">Level</vertical-slider>
</div>
`;

export default lfoTemplate;
