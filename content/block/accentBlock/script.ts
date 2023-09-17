export function init(contentElem: HTMLElement)
{
    contentElem.querySelectorAll('.accentBlock').forEach(abElement =>
    {
        let expandButton = abElement.querySelector(':scope > .side > .expand');
        if (expandButton)
            expandButton.addEventListener('click', () => abElement.toggleAttribute('data-expand-open'));
    });
}