"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenTaskManager = exports.GenTask = exports.init = void 0;
const script_1 = require("../../global/script");
function init(contentElem) {
    contentElem.querySelectorAll('.task').forEach(task => {
        task.querySelectorAll(':scope > header > .controls > button').forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('generate')) {
                    let genManager = globalThis.GenTaskManager;
                    genManager.genTask(task);
                    return;
                }
                if (button.getAttribute('data-section') === 'similar' && !task.hasAttribute('data-similar-open')) {
                    if (!task.hasAttribute('data-tasks-generated')) {
                        task.setAttribute('data-tasks-generated', '');
                        task.parentElement.querySelectorAll(':scope > .similarTasks .task.genTask').forEach(_task => globalThis.GenTaskManager.genTask(_task));
                    }
                }
                task.toggleAttribute(`data-${button.getAttribute('data-section')}-open`);
            });
        });
    });
}
exports.init = init;
//
//
//
class GenTask {
    elements;
    constructor(taskElem) {
        this.elements = {};
        this.elements.task = taskElem;
        this.elements.statement = taskElem.querySelector(':scope > .statement');
        this.elements.sections = {};
        taskElem.querySelectorAll('section').forEach(sectionElem => {
            this.elements.sections[sectionElem.getAttribute('data-name')] = sectionElem;
        });
    }
    get statement() {
        return this.elements.statement.innerHTML;
    }
    set statement(value) {
        this.elements.statement.innerHTML = value;
    }
    //
    getSectionNames() {
        return Object.keys(this.elements.sections);
    }
    getSectionContent(sectionName) {
        let sectionElem = this.elements.sections[sectionName];
        if (!sectionElem)
            return null;
        return sectionElem.querySelector(':scope > .inner > .content').innerHTML;
    }
    setSectionContent(sectionName, value) {
        let sectionElem = this.elements.sections[sectionName];
        if (!sectionElem)
            return;
        sectionElem.querySelector(':scope > .inner > .content').innerHTML = value;
    }
}
exports.GenTask = GenTask;
//
//
//
class GenTaskManager {
    worker;
    taskMap = {};
    initWorker() {
        this.worker = new Worker(globalThis.TaskGenUrl);
        this.worker.onmessage = e => { this.setupTask(e.data); };
    }
    genTask(taskElem) {
        let scriptId = taskElem.getAttribute('data-script-id');
        if (this.taskMap[scriptId])
            return;
        let genTask = new GenTask(taskElem);
        this.taskMap[scriptId] = genTask;
        taskElem.setAttribute('data-generating', '');
        let request = {};
        request.scriptId = scriptId;
        request.script = taskElem.getAttribute('data-script');
        request.statement = genTask.statement;
        let sections = {};
        genTask.getSectionNames().forEach(sectionName => {
            sections[sectionName] = genTask.getSectionContent(sectionName);
        });
        if (Object.keys(sections).length > 0)
            request.sections = sections;
        if (!this.worker)
            this.initWorker();
        this.worker.postMessage(request);
    }
    setupTask(response) {
        let genTask = this.taskMap[response.scriptId];
        genTask.statement = response.statement;
        if (response.sections)
            Object.keys(response.sections).forEach(sectionName => {
                genTask.setSectionContent(sectionName, response.sections[sectionName]);
            });
        (0, script_1.initProducts)(genTask.elements.task);
        genTask.elements.task.removeAttribute('data-generating');
        delete this.taskMap[response.scriptId];
    }
}
exports.GenTaskManager = GenTaskManager;
