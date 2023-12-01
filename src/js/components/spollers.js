import { dataMediaQueries } from '@js/base/dataMedia';
import { _slideToggle } from '@js/base/slideToggle';
import { _slideUp } from '@js/base/slideUp';

export function spollers() {
    const spollersArray = document.querySelectorAll('[data-spollers]');
    if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter(function (item) {
            return !item.dataset.spollers.split(',')[0];
        });
        if (spollersRegular.length) {
            initSpollers(spollersRegular);
        }
        let mdQueriesArray = dataMediaQueries(spollersArray, 'spollers');
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener('change', function () {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('spoller-init');
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener('click', setSpollerAction);
                } else {
                    spollersBlock.classList.remove('spoller-init');
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener('click', setSpollerAction);
                }
            });
        }
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length) {
                spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('spoller-active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }
        function setSpollerAction(e) {
            const el = e.target;
            if (el.closest('[data-spoller]')) {
                const spollerTitle = el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (!spollersBlock.querySelectorAll('.slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('spoller-active')) {
                        hideSpollersBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle('spoller-active');
                    _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                }
                e.preventDefault();
            }
        }
        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller].spoller-active');
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            if (spollerActiveTitle && !spollersBlock.querySelectorAll('.slide').length) {
                spollerActiveTitle.classList.remove('spoller-active');
                _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
            }
        }
        const spollersClose = document.querySelectorAll('[data-spoller-close]');
        if (spollersClose.length) {
            document.addEventListener('click', function (e) {
                const el = e.target;
                if (!el.closest('[data-spollers]')) {
                    spollersClose.forEach(spollerClose => {
                        const spollersBlock = spollerClose.closest('[data-spollers]');
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove('spoller-active');
                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    });
                }
            });
        }
    }
}