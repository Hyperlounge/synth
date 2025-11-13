import PolySynth from './PolySynth.js';

const launch = (options) => {
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
    new PolySynth('synth', options);
};

let mousePointer = true;
let normalTouchRadiusX = 20;

const moveHandler = evt => {
    mousePointer = false;
    normalTouchRadiusX = evt.touches[0].radiusX;
    document.body.removeEventListener('touchstart', moveHandler);
}
document.body.addEventListener('touchstart', moveHandler);

document.getElementById('launch-button').onclick = evt => {
    launch({mousePointer, normalTouchRadiusX});
}
