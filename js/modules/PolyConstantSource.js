import PolyNode from './PolyNode.js';

export default class PolyConstantSource extends PolyNode {
    constructor(context, options) {
        super(context, options);
        this.AudioNodeClass = ConstantSourceNode;
        this._createPolyParam('offset');
     }
}
