import { Block, Inliner } from "bitran";
import { FigureType } from "./global";
export declare class Figure extends Block {
    type: string;
    uuid: string;
    widthSet: {
        [bp: string]: string;
    };
    content: FigureContent;
    caption: FigureCaption;
}
export declare class FigureCaption {
    main: Inliner[];
    secondary: Inliner[];
    link: string;
    maxWidth: string;
}
export declare abstract class FigureContent {
    abstract type: FigureType;
}
