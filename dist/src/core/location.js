"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = exports.expandId = exports.LocationType = void 0;
const util_1 = require("./util");
var LocationType;
(function (LocationType) {
    LocationType["Topic"] = "topic";
    LocationType["Article"] = "article";
    LocationType["Summary"] = "summary";
    LocationType["Practicum"] = "practicum";
    LocationType["Contributor"] = "contributor";
    LocationType["Direct"] = "direct";
})(LocationType || (exports.LocationType = LocationType = {}));
function expandId(shortId) {
    let parts = shortId.split(':');
    let blockType = ((shortBlockType) => {
        switch (shortBlockType) {
            case 'h': return 'heading';
            case 's': return 'spoiler';
            case 'i': return 'important';
            // Accent blocks
            case 'd': return 'definition';
            case 't': return 'theorem';
            case 'e': return 'example';
        }
        return shortBlockType;
    })(parts[0]);
    return blockType + ':' + parts[1];
}
exports.expandId = expandId;
function getType(rawType) {
    if (rawType.startsWith('@'))
        rawType = rawType.slice(1);
    return rawType;
}
exports.getType = getType;
class Location {
    type;
    path;
    target;
    toString() {
        return `@${this.type}|${this.path}|${this.target}`;
    }
    static fromString(strLocation) {
        let parts = strLocation.split('|');
        let location = new Location;
        location.type = getType(parts[0]);
        location.path = parts[1];
        location.target = location.type === LocationType.Direct ? '' : expandId(parts[2]);
        return location;
    }
    //
    static normalize(rawLocation, context) {
        let parts = rawLocation.split('|');
        // Direct location
        // 
        // @direct|https://google.com
        if (rawLocation.startsWith('@direct')) {
            let location = new Location;
            location.type = LocationType.Direct;
            location.path = parts[1];
            location.target = '';
            return location;
        }
        // Block in current context
        //
        // blockType:blockId
        if (parts.length === 1) {
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
        if (parts.length === 2) {
            let location = new Location;
            location.type = getType(parts[0]);
            location.path = context.path;
            location.target = expandId(parts[1]);
            return location;
        }
        // Full link
        //
        // @locationType|path
        if (parts.length === 3) {
            let location = new Location;
            location.type = getType(parts[0]);
            location.path = parts[1];
            location.target = expandId(parts[2]);
            return location;
        }
        throw new Error(`Incorrect location structure: '${rawLocation}'!`);
    }
    static normalizeStr(rawLocation, context) {
        return this.normalize(rawLocation, context).toString();
    }
    //
    static getFrom(obj) {
        return (0, util_1.getInjectedProperty)(obj, 'location');
    }
}
exports.default = Location;
