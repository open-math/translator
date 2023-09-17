"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectedProperty = void 0;
function getInjectedProperty(from, property) {
    let value = from[property];
    if (!value)
        throw new Error(`No injected property '${property}' found in ${from}!`);
    return value;
}
exports.getInjectedProperty = getInjectedProperty;
