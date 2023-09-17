class Gallery
{
    selectorImages: NodeListOf<Element>;
    displayImages: NodeListOf<Element>;

    constructor(root: Element)
    {
        this.selectorImages = root.querySelectorAll(':scope > .selector > .inner > .image');
        this.displayImages = root.querySelectorAll(':scope > .display > .displayImage');

        this.selectorImages.forEach((sImg, i) => sImg.addEventListener('click', () =>
        {
            this.selectorImages.forEach(_sImg => _sImg.removeAttribute('data-current'));
            sImg.setAttribute('data-current', '');

            this.displayImages.forEach(dImg => dImg.removeAttribute('data-current'));
            this.displayImages[i].setAttribute('data-current', '');
        }));

        let startNum = parseFloat(root.getAttribute('data-start')) - 1;
        
        if (startNum < 0) startNum = 0;
        if (startNum > this.selectorImages.length - 1) startNum = this.selectorImages.length - 1;

        let startImg = this.selectorImages[startNum] as HTMLElement;
        if (startImg)
            startImg.click();
    }
}

export function init(contentElem: HTMLElement)
{
    contentElem.querySelectorAll('.gallery').forEach(galleryElem => new Gallery(galleryElem));
}