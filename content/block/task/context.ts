function getRandomInt(min: number, max: number)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(length: number, valueFn: (index: number) => any)
{
    return [...Array(length)].map((val, index) => valueFn(index));
}

function getRandomFromArray(arr: any[])
{
    return arr[arr.length * Math.random() | 0];
}

function getRandomCutFromArray(arr: any[], cutLength: number)
{
    if (cutLength > arr.length)
        throw new Error(`Can't get more elements from array than it already has!`);

    let cut = [];
    let currentArr = [...arr];

    while (cut.length < cutLength)
    {
        let rndIndex = getRandomInt(0, currentArr.length - 1);
        cut.push(currentArr.splice(rndIndex, 1)[0]);
    }

    return cut;
}

function pluralize(count: number, ...words: string[])
{
    if (words.length === 1)
    {
        if (Array.isArray(words[0]))
        {
            words = words[0];
        }
        else
        {
            let word = words[0];

            if (word.endsWith('й'))
                words = [word, word.slice(0, -1) + 'я', word.slice(0, -1) + 'ев'];
            else if (word.endsWith('я'))
                words = [word, word.slice(0, -1) + 'и', word.slice(0, -1) + 'й']
            else
                words = [word, word + 'а', word + 'ов'];
        }
    }

    let cases = [2, 0, 1, 1, 1, 2];

    return words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
}

function pluralizeFull(count: number, ...words: string[])
{
    let label = pluralize(count, ...words);
    return `$${count}$ ${label}`;
}

//
//
//

export function getFunctionContext()
{
    return {
        pluralize,
        pluralizeFull,
        random:
        {
            int: getRandomInt,
            array: getRandomArray,
            fromArray: getRandomFromArray,
            cutArray: getRandomCutFromArray,
        }
    }
}