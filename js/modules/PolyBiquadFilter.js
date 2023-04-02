import PolyNode from './PolyNode.js';

export default class PolyBiquadFilter extends PolyNode {
    constructor(context, options) {
        super(context, options);
        this.AudioNodeClass = BiquadFilterNode;
        this._createProperty('type');
        this._createMonoParam('frequency');
        this._createMonoParam('Q');
        this._createMonoParam('monoDetune', 'detune');
        this._createPolyParam('detune');
    }
}
