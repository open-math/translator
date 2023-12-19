"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init(contentElem) {
    contentElem.querySelectorAll('a.link').forEach(link => {
        let timeout;
        let canOpenLink = false;
        link.addEventListener('click', (e) => {
            if (canOpenLink || !link.hasAttribute('data-preview'))
                return;
            e.preventDefault();
            clearTimeout(timeout);
            canOpenLink = true;
            timeout = setTimeout(() => { canOpenLink = false; }, 300);
            // Preview
            OMathEvent.onLinkClick(link, e);
        });
    });
}
exports.init = init;
