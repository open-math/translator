import BlockView from "core/block/BlockView";
import { SecondaryType } from "./block";

export class VSecondary extends BlockView
{
    icon:           string;
    contentType:    SecondaryType;
    title:          string;
    content:        string;
}