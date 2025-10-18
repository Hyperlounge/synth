import '../components/RotaryKnob.js';
import '../components/ToggleSwitch.js';

const reverbTemplate = `
<div class="effect-group">
    <div class="vertical-group">
        <toggle-switch module-id="reverb" parameter-name="power" style="font-weight: bold">REVERB</toggle-switch>
    </div>
    <rotary-knob module-id="reverb" parameter-name="mix" value="0.5">Mix</rotary-knob>
    <rotary-knob module-id="reverb" parameter-name="size">Size</rotary-knob>
    <rotary-knob module-id="reverb" parameter-name="high-pass">High-pass</rotary-knob>
</div>
`;
export default reverbTemplate;
