import { Block } from "bitran";
import Location from "./location";
export default abstract class Helper {
    abstract isEditor(): boolean;
    abstract hasImage(location: Location): Promise<boolean>;
    abstract getImageSrc(location: Location): Promise<string>;
    abstract getImageSize(location: Location): Promise<{
        width: number;
        height: number;
    }>;
    abstract getUnique(id: string): Promise<Block[]>;
    abstract i18n(phrase: string): string;
    abstract getMathMacros(): object;
    static getFrom(obj: object): Helper;
}
