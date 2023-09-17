declare let OMathEvent;

export function init(contentElem: HTMLElement)
{
    contentElem.querySelectorAll('a.link').forEach(link =>
    {
        link.addEventListener('click', e => OMathEvent.onLinkClick(link, e));
    });
}