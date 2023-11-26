declare let PhotoSwipe, PhotoSwipeLightbox, PhotoSwipeDynamicCaption;

export function init(contentElem: HTMLElement)
{
    //contentElem.querySelectorAll('.image').forEach(imgElem => initPhotoSwipeIn(imgElem, options?.vendor?.photoSwipe));
}

function initPhotoSwipeIn(imgElement: Element, phrases)
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
        ...phrases
    });

    lightbox.on('contentAppend', function (e) {
        let isInvertible = lightbox.pswp.currSlide.data.element.querySelector('img').hasAttribute('data-invertible');

        if (isInvertible)
            e.content.element.setAttribute('data-invertible', '');
    });

    let plugin = new PhotoSwipeDynamicCaption(lightbox, {
        type: 'below',
        captionContent: (slide) => {
            let caption = slide.data.element.closest('.image').querySelector(':scope > .caption');

            if (!caption)
                return '';
            
            return caption.innerHTML;
        }
    });

    lightbox.init();
}