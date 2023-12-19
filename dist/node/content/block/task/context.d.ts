declare function getRandomInt(min: number, max: number): number;
declare function getRandomArray(length: number, valueFn: (index: number) => any): any[];
declare function getRandomFromArray(arr: any[]): any;
declare function getRandomCutFromArray(arr: any[], cutLength: number): any[];
declare function pluralize(count: number, ...words: string[]): string;
declare function pluralizeFull(count: number, ...words: string[]): string;
export declare function getFunctionContext(): {
    pluralize: typeof pluralize;
    pluralizeFull: typeof pluralizeFull;
    random: {
        int: typeof getRandomInt;
        array: typeof getRandomArray;
        fromArray: typeof getRandomFromArray;
        cutArray: typeof getRandomCutFromArray;
    };
};
export {};
