import BlockView from "core/block/BlockView";
import { FigureType } from "./global";

export class VFigure extends BlockView
{
    uuid:       string;
    widthCss:   string;

    content:    VFigureContent;
    caption:    VFigureCaption;

    // ??? widthSettings;
    // ??? styled: boolean;
}

export class VFigureCaption
{
    main:       string;
    secondary:  string;
    link:       string;
}

export abstract class VFigureContent
{
    abstract type: FigureType;
}