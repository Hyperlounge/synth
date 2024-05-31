import '../components/VerticalSlider.js';

const ADSRTemplate = id => `
<div class="control-group">
    <vertical-slider id="${id}-attack" max-value="100">Attack</vertical-slider>
    <vertical-slider id="${id}-decay" max-value="100">Decay</vertical-slider>
    <vertical-slider id="${id}-sustain" value="100" max-value="100">Sustain</vertical-slider>
    <vertical-slider id="${id}-release" max-value="100">Release</vertical-slider>
    <vertical-slider id="${id}-velocity" value="50" max-value="100">Velocity</vertical-slider>
</div>
`;
export default ADSRTemplate;
