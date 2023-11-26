import { Block, Inliner } from "bitran";
import { FigureType } from "./global";

export class Figure extends Block
{
    type = 'figure';

    uuid:       string;
    widthSet:   { [bp: string]: string }

    content:    FigureContent;
    caption:    FigureCaption;
}

export class FigureCaption
{
    main:       Inliner[];
    secondary:  Inliner[];
    link:       string;
}

export abstract class FigureContent
{
    abstract type: FigureType;
}