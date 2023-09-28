"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VFLink = exports.FLink = void 0;
const bitran_1 = require("bitran");
const inliner_1 = __importDefault(require("./inliner"));
const viewFactory_1 = require("../../../core/viewFactory");
const view_1 = require("./view");
const location_1 = __importStar(require("../../../core/location"));
class FLink extends bitran_1.InlinerFactory {
    regexp = /\[(.+?)\]\((.+?)\)/gm;
    async parse(match) {
        let link = new inliner_1.default;
        link.label = await this.parser.parseInliners(match[1]);
        link.target = match[2];
        return link;
    }
}
exports.FLink = FLink;
class VFLink extends viewFactory_1.InlinerViewFactory {
    async setupView(product) {
        let link = new view_1.VLink;
        link.label = await this.renderer.renderInliners(product.label);
        let targetLocation = location_1.default.fromString(product.target);
        if (targetLocation.type === location_1.LocationType.Direct) {
            link.target = targetLocation.path;
            return link;
        }
        if (targetLocation.target === '') {
            link.target = `/${targetLocation.path}/@${targetLocation.type}/`;
            return link;
        }
        link.target = this.locationToHref(targetLocation);
        link.preview = product.target;
        return link;
    }
    async getRender(view) {
        return this.renderTemplate('link', view);
    }
    //
    locationToHref(location) {
        // Only works for topics!
        // TODO: Add contributors and other pages!
        return `/${location.path}/@${location.type}/${location.target ? '#' + location.target : ''}`;
    }
}
exports.VFLink = VFLink;
