import buildForBrowser from "./browser";
import { buildScripts } from "./script";
import { buildStyles } from "./style";
import { moveAssets } from "./assets";

async function build()
{
    await buildForBrowser();

    buildScripts();
    buildStyles();
    moveAssets();
}

build();