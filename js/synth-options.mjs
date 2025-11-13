import PolySynth from './PolySynth.js';

const launch = (mousePointer) => {
    document.body.innerHTML = `
<style>
    #synth {
        position: absolute; 
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }
</style>
<div id="synth">
</div>
    `;
    new PolySynth('synth', {mousePointer});
};

let mousePointer = false;

const moveHandler = evt => {
    alert(evt.touches);
    mousePointer = false;
    document.body.removeEventListener('touchmove', moveHandler);
}
document.body.addEventListener('touchmove', moveHandler);

document.getElementById('launch-button').onclick = evt => {
    launch(mousePointer);
}
