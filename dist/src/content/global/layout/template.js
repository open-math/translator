"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTemplate = void 0;
let templates = {
    paragraph: require('./paragraph'),
    errorBlock: require('./errorBlock'),
    errorInliner: require('./errorInliner'),
    heading: require('./heading'),
    math: require('./math'),
    imath: require('./imath'),
    image: require('./image'),
    errorImage: require('./errorImage'),
    accentBlock: require('./accentBlock'),
    gallery: require('./gallery'),
    link: require('./link'),
    list: require('./list'),
    array: require('./array'),
    table: require('./table'),
    task: require('./task'),
};
function renderTemplate(name, locals = {}) {
    return templates[name](locals);
}
exports.renderTemplate = renderTemplate;
