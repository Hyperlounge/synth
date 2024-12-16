import '../components/RotaryKnob.js';
import '../components/RotarySwitch.js';
import '../components/VerticalSlider.js';

const SVG = './media/svg';

const delayTemplate = number => `
<div class="control-group">
    <div class="vertical-group">
    <rotary-knob module-id="delay" parameter-name="delayLeft" logarithmic min-value="0.001" max-value="10" scale-min="0" scale-max="10" scale-step="1">Delay L</rotary-knob>
    <rotary-knob module-id="delay" parameter-name="feedback" min-value="-50" max-value="50" scale-min="-0.5" scale-max="0.5" scale-step="0.1" minimal>Feedback</rotary-knob>
    </div>
    <div class="vertical-group">
    <rotary-knob module-id="delay" parameter-name="delayRight" logarithmic min-value="0.001" max-value="10" scale-min="0" scale-max="10" scale-step="1">Delay R</rotary-knob>
    <rotary-knob module-id="delay" parameter-name="wetMix" min-value="-50" max-value="50" scale-min="DRY" scale-max="WET" minimal>Wet Mix</rotary-knob>
    </div>
    <vertical-slider module-id="delay" parameter-name="level" scale-min="0" scale-max="10" scale-step="1">Level</vertical-slider>
</div>
`;

export default delayTemplate;
