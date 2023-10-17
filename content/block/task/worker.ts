import katex from "katex";

import macros from "../math/macros";

import { getFunctionContext } from "./context";

type TSections = { [name: string]: string };

export type TRequest =
{
    scriptId:   string;
    script:     string;
    statement:  string;
    sections:   TSections;
}

export type TResponse =
{
    scriptId:   string;
    statement:  string;
    sections:   TSections;
}

//

let templateMap: { [scriptId: string]: TRequest } = {};

//

onmessage = async e =>
{
    let request = e.data as TRequest;

    if (templateMap[request.scriptId])
        request = templateMap[request.scriptId];
    else
        templateMap[request.scriptId] = request;

    let script = JSON.parse(request.script);

    let view;
    try 
    {
        let context = getFunctionContext();
        let func = new Function(...Object.keys(context), script);

        view = func(...Object.values(context));

        if (typeof view !== 'object')
            throw new Error('View must be an object!');

        let response = {} as TResponse;
            response.scriptId = request.scriptId;
            response.statement = render(request.statement, view);

        response.sections = {};
        if (request.sections)
            Object.keys(request.sections).forEach(sectionName =>
            {
                response.sections[sectionName] = render(request.sections[sectionName], view);
            });

        postMessage(response);
    }
    catch (e)
    {
        console.error('Task Generator Error');
        console.error(request);
        console.error(e);

        let response = {} as TResponse;
            response.scriptId =     request.scriptId;
            response.statement =    request.statement;
            response.sections =     request.sections;

        postMessage(response);
    }
}

//
//
//

function render(content: string, view)
{
    content = content.replace(/\{\{\{(.+?)\}\}\}/gm, (match, replaceName) =>
    {
        replaceName = replaceName.trim();
        let toReplace = view[replaceName];

        return toReplace ?? `{{{ ${replaceName} }}}`;
    });

    content = content.replace(/\$\$[\s\S]+?\$\$/gm, match =>
    {
        let out = katex.renderToString(match.slice(2, -2).trim(), {
            displayMode: true,
            strict: false,
            macros: macros
        });

        out = `<div class="mathDisplay">${out}</div>`;

        return out;
    });

    content = content.replace(/(?<!\\)\$(.+?)(?<!\\)\$/gm, (match, imath) =>
    {
        let out = katex.renderToString(imath.trim(), {
            displayMode: false,
            strict: false,
            macros: macros
        });

        out = `<span class="mathInline">${out}</span>`;

        return out;
    });

    return content;
}