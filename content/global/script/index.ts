import { init as figure } from "content/block/figure/script";
import { init as accentBlock } from "content/block/accentBlock/script";
import { init as gallery } from "content/block/gallery/script";
import { init as link } from "content/inliner/link/script";
import { GenTaskManager, init as task } from "content/block/task/script";

let products = [
    figure,
    accentBlock,
    gallery,
    link,
    task,
];

export function initProducts(contentElem: HTMLElement)
{
    if (!contentElem)
        return;

    products.forEach(product => product(contentElem));
}

globalThis.OMath_initProducts = initProducts;
globalThis.GenTaskManager = new GenTaskManager;