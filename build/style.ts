import sass from "sass";
import fs from "fs";

import { IS_DEV } from "./devMode";

export function buildStyles()
{
    let compileResult = sass.compile('content/global/style/index.scss', {
        loadPaths: ['content', 'content/global/style'],
        style: IS_DEV ? 'expanded' : 'compressed',
        sourceMap: IS_DEV,
        sourceMapIncludeSources: true,
    });

    let css = compileResult.css;

    if (compileResult.sourceMap)
    {
        let sm = JSON.stringify(compileResult.sourceMap);
        let smB64 = (Buffer.from(sm, 'utf-8') || '').toString('base64');

        css += '\n'.repeat(2) + '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + smB64 + ' */';
    }

    fs.writeFileSync('dist/content/style.css', css, { encoding: 'utf-8' });
}