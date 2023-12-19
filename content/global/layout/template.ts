import errorBlock from './__template/errorBlock';
import errorInliner from './__template/errorInliner';
import paragraph from './__template/paragraph';
import heading from './__template/heading';
import math from './__template/math';
import figure from './__template/figure';
import imath from './__template/imath';
import accentBlock from './__template/accentBlock';
import gallery from './__template/gallery';
import link from './__template/link';
import list from './__template/list';
import array from './__template/array';
import table from './__template/table';
import task from './__template/task';
import secondary from './__template/secondary';
import todo from './__template/todo';

let templates =
{
    errorBlock,
    errorInliner,
    paragraph,
    heading,
    math,
    figure,
    imath,
    accentBlock,
    gallery,
    link,
    list,
    array,
    table,
    task,
    secondary,
    todo
}

export function renderTemplate(name: string, locals: object = {})
{
    return templates[name](locals);
}