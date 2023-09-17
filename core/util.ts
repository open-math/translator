export function getInjectedProperty(from: object, property: string)
{
    let value = from[property];

    if (!value)
        throw new Error(`No injected property '${property}' found in ${from}!`);

    return value;
}