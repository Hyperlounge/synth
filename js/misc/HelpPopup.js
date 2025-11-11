import Modal from './Modal.js';

export default class HelpPopup extends Modal {
    constructor(contentHTML, options = {}) {
        const dialogHTML = HelpPopup.dialogTemplate({
            contentHTML
        });
        options.maxWidth || (options.maxWidth = Math.sqrt(contentHTML.replace(/<.*?>/sg, '').length)*30);
        super(dialogHTML, options);
        const modalContent = this.elem.querySelector('.modal-content');
        let modalRect = modalContent.getBoundingClientRect();
        const targetRect = options.target.getBoundingClientRect();
        const viewportRect = document.documentElement.getBoundingClientRect();

        let top = targetRect.top;
        let left = targetRect.left + targetRect.width + 10;
        let width = null;
        let height = null;
        if (left + modalRect.width > viewportRect.width) {
            width = viewportRect.width - left;
            if (width < 200) {
                left = targetRect.left - modalRect.width - 10;
                width = null;
                if (left < 0) {
                    left = 0;
                    width = targetRect.left - 10;
                }
            }
        }
        const setStyles = () => {
            modalContent.style = `transform: unset; top: ${top}px; left: ${left}px; ${width === null ? '' : `width: ${width}px; `}${height === null ? '' : `height: ${height}px; `}`;
        }
        setStyles();
        modalRect = modalContent.getBoundingClientRect();
        if (top + modalRect.height > viewportRect.height) {
            top = viewportRect.height - modalRect.height;
            if (top < 0) {
                top = 0;
                height = viewportRect.height;
            }
        }
        setStyles();

        return new Promise(resolve => {
            this.elem.querySelector('.hl-help-popup button.hl-help-close-button').addEventListener('click', evt => {
                this.remove();
                resolve();
            });
        });
    }

    static dialogTemplate = data => {
        return `
        <style>
            .hl-help-popup {
                height: 100%;
                background-color: white;
                padding: 0;
                overflow: auto;
                border-radius: 0.5em;
            }
            .hl-help-content {
                padding: 1em;
            }
            .hl-help-close-button {
                position: absolute;
                top: 1em;
                right: 1em;
                border: 0;
            }
            .hl-help-popup thead {
                display: none;
            }
            .hl-help-popup td {
                vertical-align: top;
            }
            .hl-help-popup td:first-child {
                font-weight: bold;
                min-width: 2em;
                padding-right: 1em;
            }
        </style>
        <div class="hl-help-popup">
            <div class="hl-help-content">${data.contentHTML}</div>
            <button class="hl-help-close-button">&times;</button>
        </div>`;
    }
}
