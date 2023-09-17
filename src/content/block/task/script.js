"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init(contentElem) {
    contentElem.querySelectorAll('.task').forEach(task => {
        task.querySelectorAll(':scope > header > .controls > button').forEach(button => {
            button.addEventListener('click', () => {
                task.toggleAttribute(`data-${button.getAttribute('data-section')}-open`);
            });
        });
    });
}
exports.init = init;
