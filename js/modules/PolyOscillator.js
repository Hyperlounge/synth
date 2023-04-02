import PolyNode from './PolyNode.js';

export default class PolyOscillator extends PolyNode {
    constructor(context, options) {
        super(context, options);
        this.AudioNodeClass = OscillatorNode;
        this._createProperty('type');
        this._createMonoParam('frequency');
        this._createMonoParam('monoDetune', 'detune');
        this._createPolyParam('detune');
    }
}
