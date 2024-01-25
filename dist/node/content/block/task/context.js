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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionContext = void 0;
const math = __importStar(require("mathjs"));
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
        math,
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
