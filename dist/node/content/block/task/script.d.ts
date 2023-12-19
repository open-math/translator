import type { TResponse } from "./worker";
export declare function init(contentElem: HTMLElement): void;
export declare class GenTask {
    elements: {
        task: Element;
        statement: Element;
        sections: {
            [name: string]: Element;
        };
    };
    constructor(taskElem: Element);
    get statement(): string;
    set statement(value: string);
    getSectionNames(): string[];
    getSectionContent(sectionName: string): string;
    setSectionContent(sectionName: string, value: string): void;
}
export declare class GenTaskManager {
    worker: Worker;
    taskMap: {
        [scriptId: string]: GenTask;
    };
    initWorker(): void;
    genTask(taskElem: Element): void;
    setupTask(response: TResponse): void;
}
