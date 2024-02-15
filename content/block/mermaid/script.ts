import { lightTheme, darkTheme } from "./themes";

declare let PhotoSwipe, PhotoSwipeLightbox, MermaidPromise;

let Mermaid = null;
let obs: MutationObserver = null;

//

function getTheme()
{
    let strTheme = (document.documentElement.getAttribute('data-theme'))?.split('-').pop() ?? 'light'
    return strTheme === 'light' ? lightTheme : darkTheme;
}

export async function init(contentElem: HTMLElement)
{
    obs?.disconnect();
    obs = null;

    Mermaid = null;
    Mermaid = (await MermaidPromise).default;

    await new Promise(resolve => setTimeout(resolve, 10));

    const mermaidElements = contentElem.querySelectorAll('.mermaid') as any as HTMLElement[];

    for (const mermaidElem of mermaidElements)
    {
        await renderDiagElem(mermaidElem);
        registerDiagClick(mermaidElem);
    }

    obs = new MutationObserver(() => {
        for (const mermaidElem of mermaidElements)
        {
            setTimeout(async () => {
                await renderDiagElem(mermaidElem);
                registerDiagClick(mermaidElem);
            }, 1);
        }
    });

    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'], });
}

async function renderDiagElem(diagElem: HTMLElement)
{
    const pre = diagElem.querySelector('pre');
    const rawDiag = pre.innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');

    Mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        ...(getTheme()),
    });

    let renderResult = '';

    try {
        if (await Mermaid.parse(rawDiag))
            renderResult = (await Mermaid.render('mermaid-' + diagElem.id, rawDiag)).svg;
    } catch(e)
    {
        console.error(e);
        renderResult = '<b style="color: red">Error when generating mermaid chart!</b>';
    }

    diagElem.querySelector('.loading')?.remove();
    diagElem.querySelector('svg')?.remove();
    diagElem.insertAdjacentHTML('beforeend', renderResult);
}

function registerDiagClick(diagElem: HTMLElement)
{
    const svgElem = diagElem.querySelector(':scope > svg') as HTMLElement;

    if (!svgElem)
        return;

    svgElem.addEventListener('click', () => {
        const slide = svgElem.cloneNode(true) as HTMLElement;
        slide.removeAttribute('style');
        slide.removeAttribute('width');

        const width = Math.min(1000, .9 * window.innerWidth);
        const scaleHeightFactor = svgElem.clientHeight / svgElem.clientWidth;

        const lightbox = new PhotoSwipeLightbox({
            pswpModule: PhotoSwipe,
            index: 0,
            dataSource: [{
                html:   slide.outerHTML,
                width:  width,
                height: width * scaleHeightFactor,
            }],
            wheelToZoom: true,
            bgOpacity: 1,
        });

        lightbox.addFilter('isContentZoomable', () => true);
        lightbox.init();
        lightbox.loadAndOpen(0);
    });
}