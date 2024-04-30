import MonoSynth from './MonoSynth.js';
import PolySynth from './PolySynth.js';
import './components/RotaryKnob.js';
import './components/RotarySwitch.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
<style>
    button.selector {
        padding: 30px;
        font-size: 48px;
        margin: 20px;
    }
    #synth {
        position: absolute; 
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }
</style>
<div id="synth">
    <button class="selector" id="poly">Take me to the 80's!</button>
    <div style="display: flex; justify-content: center; align-items: center;">
        <rotary-switch title="Voices" labels="around" style="margin-right: 30px">
            <option value="0">Leg.</option>
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </rotary-switch>
        <rotary-switch title="Source" labels="right" style="margin-right: 30px">
            <option value="0">Phono</option>
            <option value="1">CD</option>
            <option value="2" selected>Tuner</option>
            <option value="3">Aux</option>
            <option value="4">Bluetooth</option>
        </rotary-switch>
        <rotary-knob>Volume</rotary-knob>
        <rotary-knob scale-min="-5" scale-max="5" min-value="-1" max-value="1">Bass</rotary-knob>
        <rotary-knob scale-min="-5" scale-max="5" min-value="-1" max-value="1" minimal>Treble</rotary-knob>
    </div>
</div>
    `
    document.body.addEventListener('click', startSynth);
})

function startSynth(evt) {
    if (evt.target instanceof HTMLButtonElement) {
        document.body.removeEventListener('click', startSynth);
        if (evt.target.id === 'mono') {
            new MonoSynth('synth');
        } else {
            new PolySynth('synth');
        }

    }
}
