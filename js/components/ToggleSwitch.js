
import PropTypes from './helpers/PropTypes.js';
import addTwiddling from './helpers/addTwiddling.js';
import AbstractComponent from './AbstractComponent.js';
import getThemeProps from '../misc/getThemeProps.js';

export default class ToggleSwitch extends AbstractComponent {
    static propTypes = {
        ...AbstractComponent.propTypes,
        checked: PropTypes.bool.default(false).observed,
        capColor: PropTypes.string.default(getThemeProps('bright-color')).observed,
        format: PropTypes.string.lookup(['vertical', 'horizontal']).default('vertical'),
        onText: PropTypes.string.default('ON'),
        offText: PropTypes.string.default('OFF'),
        minWidth: PropTypes.string.default('40px'),
    }

    static template = data => `
<style>
    .toggle-switch {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        position: relative;
    }
    .toggle-switch.horizontal {
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
        min-width: ${data.minWidth};
        text-align: center;
        border: 4px solid black;
        border-radius: 4px;
        font-weight: bold;
        color: black;
        padding: 1px 0.5em;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${data.capColor};
        margin-bottom: 0.3em;
        box-shadow: 0 3px 3px rgba(0,0,0,0.4);
    }
    .toggle-switch.horizontal .title {
        margin: 0;
    }
    .toggle-switch.horizontal .switch {
        margin: 0;
    }
    
    .switch::before {
        content: '${data.offText}';
    }
    .switch.checked {
        background: radial-gradient(transparent, transparent, rgba(0, 0, 0, 0.3)), ${data.capColor};
        box-shadow: 0 1px 1px rgba(0,0,0,0.4);
    }
    .switch.checked::before {
        content: '${data.onText}';
    }
    
</style>
<div class="toggle-switch ${data.format}">
    <div class="title">${data.title}</div>
    <div class="switch"></div>
</div>
    `

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this._title = this.innerHTML;

        const data = {
            ...this._props,
            title: this._title,
            foregroundColor: getComputedStyle(this).getPropertyValue('color'),
        }

        this._root.innerHTML = ToggleSwitch.template(data);
        this._updateView();
        this._addControlListeners();
    }

    _updateView() {
        const {checked} = this._props;
        const theSwitch = this._root.querySelector('.switch');
        theSwitch.classList.toggle('checked', checked);
    }

    _addControlListeners() {
        const theSwitch = this._root.querySelector('.switch');

        addTwiddling(theSwitch)
            .onStart(() => {
                this.value = !this.value;
                this.dispatchChangeEvent();
            });
    }

    get value() {
        return this._props.checked;
    }

    set value(newValue) {
        this._props.checked = !!newValue;
        this._updateView();
    }
}

customElements.define('toggle-switch', ToggleSwitch);
