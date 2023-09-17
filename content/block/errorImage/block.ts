import { Block } from "bitran";

export default class ErrorImage extends Block
{
    type = 'errorImage';
    error: Error;
}