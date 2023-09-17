import esbuild from "esbuild";

import { IS_DEV } from "./build";

export function buildScripts()
{
    esbuild.buildSync({
        entryPoints: ['content/global/script/index.ts'],
        outfile: 'dist/content/script.js',
        charset: 'utf8',
        bundle: true,
        minify: !IS_DEV,
        sourcemap: IS_DEV,
        globalName: 'OMathContent'
    });
}