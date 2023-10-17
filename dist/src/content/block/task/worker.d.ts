type TSections = {
    [name: string]: string;
};
export type TRequest = {
    scriptId: string;
    script: string;
    statement: string;
    sections: TSections;
};
export type TResponse = {
    scriptId: string;
    statement: string;
    sections: TSections;
};
export {};
