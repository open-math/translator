export const IS_DEV = isDev();

function isDev()
{
    let args = process.argv.slice(2);

    if (args.length === 0)
        return false;

    return args[0] === '--dev';
}