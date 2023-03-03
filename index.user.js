// ==UserScript==
// @name         yande.re quick image viewer
// @namespace    https://github.com/MRGRD56
// @version      1.2
// @author       MRGRD56
// @match        https://yande.re/post
// @match        https://yande.re/post?*
// @match        https://yande.re/post/?*
// @icon         https://yande.re/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scriptCss = document.createElement('style');
    scriptCss.innerHTML = `
    #post-list-posts .preview {
        cursor: zoom-in;
    }
    `;

    document.head.append(scriptCss);

    const viewerCss = document.createElement('link');
    viewerCss.setAttribute('rel', 'stylesheet')
    viewerCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.2/viewer.min.css');
    viewerCss.setAttribute('integrity', 'sha512-9EosEckNJFma9X2uo5ysGPhVf/dcZTuZUBVW2A9QcWBd0HAx6zs+FK+wsBGhl91uFfDI4ZY+/7MVhtYU4tXEig==');
    viewerCss.setAttribute('crossOrigin', 'anonymous');
    viewerCss.setAttribute('referrerpolicy', 'no-referrer');

    document.head.append(viewerCss);

    const viewerScript = document.createElement('script');
    viewerScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.2/viewer.min.js');
    viewerScript.setAttribute('integrity', 'sha512-1TCjsgfYd9edJ4mO6sb8rLzhnGpnFR4GazDGVhDekHrOHU7y7vcqGiO+4yW0HIDBoIY/ocbM/BrXxg8dYO6wSQ==');
    viewerScript.setAttribute('crossOrigin', 'anonymous');
    viewerScript.setAttribute('referrerpolicy', 'no-referrer');

    const scriptLoadListener = () => {
        viewerScript.removeEventListener('load', scriptLoadListener);

        const postListPosts = document.getElementById('post-list-posts');

        const viewer = new Viewer(postListPosts, {
            url(image) {
                return image
                    .parentElement
                    .parentElement
                    .parentElement
                    .querySelector('.directlink')
                    .href
                    .replace('https://files.yande.re/image/',
                        'https://files.yande.re/sample/');
            },
            filter(image) {
                return image.classList.contains('preview');
            },
            transition: false
        });

        for (const thumb of postListPosts.querySelectorAll('.thumb')) {
            thumb.addEventListener('click', (event) => {
                if (event.target.matches('img.preview')) {
                    event.preventDefault();
                }
            });
        }
    };

    viewerScript.addEventListener('load', scriptLoadListener);

    document.body.append(viewerScript);
})();