import { Block } from "bitran";
import Location from "./location";
import { getInjectedProperty } from "./util";

export default abstract class Helper
{
    abstract isEditor(): boolean;

    abstract hasAsset(location: Location): Promise<boolean>;
    abstract getAssetSrc(location: Location): Promise<string>;

    abstract getImageSize(location: Location): Promise<{ width: number, height: number }>;

    abstract getUnique(id: string): Promise<Block[]>;

    abstract i18n(phrase: string): string;

    abstract getMathMacros(): object;

    static getFrom(obj: object)
    {
        return getInjectedProperty(obj, 'helper') as Helper;
    }
}