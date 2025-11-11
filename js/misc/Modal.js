
function toDimension(value, defaultValue) {
    if (!value) {
        value = defaultValue;
    }
    if (typeof value === 'string') {
        return value;
    } else {
        return `${value}px`;
    }
}

export default class Modal {
    constructor(contentHTML, options) {
        const width = toDimension(options.width, '60%');
        const maxWidth = toDimension(options.maxWidth, '700px');
        this.id = ++Modal.serialNumber;
        this._elem = document.createElement('div');
        this._elem.innerHTML = Modal.modalTemplate({
            id: this.id,
            width,
            maxWidth,
            contentHTML,
        });
        const root = options.root || document.body;
        root.append(this._elem);
    }

    remove() {
        this._elem.remove();
    }

    get mask() {
        return this._elem.querySelector('.modal-mask');
    }

    get elem() {
        return this._elem;
    }

    static serialNumber = 0;

    static modalTemplate = data => {
        return `
        <style>
            .modal {
                position: fixed;
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background-color: rgba(0,0,0,0.3);
                pointer-events: none;
            }
            .modal-mask {
                width: 100%; 
                height: 100%;
                pointer-events: all;
            }
            .modal-content {
                position: absolute; 
                top: 50%; 
                left: 50%; 
                width: ${data.width}; 
                max-width: ${data.maxWidth}; 
                transform: translate(-50%, -50%);
                pointer-events: all;
            }
        </style>
        <div class="modal" id="modal-${data.id}">
            <div class="modal-mask"></div>
            <div class="modal-content">${data.contentHTML}</div>
        </div>`;
    }
}
