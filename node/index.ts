import fs from "fs";
import path from "path";

export function copyAssetsTo(targetPath: string)
{
    let localPath = require.resolve('./').split(path.sep);
        localPath = localPath.slice(0, -4);
        localPath = localPath.join(path.sep) as any;

    fs.cpSync(localPath + '/dist/content', path.normalize(targetPath), { recursive: true });
}