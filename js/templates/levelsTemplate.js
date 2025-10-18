import '../components/RotaryKnob.js';
import '../components/ToggleSwitch.js';

const levelsTemplate = `
<div class="effect-group">
    <div class="vertical-group">
        <toggle-switch module-id="levels" parameter-name="power" style="font-weight: bold">LEVELS</toggle-switch>
    </div>
    <rotary-knob module-id="levels" parameter-name="drive">Drive</rotary-knob>
    <rotary-knob module-id="levels" parameter-name="bass">Bass</rotary-knob>
    <rotary-knob module-id="levels" parameter-name="treble">Treble</rotary-knob>
    <rotary-knob module-id="levels" parameter-name="master" value="0.5">Master Volume</rotary-knob>
</div>
`;
export default levelsTemplate;
