import '../components/VerticalSlider.js';
import '../components/RotaryKnob.js';

const ADSRTemplate = moduleId => `
<div class="control-group">
    <vertical-slider module-id="${moduleId}" parameter-name="attackSeconds" logarithmic max-value="10">Attack</vertical-slider>
    <vertical-slider module-id="${moduleId}" parameter-name="decaySeconds" logarithmic max-value="10">Decay</vertical-slider>
    <vertical-slider module-id="${moduleId}" parameter-name="sustainLevel" value="1" max-value="1">Sustain</vertical-slider>
    <vertical-slider module-id="${moduleId}" parameter-name="releaseSeconds" logarithmic max-value="10">Release</vertical-slider>
    <div class="vertical-group">
        <rotary-knob module-id="${moduleId}" parameter-name="velocityAmount" value="0.5" max-value="1">Velocity</rotary-knob>
        <rotary-knob module-id="${moduleId}" parameter-name="expression" value="0" max-value="1">Expression</rotary-knob>
    </div>
</div>
`;
export default ADSRTemplate;
