
import PropTypes from './helpers/PropTypes.js';
import addTwiddling from './helpers/addTwiddling.js';

export default class RotaryKnob extends HTMLElement {
    static propTypes = {
        id: PropTypes.string,
        class: PropTypes.string,
        scaleMin: PropTypes.number.default(0),
        scaleMax: PropTypes.number.default(10),
        scaleStep: PropTypes.number.default(1),
        value: PropTypes.number.default(0).observed,
        minValue: PropTypes.number.default(0),
        maxValue: PropTypes.number.default(1),
        units: PropTypes.string.default(''),
        logarithmic: PropTypes.bool.default(false),
        capColor: PropTypes.string.default('yellow').observed,
    }

    static template = data => `
<style>
    .rotary-knob {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        position: relative;
    }
    .title {
        text-align: center;
    }
    .rotor {
        width: 40px;
        height: 40px;
        border: 4px solid black;
        border-radius: 100%;
        background-color: ${data.capColor};
        text-align: center;
        margin: 1.5em;
    }
    .indicator {
        display: inline-block;
        width: 2px;
        height: 50%;
        background-color: black;
    }
    .label {
        font-size: 80%;
        transform: translate(-50%, -50%);
    }
</style>
<div class="rotary-knob">
    <div class="title">${data.title}</div>
    
    <div class="rotor">
        <div class="indicator"></div>
    </div>
</div>
    `

    constructor() {
        super();
    }

    connectedCallback() {
        this._root = this.attachShadow({mode: 'open'});
        this._props = PropTypes.attributesToProps(this);
        this._title = this.innerHTML;
        this._minAngle = 0.2 * Math.PI;
        this._maxAngle = 1.8 * Math.PI;

        const data = {
            ...this._props,
            title: this._title,
        }
        this._root.innerHTML = RotaryKnob.template(data);
        this._drawScale();
        this._updateView();
        this._addControlListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this._root) {
            this._props[name] = PropTypes.attributesToProps(this, name);
        }
    }

    _updateView() {
        const {value, minValue, maxValue} = this._props;
        const rotor = this._root.querySelector('.rotor');
        this._rotorAngle = -Math.PI + this._minAngle + value/(maxValue-minValue) * (this._maxAngle-this._minAngle);
        rotor.style.transform = `rotate(${this._rotorAngle}rad)`;
    }

    _drawScale() {
        const {scaleMin, scaleMax, scaleStep} = this._props;

        const rotor = this._root.querySelector('.rotor');
        const rotorRadius = rotor.offsetWidth / 2;
        const rotorCenter = {
            x: rotor.offsetLeft + rotorRadius,
            y: rotor.offsetTop + rotorRadius,
        };
        const labelRadius = rotorRadius + 12;
        const angleStep = 1.6 * Math.PI * scaleStep / (scaleMax - scaleMin);
        let angle = this._minAngle;

        for (let notch = scaleMin; notch <= scaleMax; notch += scaleStep) {
            const label = document.createElement('div');
            label.classList.add('label');
            label.innerHTML = notch;
            this._root.querySelector('.rotary-knob').append(label);
            label.style.position = 'absolute';
            label.style.top = (rotorCenter.y + Math.cos(angle) * labelRadius) + 'px';
            label.style.left = (rotorCenter.x - Math.sin(angle) * labelRadius) + 'px';
            angle += angleStep;
        }
    }

    _addControlListeners() {
        const {minValue, maxValue} = this._props;

        const rotor = this._root.querySelector('.rotor');
        let startAngle;

        addTwiddling(rotor)
            .onStart(() => {
                startAngle = this._rotorAngle;
            })
            .onTwiddle((deltaX, deltaY) => {
                const newAngle = startAngle - (deltaY - deltaX) * 0.05;
                this._rotorAngle = Math.min(Math.max(this._minAngle - Math.PI, newAngle), this._maxAngle - Math.PI);
                rotor.style.transform = `rotate(${this._rotorAngle}rad)`;
                this._props.value = minValue + (maxValue-minValue) * this._rotorAngle/(this._maxAngle-this._minAngle);
                this._dispatchChangeEvent();
            });
    }

    _dispatchChangeEvent() {
        const evt = new CustomEvent('change');
        this.dispatchEvent(evt);
    }

    get value() {
        return this._props.value;
    }
}

customElements.define('rotary-knob', RotaryKnob);
