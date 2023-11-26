"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoVFigureContent = exports.VideoFigureContent = void 0;
const block_1 = require("../block");
const global_1 = require("../global");
const view_1 = require("../view");
const util_1 = require("../util");
class VideoFigureContent extends block_1.FigureContent {
    type = global_1.FigureType.Video;
    src;
    static async setupContent(raw, context, helper) {
        try {
            if (!raw.src)
                throw new Error(`Missing 'src' property!`);
            let videoLocation = (0, util_1.locationFromSrc)(raw.src, context);
            let hasVideo = await helper.hasAsset(videoLocation);
            if (!hasVideo)
                throw new Error(`Missing video ${videoLocation}!`);
            let video = new VideoFigureContent;
            video.src = videoLocation;
            return video;
        }
        catch (e) {
            let message = 'Unknown error when parsing video!';
            if (e.message)
                message = e.message;
            console.error('Video error!');
            console.error(raw);
            throw new Error(message);
        }
    }
}
exports.VideoFigureContent = VideoFigureContent;
class VideoVFigureContent extends view_1.VFigureContent {
    type = global_1.FigureType.Video;
    src;
    static async setupContent(content, helper) {
        try {
            let view = new VideoVFigureContent;
            view.src = await helper.getAssetSrc(content.src);
            return view;
        }
        catch (e) {
            let message = 'Unknown error when rendering video!';
            if (e.message)
                message = e.message;
            console.error('Video error!');
            console.error(content);
            throw new Error(message);
        }
    }
}
exports.VideoVFigureContent = VideoVFigureContent;
