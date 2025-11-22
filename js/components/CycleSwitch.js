
import PropTypes from './helpers/PropTypes.js';
import addTwiddling from './helpers/addTwiddling.js';
import AbstractComponent from './AbstractComponent.js';
import getThemeProps from '../misc/getThemeProps.js';

export default class CycleSwitch extends AbstractComponent {
    static propTypes = {
        ...AbstractComponent.propTypes,
        capColor: PropTypes.string.default(getThemeProps('normal-color')).observed,
        title: PropTypes.string.default('Title').observed,
        format: PropTypes.string.lookup(['vertical', 'horizontal']).default('vertical'),
        numeric: PropTypes.bool.default(false),
    }

    static template = data => `
<style>
    .cycle-switch {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        position: relative;
    }
    .cycle-switch.horizontal {
        flex-direction: row;
        gap: 0.5em;
    }
    .title {
        text-align: center;
        margin-bottom: 0.2em;
        color: ${data.foregroundColor};
    }
    .title:empty {
        display: none;
    }
    .switch {
        position: relative;
        box-sizing: border-box;
        width: 70px;
        text-align: center;
        border: 4px solid black;
        border-width: 1px 6px 1px 6px;
        border-radius: 6px;
        font-weight: bold;
        color: black;
        padding: 3px 2px;
        background-image: linear-gradient(
            rgba(0,0,0,0.5), 
            rgba(0,0,0,0.3) 15%, 
            rgba(200,200,200,0.2) 16%,
            rgba(200,200,200,0.3) 26%,
            rgba(0,0,0,0.2) 27%,
            rgba(0,0,0,0) 90%,
            rgba(0,0,0,0.4)
        );
        background-color: ${data.capColor};
        margin-bottom: 0.55em;
        box-shadow: 0 3px 3px rgba(0,0,0,0.4);
    }
    .switch.down {
        background-color: #333333;
        color: transparent;
        box-shadow: 0 2px 2px rgba(0,0,0,0.3);
    }
    .cycle-switch.horizontal .title {
        margin: 0;
    }
    .cycle-switch.horizontal .switch {
        margin: 0;
    }
    
</style>
<div class="cycle-switch ${data.format}">
    <div class="title">${data.title}</div>
    <div class="switch">${data.selectedLabel}</div>
</div>
    `

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this._selectedIndex = 0;
        this._downState = false;

        this._options = Array.from(this.querySelectorAll('option')).map((option, i) => {
            if (option.selected) {
                this._selectedIndex = i;
            }
            return {
                label: option.innerHTML,
                value: this._props.numeric ? Number(option.value) : option.value,
            };
        });

        const data = {
            ...this._props,
            selectedLabel: this._options[this._selectedIndex].label,
            foregroundColor: getComputedStyle(this).getPropertyValue('color'),
        }

        this._root.innerHTML = CycleSwitch.template(data);
        this._updateView();
        this._addControlListeners();
    }

    _updateView() {
        const theSwitch = this._root.querySelector('.switch');
        theSwitch.innerHTML = this._options[this._selectedIndex].label;
        theSwitch.classList.toggle('down', this._downState);
    }

    _addControlListeners() {
        const theSwitch = this._root.querySelector('.switch');

        addTwiddling(theSwitch)
            .onStart(() => {
                if (this._selectedIndex === this._options.length - 1) {
                    this._selectedIndex = 0;
                } else {
                    this._selectedIndex++;
                }
                this._downState = true;
                this._updateView();
                this.dispatchChangeEvent();
            })
            .onEnd(() => {
                this._downState = false;
                this._updateView();
            });
    }

    get value() {
        return this._options[this._selectedIndex].value;
    }

    set value(newValue) {
        this._options.forEach((option, i) => {
            if (option.value === newValue) {
                this._selectedIndex = i;
            }
        });
        this._updateView();
    }
}

customElements.define('cycle-switch', CycleSwitch);
