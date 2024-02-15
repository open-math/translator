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
const factory_6 = require("../content/block/accentBlock/factory");
const factory_7 = require("../content/block/include/factory");
const factory_8 = require("../content/block/list/factory");
const factory_9 = require("../content/block/html/factory");
const factory_10 = require("../content/block/array/factory");
const factory_11 = require("../content/block/table/factory");
const factory_12 = require("../content/block/task/factory");
const factory_13 = require("../content/block/spoiler/factory");
const factory_14 = require("../content/block/todo/factory");
const factory_15 = require("../content/block/figure/factory");
const factory_16 = require("../content/block/gallery/factory");
const factory_17 = require("../content/block/secondary/factory");
const factory_18 = require("../content/block/mermaid/factory");
// Inliner Factories
const factory_19 = require("../content/inliner/text/factory");
const factory_20 = require("../content/inliner/imath/factory");
const factory_21 = require("../content/inliner/errorInliner/factory");
const factory_22 = require("../content/inliner/link/factory");
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
        figure: factory_15.VFFigure,
        gallery: factory_16.VFGallery,
        list: factory_8.VFList,
        array: factory_10.VFArray,
        table: factory_11.VFTable,
        task: factory_12.VFTask,
        secondary: factory_17.VFSecondary,
        spoiler: factory_13.VFSpoiler,
        html: factory_9.VFHtml,
        include: factory_7.VFInclude,
        important: factory_6.VFAccentBlock,
        example: factory_6.VFAccentBlock,
        definition: factory_6.VFAccentBlock,
        theorem: factory_6.VFAccentBlock,
        mermaid: factory_18.VFMermaid,
        todo: factory_14.VFTodo,
    };
    inlinerFactories = {
        text: factory_19.VFText,
        errorInliner: factory_21.VFErrorInliner,
        imath: factory_20.VFIMath,
        link: factory_22.VFLink,
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
                    if (inliner.type === 'text')
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
            else
                result += inliner;
        }
        return result;
    }
}
exports.default = Renderer;
class RenderExtra {
    static afterStyle(text, quoteTracker) {
        text = text.replace(/\*\*(.+?)\*\*/gm, `<strong>$1</strong>`);
        text = text.replace(/\*(.+?)\*/gm, `<em>$1</em>`);
        text = text.replace(/(^| )-- /gm, '$1— ');
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
