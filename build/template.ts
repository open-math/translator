import pug from "pug";
import { globSync } from "glob";

import path from "path";
import fs from "fs";

let templatePaths = globSync(['content/block/*/layout.pug', 'content/inliner/*/layout.pug']);

fs.mkdirSync('content/global/layout/__template', { recursive: true });

templatePaths.forEach(templatePath =>
{
    let name = templatePath.split(path.sep).at(-2);
    let templateFunc = pug.compileFileClient(templatePath, { module: true, name: name });
    fs.writeFileSync(`content/global/layout/__template/${name}.js`, templateFunc, { encoding: 'utf-8' });
});

fs.cpSync('content/global/layout/__template', 'dist/node/content/global/layout/__template', { recursive: true });