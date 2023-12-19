import esbuild from "esbuild";

import { IS_DEV } from "./devMode";

export default async function buildForBrowser()
{
    const commonOptions: esbuild.BuildOptions = {
        minify: !IS_DEV,
        sourcemap: IS_DEV ? 'inline' : false,
        bundle: true,
        platform: 'browser',
        format: 'esm',
    }

    let libCore = esbuild.build({
        ...commonOptions,
        entryPoints: ['core/index.ts'],
        outfile: 'dist/browser/core.js',
    });

    let libProducts = esbuild.build({
        ...commonOptions,
        entryPoints: ['content/index.ts'],
        outfile: 'dist/browser/products.js',
    });

    return Promise.all([libCore, libProducts]);
}