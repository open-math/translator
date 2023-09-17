export declare enum LocationType {
    Topic = "topic",
    Article = "article",
    Summary = "summary",
    Practicum = "practicum",
    Contributor = "contributor",
    Direct = "direct"
}
export declare function expandId(shortId: string): string;
export declare function getType(rawType: string): LocationType;
export default class Location {
    type: LocationType;
    path: string;
    target: string;
    toString(): string;
    static fromString(strLocation: string): Location;
    static normalize(rawLocation: string, context: Location): Location;
    static normalizeStr(rawLocation: string, context: Location): string;
    static getFrom(obj: object): Location;
}
