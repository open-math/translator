"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const katex_1 = __importDefault(require("katex"));
const macros_1 = __importDefault(require("../math/macros"));
const context_1 = require("./context");
//
let templateMap = {};
//
onmessage = async (e) => {
    let request = e.data;
    if (templateMap[request.scriptId])
        request = templateMap[request.scriptId];
    else
        templateMap[request.scriptId] = request;
    let script = JSON.parse(request.script);
    let view;
    try {
        let context = (0, context_1.getFunctionContext)();
        let func = new Function(...Object.keys(context), script);
        view = func(...Object.values(context));
        if (typeof view !== 'object')
            throw new Error('View must be an object!');
        let response = {};
        response.scriptId = request.scriptId;
        response.statement = render(request.statement, view);
        response.sections = {};
        if (request.sections)
            Object.keys(request.sections).forEach(sectionName => {
                response.sections[sectionName] = render(request.sections[sectionName], view);
            });
        postMessage(response);
    }
    catch (e) {
        console.error('Task Generator Error');
        console.error(request);
        console.error(e);
        let response = {};
        response.scriptId = request.scriptId;
        response.statement = request.statement;
        response.sections = request.sections;
        postMessage(response);
    }
};
//
//
//
function render(content, view) {
    content = content.replace(/\{\{\{(.+?)\}\}\}/gm, (match, replaceName) => {
        replaceName = replaceName.trim();
        let toReplace = view[replaceName];
        return toReplace ?? `{{{ ${replaceName} }}}`;
    });
    content = content.replace(/\$\$[\s\S]+?\$\$/gm, match => {
        let out = katex_1.default.renderToString(match.slice(2, -2).trim(), {
            displayMode: true,
            strict: false,
            macros: macros_1.default
        });
        out = `<div class="mathDisplay">${out}</div>`;
        return out;
    });
    content = content.replace(/(?<!\\)\$(.+?)(?<!\\)\$/gm, (match, imath) => {
        let out = katex_1.default.renderToString(imath.trim(), {
            displayMode: false,
            strict: false,
            macros: macros_1.default
        });
        out = `<span class="mathInline">${out}</span>`;
        return out;
    });
    return content;
}
