declare let OMathEvent;

export function init(contentElem: HTMLElement)
{
    contentElem.querySelectorAll('a.link').forEach(link =>
    {
        let timeout;
        let canOpenLink = false;

        link.addEventListener('click', (e) =>
        {
            if (canOpenLink || !link.hasAttribute('data-preview'))
                return;

            e.preventDefault();

            clearTimeout(timeout);
            canOpenLink = true;
            timeout = setTimeout(() => { canOpenLink = false; }, 300);

            // Preview

            OMathEvent.onLinkClick(link, e);
        });
    });
}