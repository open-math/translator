export function init(contentElem: HTMLElement)
{
    initImages(contentElem);
    initVideos(contentElem);
}

//
// Image
//

declare let PhotoSwipe, PhotoSwipeLightbox, PhotoSwipeDynamicCaption;

function initImages(contentElem: HTMLElement)
{
    contentElem.querySelectorAll('figure[data-type="image"]').forEach(imgFigure => initPhotoSwipeIn(imgFigure));
}

function initPhotoSwipeIn(imgElement: Element)
{
    let animDuration = 250;

    let options = {
        wheelToZoom: true,
        bgOpacity: .9,
        showAnimationDuration: animDuration,
        hideAnimationDuration: animDuration,
    }

    let lightbox = new PhotoSwipeLightbox({
        gallery: imgElement,
        children: 'a[data-pswp-single]',
        pswpModule: PhotoSwipe,
        ...options,
        ...(globalThis.PhotoSwipeLang ?? {})
    });

    lightbox.on('contentAppend', function (e) {
        let invert = lightbox.pswp.currSlide.data.element.querySelector('img').getAttribute('data-invert');

        if (invert)
            e.content.element.setAttribute('data-invert', invert);
    });

    let plugin = new PhotoSwipeDynamicCaption(lightbox, {
        type: 'below',
        captionContent: (slide) => {
            let caption = slide.data.element.closest('figure').querySelector('figcaption');

            if (!caption)
                return '';
            
            return caption.innerHTML;
        },
        mobileLayoutBreakpoint: () => true,
    });

    lightbox.init();
}

//
// Video
//

function initVideos(contentElem: HTMLElement)
{
    let figures = contentElem.querySelectorAll('figure[data-type="video"]');    
    let stateMap: { [uuid: string]: string } = {};

    const options: IntersectionObserverInit = {
        rootMargin: '0px 0px 75px 0px',
        threshold: 0,
    }

    const callback: IntersectionObserverCallback = entries =>
    {
        entries.forEach(entry =>
        {
            let video = entry.target as HTMLVideoElement;
            let uuid = video.closest('figure').getAttribute('data-uuid');

            if (entry.isIntersecting)
            {
                if (stateMap[uuid] === 'new' || stateMap[uuid] === 'inFlow')
                {
                    try { video.play(); } catch {}
                }
            }
            else
            {
                if (!video.paused)
                {
                    video.pause();
                    stateMap[uuid] = 'inFlow';
                }
                else
                {
                    if (stateMap[uuid] !== 'new')
                        stateMap[uuid] = 'outFlow';
                }
            }
        });
    }

    const observer = new IntersectionObserver(callback, options);

    figures.forEach(figure =>
    {
        stateMap[figure.getAttribute('data-uuid')] = 'new';
        observer.observe(figure.querySelector('video'));
    });
}