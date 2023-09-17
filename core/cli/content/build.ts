import { moveAssets } from "./assets";
import { buildScripts } from "./script";
import { buildStyles } from "./style";
import { compileTemplates } from "./template";

export const IS_DEV = isDev();

compileTemplates();
buildScripts();
buildStyles();
moveAssets();

//
//
//

function isDev()
{
    let args = process.argv.slice(2);

    if (args.length === 0)
        return false;

    return args[0] === '--dev';
}