import { gotoBlock } from '@js/base/goToBlock';

let addWindowScrollEvent = false;
export function pageNavigation() {
    document.addEventListener("click", pageNavigationAction);
    document.addEventListener("watcherCallback", pageNavigationAction);
    function pageNavigationAction(e) {
        if (e.type === "click") {
            const targetElement = e.target;
            if (targetElement.closest('[data-goto]')) {
                const gotoLink = targetElement.closest('[data-goto]');
                const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
                const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                gotoBlock(gotoLinkSelector, gotoSpeed, offsetTop);
                e.preventDefault();
            }
        }
    }
}
setTimeout(() => {
    if (addWindowScrollEvent) {
        let windowScroll = new Event("windowScroll");
        window.addEventListener("scroll", function () {
            document.dispatchEvent(windowScroll);
        });
    }
}, 0);