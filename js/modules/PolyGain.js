import PolyNode from './PolyNode.js';

export default class PolyGain extends PolyNode {
    constructor(context, options) {
        super(context, options);
        this.AudioNodeClass = GainNode;
        this._createPolyParam('gain');
        this._createMonoParam('monoGain', 'gain');
    }
}
