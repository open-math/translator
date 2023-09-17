export function init(contentElem: HTMLElement)
{
    contentElem.querySelectorAll('.task').forEach(task =>
    {
        task.querySelectorAll(':scope > header > .controls > button').forEach(button =>
        {
            button.addEventListener('click', () =>
            {
                task.toggleAttribute(`data-${button.getAttribute('data-section')}-open`);
            });
        });
    });
}