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

let mousePointer = true;

const moveHandler = evt => {
    mousePointer = false;
    alert('touch');
    document.body.removeEventListener('touchstart', moveHandler);
}
document.body.addEventListener('touchstart', moveHandler);

document.getElementById('launch-button').onclick = evt => {
    alert(mousePointer);
    launch(mousePointer);
}
