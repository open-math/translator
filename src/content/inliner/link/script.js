"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init(contentElem) {
    contentElem.querySelectorAll('a.link').forEach(link => {
        link.addEventListener('click', e => OMathEvent.onLinkClick(link, e));
    });
}
exports.init = init;
