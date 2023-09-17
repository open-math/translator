"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init(contentElem) {
    contentElem.querySelectorAll('.accentBlock').forEach(abElement => {
        let expandButton = abElement.querySelector(':scope > .side > .expand');
        if (expandButton)
            expandButton.addEventListener('click', () => abElement.toggleAttribute('data-expand-open'));
    });
}
exports.init = init;
