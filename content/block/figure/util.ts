import Location, { LocationType } from "core/location";

export class Size
{
    width:  number;
    height: number;
    
    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
    }
}

export function locationFromSrc(src: string, context: Location)
{
    let location = new Location;
    let srcParts = src.split('|');
    
    switch (srcParts.length)
    {
        // File is located in current topic
        case 1:
            location.type = LocationType.Topic;
            location.path = context.path;
            location.target = srcParts[0];
            break;
        
        case 2:
            throw new Error(`Invalid 'src' property: '${src}'`);
        
        // File is located somewhere else
        case 3:
            location.type =      srcParts[0].slice(1) as LocationType;
            location.path =      srcParts[1];
            location.target =    srcParts[2];
            break;
    }

    // TODO: Allow external resources for "src"?

    return location;
} 