import fs from "fs";

export function moveAssets()
{
    fs.cpSync('content/assets', 'dist/content/assets', { recursive: true });
}