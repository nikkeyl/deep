import { removeClasses } from '@js/base/removeClasses';
import { dataMediaQueries } from '@js/base/dataMedia';
import { _slideDown } from '@js/base/slideDown';
import { _slideUp } from '@js/base/slideUp';
import { getHash } from '@js/base/getHash';
import { setHash } from '@js/base/setHash';

export function tabs() {
    const tabs = document.querySelectorAll('[data-tabs]');
    let tabsActiveHash = [];

    if (tabs.length > 0) {
        const hash = getHash();
        if (hash && hash.startsWith('tab-')) {
            tabsActiveHash = hash.replace('tab-', '').split('-');
        }
        tabs.forEach((tabsBlock, index) => {
            tabsBlock.classList.add('tab-init');
            tabsBlock.setAttribute('data-tabs-index', index);
            tabsBlock.addEventListener('click', setTabsAction);
            initTabs(tabsBlock);
        });

        let mdQueriesArray = dataMediaQueries(tabs, 'tabs');
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener('change', function () {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
    }
    function setTitlePosition(tabsMediaArray, matchMedia) {
        tabsMediaArray.forEach(tabsMediaItem => {
            tabsMediaItem = tabsMediaItem.item;
            let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
            let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
            let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
            let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
            tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
            tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
            tabsContentItems.forEach((tabsContentItem, index) => {
                if (matchMedia.matches) {
                    tabsContent.append(tabsTitleItems[index]);
                    tabsContent.append(tabsContentItem);
                    tabsMediaItem.classList.add('tab-spoller');
                } else {
                    tabsTitles.append(tabsTitleItems[index]);
                    tabsMediaItem.classList.remove('tab-spoller');
                }
            });
        });
    }
    function initTabs(tabsBlock) {
        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
        const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

        if (tabsActiveHashBlock) {
            const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>.tab-active');
            tabsActiveTitle ? tabsActiveTitle.classList.remove('tab-active') : null;
        }
        if (tabsContent.length) {
            tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsContent.forEach((tabsContentItem, index) => {
                tabsTitles[index].setAttribute('data-tabs-title', '');
                tabsContentItem.setAttribute('data-tabs-item', '');

                if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
                    tabsTitles[index].classList.add('tab-active');
                }
                tabsContentItem.hidden = !tabsTitles[index].classList.contains('tab-active');
            });
        }
    }
    function setTabsStatus(tabsBlock) {
        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
        function isTabsAnamate(tabsBlock) {
            if (tabsBlock.hasAttribute('data-tabs-animate')) {
                return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
        }
        const tabsBlockAnimate = isTabsAnamate(tabsBlock);
        if (tabsContent.length > 0) {
            const isHash = tabsBlock.hasAttribute('data-tabs-hash');
            tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
            tabsContent.forEach((tabsContentItem, index) => {
                if (tabsTitles[index].classList.contains('tab-active')) {
                    if (tabsBlockAnimate) {
                        _slideDown(tabsContentItem, tabsBlockAnimate);
                    } else {
                        tabsContentItem.hidden = false;
                    }
                    if (isHash && !tabsContentItem.closest('.popup')) {
                        setHash(`tab-${tabsBlockIndex}-${index}`);
                    }
                } else {
                    if (tabsBlockAnimate) {
                        _slideUp(tabsContentItem, tabsBlockAnimate);
                    } else {
                        tabsContentItem.hidden = true;
                    }
                }
            });
        }
    }
    function setTabsAction(e) {
        const el = e.target;
        if (el.closest('[data-tabs-title]')) {
            const tabTitle = el.closest('[data-tabs-title]');
            const tabsBlock = tabTitle.closest('[data-tabs]');
            if (!tabTitle.classList.contains('tab-active') && !tabsBlock.querySelector('.slide')) {
                let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title].tab-active');
                tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
                removeClasses(tabActiveTitle, 'tab-active');
                tabTitle.classList.add('tab-active');
                setTabsStatus(tabsBlock);
            }
            e.preventDefault();
        }
    }
}