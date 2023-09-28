import { getInjectedProperty } from "./util";

export enum LocationType 
{
    Topic =         'topic',
        Article =   'article',
        Summary =   'summary',
        Practicum = 'practicum',

    Contributor =   'contributor',

    Direct = 'direct',
}

export function isIdLike(idLike: string)
{
    return idLike.split(':').length === 2;
}

export function expandId(shortId: string)
{
    let parts = shortId.split(':');

    if (parts.length === 1)
        return shortId;

    let blockType = ((shortBlockType) =>
    {
        switch (shortBlockType)
        {
            case 'h': return 'heading';
            case 's': return 'spoiler';

            // Accent blocks
            case 'd': return 'definition';
            case 't': return 'theorem';
            case 'e': return 'example';
            case 'i': return 'important';
        }

        return shortBlockType;
    })(parts[0]);

    return blockType + ':' + parts[1];
}

export function getType(rawType: string)
{
    if (rawType.startsWith('@'))
        rawType = rawType.slice(1);

    return rawType as LocationType;
}

export default class Location
{
    type:   LocationType;
    path:   string;
    target: string;

    toString()
    {
        return `@${this.type}|${this.path}|${this.target}`;
    }

    static fromString(strLocation: string)
    {
        let parts = strLocation.split('|');

        let location = new Location;
            location.type = getType(parts[0]);
            location.path = parts[1];

        if (location.type === LocationType.Direct || parts.length < 3)
            location.target = '';
        else
            location.target = expandId(parts[2]);

        return location;
    }

    //

    static normalize(rawLocation: string, context: Location)
    {
        let parts = rawLocation.split('|');

        // Direct location
        // 
        // @direct|https://google.com

        if (rawLocation.startsWith('@direct'))
        {
            let location = new Location;
                location.type = LocationType.Direct;
                location.path = parts[1];
                location.target = '';

            return location;
        }

        // Block in current context
        //
        // blockType:blockId

        if (parts.length === 1)
        {
            let location = new Location;
                location.type = context.type;
                location.path = context.path;
                location.target = expandId(rawLocation);
            
            return location;
        }

        // Block in current topic
        // !!! Only allowed in topics !!!
        //
        // @topicType|blockType:blockId

        if (parts.length === 2)
        {
            let location = new Location;
                location.type = getType(parts[0]);

            if (isIdLike(parts[1]))
            {
                location.path = context.path;
                location.target = expandId(parts[1]);
            }
            else
            {
                location.path = parts[1];
                location.target = '';
            }

            return location;
        }

        // Full link
        //
        // @locationType|path

        if (parts.length === 3)
        {
            let location = new Location;
                location.type = getType(parts[0]);
                location.path = parts[1];
                location.target = expandId(parts[2]);

            return location;
        }

        throw new Error(`Incorrect location structure: '${rawLocation}'!`);
    }

    static normalizeStr(rawLocation: string, context: Location)
    {
        return this.normalize(rawLocation, context).toString();
    }

    //

    static getFrom(obj: object)
    {
        return getInjectedProperty(obj, 'location') as Location;
    }
}