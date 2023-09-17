"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteTracker = exports.RenderExtra = void 0;
const bitran_1 = require("bitran");
const ErrorSwap_1 = __importDefault(require("./ErrorSwap"));
// Block Factories
const factory_1 = require("../content/block/paragraph/factory");
const factory_2 = require("../content/block/errorBlock/factory");
const factory_3 = require("../content/block/heading/factory");
const factory_4 = require("../content/block/hr/factory");
const factory_5 = require("../content/block/math/factory");
const factory_6 = require("../content/block/image/factory");
const factory_7 = require("../content/block/errorImage/factory");
const factory_8 = require("../content/block/accentBlock/factory");
const factory_9 = require("../content/block/gallery/factory");
const factory_10 = require("../content/block/include/factory");
const factory_11 = require("../content/block/list/factory");
const factory_12 = require("../content/block/html/factory");
const factory_13 = require("../content/block/array/factory");
const factory_14 = require("../content/block/table/factory");
const factory_15 = require("../content/block/task/factory");
// Inliner Factories
const factory_16 = require("../content/inliner/text/factory");
const factory_17 = require("../content/inliner/imath/factory");
const factory_18 = require("../content/inliner/errorInliner/factory");
const factory_19 = require("../content/inliner/link/factory");
class Renderer {
    location;
    helper;
    onRenderError;
    constructor(location, helper) {
        this.location = location;
        this.helper = helper;
    }
    blockFactories = {
        paragraph: factory_1.VFParagraph,
        errorBlock: factory_2.VFErrorBlock,
        heading: factory_3.VFHeading,
        hr: factory_4.VFHr,
        math: factory_5.VFMath,
        image: factory_6.VFImage,
        errorImage: factory_7.VFErrorImage,
        gallery: factory_9.VFGallery,
        list: factory_11.VFList,
        array: factory_13.VFArray,
        table: factory_14.VFTable,
        task: factory_15.VFTask,
        html: factory_12.VFHtml,
        include: factory_10.VFInclude,
        important: factory_8.VFAccentBlock,
        example: factory_8.VFAccentBlock,
        definition: factory_8.VFAccentBlock,
        theorem: factory_8.VFAccentBlock,
    };
    inlinerFactories = {
        text: factory_16.VFText,
        errorInliner: factory_18.VFErrorInliner,
        imath: factory_17.VFIMath,
        link: factory_19.VFLink,
    };
    async renderBlocks(blocks) {
        let result = '';
        for (let i = 0; i < blocks.length; i++)
            result += await this.renderBlock(blocks[i]);
        return result;
    }
    async renderBlock(block) {
        if (block.type in this.blockFactories) {
            let viewFactory = new this.blockFactories[block.type](this);
            let result;
            try {
                result = await viewFactory.render(block);
            }
            catch (e) {
                if (this.onRenderError)
                    this.onRenderError(block, e);
                let errorBlock = new bitran_1.ErrorBlock;
                errorBlock.error = e;
                errorBlock.code = JSON.stringify(block, null, 4);
                let swapResult = ErrorSwap_1.default.trySwap(errorBlock, viewFactory);
                result = await this.renderBlock(swapResult ?? errorBlock);
            }
            return result;
        }
        return '';
    }
    async renderInliners(inliners) {
        let quoteTracker = new QuoteTracker;
        let result = '';
        for (let i = 0; i < inliners.length; i++) {
            let inliner = inliners[i];
            if (inliner.type in this.inlinerFactories) {
                let viewFactory = new this.inlinerFactories[inliner.type](this);
                try {
                    if (inliner instanceof bitran_1.Text)
                        inliner.content = RenderExtra.afterStyle(inliner.content, quoteTracker);
                    result += await viewFactory.render(inliner);
                }
                catch (e) {
                    if (this.onRenderError)
                        this.onRenderError(inliner, e);
                    let errorInliner = new bitran_1.ErrorInliner;
                    errorInliner.error = e;
                    let swapResult = ErrorSwap_1.default.trySwap(errorInliner, viewFactory);
                    result += await this.renderInliners([(swapResult ?? errorInliner)]);
                }
            }
        }
        return result;
    }
}
exports.default = Renderer;
class RenderExtra {
    static afterStyle(text, quoteTracker) {
        text = text.replace(/\*\*(.+?)\*\*/gm, `<strong>$1</strong>`);
        text = text.replace(/\*(.+?)\*/gm, `<em>$1</em>`);
        text = text.replace(/ -- /gm, ' — ');
        {
            //let quoteOpen = true;
            text = text.replace(/"/gm, () => (quoteTracker.open = !quoteTracker.open) ? '»' : '«');
        }
        return text;
    }
}
exports.RenderExtra = RenderExtra;
class QuoteTracker {
    open = true;
}
exports.QuoteTracker = QuoteTracker;
