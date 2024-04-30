import MonoSynth from './MonoSynth.js';
import PolySynth from './PolySynth.js';
import RotaryKnob from './components/RotaryKnob.js';

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
        <rotary-knob>Volume</rotary-knob>
        <rotary-knob>Bass</rotary-knob>
        <rotary-knob>Treble</rotary-knob>
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
