import fs from "fs";

export function moveAssets()
{
    fs.mkdirSync('dist/content/assets');
    fs.cpSync('content/assets', 'dist/content/assets', { recursive: true });
}