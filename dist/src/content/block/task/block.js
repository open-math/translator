"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimilarGenTask = exports.SimilarTask = exports.Task = exports.TaskBase = void 0;
const bitran_1 = require("bitran");
class TaskBase extends bitran_1.Block {
    type;
    title;
    statement;
    hint;
    solution;
    answer;
}
exports.TaskBase = TaskBase;
class Task extends TaskBase {
    type = 'task';
    tags;
    similar;
}
exports.Task = Task;
class SimilarTask extends TaskBase {
    type = 'similarTask';
}
exports.SimilarTask = SimilarTask;
class SimilarGenTask extends SimilarTask {
    type = 'similarGenTask';
    scriptId;
    script;
}
exports.SimilarGenTask = SimilarGenTask;
