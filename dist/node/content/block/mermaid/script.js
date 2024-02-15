"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const themes_1 = require("./themes");
let Mermaid = null;
//
function getTheme() {
    let strTheme = (document.documentElement.getAttribute('data-theme'))?.split('-').pop() ?? 'light';
    return strTheme === 'light' ? themes_1.lightTheme : themes_1.darkTheme;
}
async function init(contentElem) {
    Mermaid = (await MermaidPromise).default;
    await new Promise(resolve => setTimeout(resolve, 10));
    const mermaidElements = contentElem.querySelectorAll('.mermaid');
    for (const mermaidElem of mermaidElements) {
        await renderDiagElem(mermaidElem);
        registerDiagClick(mermaidElem);
    }
    let obs = new MutationObserver(() => {
        for (const mermaidElem of mermaidElements) {
            setTimeout(async () => {
                await renderDiagElem(mermaidElem);
                registerDiagClick(mermaidElem);
            }, 1);
        }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'], });
}
exports.init = init;
async function renderDiag(id, rawDiag, theme) {
    Mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        ...theme,
    });
    let element = document.createElement('div');
    const { svg } = await Mermaid.render(id, rawDiag, element);
    return svg.innerHTML;
}
async function renderDiagElem(diagElem) {
    const pre = diagElem.querySelector('pre');
    const rawDiag = pre.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    Mermaid.setParseErrorHandler(() => { });
    Mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        ...(getTheme()),
    });
    let renderResult = '';
    try {
        if (await Mermaid.parse(rawDiag))
            renderResult = (await Mermaid.render('mermaid-' + diagElem.id, rawDiag)).svg;
    }
    catch (e) {
        console.error(e);
        renderResult = '<b style="color: red">Error when generating mermaid chart!</b>';
    }
    diagElem.querySelector('svg')?.remove();
    diagElem.querySelector('.loading')?.remove();
    diagElem.insertAdjacentHTML('beforeend', renderResult);
}
function registerDiagClick(diagElem) {
    const svgElem = diagElem.querySelector(':scope > svg');
    if (!svgElem)
        return;
    svgElem.addEventListener('click', () => {
        const slide = svgElem.cloneNode(true);
        slide.removeAttribute('style');
        slide.removeAttribute('width');
        const width = Math.min(1000, .9 * window.innerWidth);
        const scaleHeightFactor = svgElem.clientHeight / svgElem.clientWidth;
        const lightbox = new PhotoSwipeLightbox({
            pswpModule: PhotoSwipe,
            index: 0,
            dataSource: [{
                    html: slide.outerHTML,
                    width: width,
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
