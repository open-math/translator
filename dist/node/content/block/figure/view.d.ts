import BlockView from "../../../core/block/BlockView";
import { FigureType } from "./global";
export declare class VFigure extends BlockView {
    uuid: string;
    widthCss: string;
    content: VFigureContent;
    caption: VFigureCaption;
}
export declare class VFigureCaption {
    main: string;
    secondary: string;
    link: string;
    maxWidth: string;
}
export declare abstract class VFigureContent {
    abstract type: FigureType;
}
