import '../components/RotaryKnob.js';
import '../components/RotarySwitch.js';
import getSvgUsingHref from '../misc/getSvgUsingHref.js';

const lfoTemplate = `
<div class="control-group">
    <div class="vertical-group">
        <rotary-switch module-id="lfo" parameter-name="waveform" title="Waveform">
            <option value="sine">${getSvgUsingHref('sine-wave')}</option>
            <option value="triangle" selected>${getSvgUsingHref('triangle')}</option>
            <option value="sawtooth">${getSvgUsingHref('saw-tooth')}</option>
            <option value="inverse-sawtooth">${getSvgUsingHref('reverse-saw')}</option>
            <option value="square">${getSvgUsingHref('square-wave')}</option>
            <option value="sample-hold">${getSvgUsingHref('sample-and-hold')}</option>
            <option value="noise">${getSvgUsingHref('noise')}</option>
        </rotary-switch>
        <rotary-knob module-id="lfo" parameter-name="frequency" value="6" logarithmic min-value="0.1" max-value="100">Rate</rotary-knob>
    </div>
    <div class="vertical-group">
        <rotary-knob module-id="lfo" parameter-name="modWheelAmount" value="0.1" max-value="1">Mod Wheel</rotary-knob>
        <rotary-knob module-id="lfo" parameter-name="delay" value="1" logarithmic max-value="10">Delay</rotary-knob>
    </div>
    <div class="vertical-group">
        <rotary-knob module-id="lfo" parameter-name="fixedAmount" value="0.1" max-value="1">Level</rotary-knob>
        <rotary-knob module-id="lfo" parameter-name="expression" value="0" max-value="1">Expression</rotary-knob>
    </div>
</div>
`;

export default lfoTemplate;
