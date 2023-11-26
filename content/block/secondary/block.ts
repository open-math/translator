import { Block } from "bitran";
import Location from "core/location";

export default class Secondary extends Block
{
    type = 'secondary';
    icon:           Location;
    contentType:    SecondaryType;
    title:          string;
    content:        Block[];
}

export enum SecondaryType
{
    Quote = 'quote',
    Fact =  'fact',
    Joke =  'joke',
}