import pug from "pug";
import { globSync } from "glob";

import path from "path";
import fs from "fs";

export function compileTemplates()
{
    let templatePaths = globSync(['content/block/*/layout.pug', 'content/inliner/*/layout.pug']);

    fs.mkdirSync('dist/src/content/global/layout', { recursive: true });

    templatePaths.forEach(templatePath =>
    {
        let name = templatePath.split(path.sep).at(-2);
        let templateFunc = pug.compileFileClient(templatePath, { module: true, name: name });
        fs.writeFileSync(`dist/src/content/global/layout/${name}.js`, templateFunc, { encoding: 'utf-8' });
    });
}