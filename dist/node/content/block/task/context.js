"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionContext = void 0;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArray(length, valueFn) {
    return [...Array(length)].map((val, index) => valueFn(index));
}
function getRandomFromArray(arr) {
    return arr[arr.length * Math.random() | 0];
}
function getRandomCutFromArray(arr, cutLength) {
    if (cutLength > arr.length)
        throw new Error(`Can't get more elements from array than it already has!`);
    let cut = [];
    let currentArr = [...arr];
    while (cut.length < cutLength) {
        let rndIndex = getRandomInt(0, currentArr.length - 1);
        cut.push(currentArr.splice(rndIndex, 1)[0]);
    }
    return cut;
}
function pluralize(count, ...words) {
    if (words.length === 1) {
        if (Array.isArray(words[0])) {
            words = words[0];
        }
        else {
            let word = words[0];
            if (word.endsWith('й'))
                words = [word, word.slice(0, -1) + 'я', word.slice(0, -1) + 'ев'];
            else if (word.endsWith('я'))
                words = [word, word.slice(0, -1) + 'и', word.slice(0, -1) + 'й'];
            else
                words = [word, word + 'а', word + 'ов'];
        }
    }
    let cases = [2, 0, 1, 1, 1, 2];
    return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
}
function pluralizeFull(count, ...words) {
    let label = pluralize(count, ...words);
    return `$${count}$ ${label}`;
}
//
//
//
function getFunctionContext() {
    return {
        pluralize,
        pluralizeFull,
        random: {
            int: getRandomInt,
            array: getRandomArray,
            fromArray: getRandomFromArray,
            cutArray: getRandomCutFromArray,
        }
    };
}
exports.getFunctionContext = getFunctionContext;
