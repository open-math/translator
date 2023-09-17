import { init as image } from "content/block/image/script";
import { init as accentBlock } from "content/block/accentBlock/script";
import { init as gallery } from "content/block/gallery/script";
import { init as link } from "content/inliner/link/script";
import { init as task} from "content/block/task/script";

export type ContentOptions = {
    vendor: {
        photoSwipe: { [key: string]: string }
    }
};

//
//
//

let products = [
    image,
    accentBlock,
    gallery,
    link,
    task,
];

export function initProducts(contentElem: HTMLElement, gOptions: ContentOptions = {} as ContentOptions)
{
    products.forEach(product => product(contentElem, gOptions));
}