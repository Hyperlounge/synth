import '../components/RotaryKnob.js';
import '../components/CycleSwitch.js';

const filterTemplate = `
<div class="control-group">
    <div class="vertical-group">
    <cycle-switch id="filter-type" title="Pass">
        <option value="lowpass" selected>LOW</option>
        <option value="bandpass">BAND</option>
        <option value="highpass">HIGH</option>
    </cycle-switch>
    <cycle-switch id="filter-rolloff" title="Rolloff/oct">
        <option value="12" selected>12dB</option>
        <option value="24">24dB</option>    
    </cycle-switch>
    <rotary-knob id="filter-frequency" value="50" max-value="100">Cut-off</rotary-knob>
    </div>
    <div class="vertical-group">
    <rotary-knob id="filter-resonance" max-value="100">Resonance</rotary-knob>
    <rotary-knob id="filter-envelope-amount" value="50" max-value="100">Envelope</rotary-knob>
    </div>
    <div class="vertical-group">
    <rotary-knob id="filter-modulation" max-value="100">Modulation</rotary-knob>
    <rotary-knob id="filter-keyboard" value="100" max-value="100">Follow Keys</rotary-knob>
    </div>
</div>
`;
export default filterTemplate;
