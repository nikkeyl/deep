import { menuClose } from '@js/components/menu';
import SmoothScroll from 'smooth-scroll';

export let gotoBlock = (targetBlock, speed = 500, offsetTop = 0) => {
    const targetBlockElement = document.querySelector(targetBlock);
    if (targetBlockElement) {
        let headerItem = '';
        let headerItemHeight = 0;
        let options = {
            speedAsDuration: true,
            speed: speed,
            header: headerItem,
            offset: offsetTop,
            easing: 'easeOutQuad',
        };
        document.documentElement.classList.contains('menu-open') ? menuClose() : null;

        if (typeof SmoothScroll !== 'undefined') {
            new SmoothScroll().animateScroll(targetBlockElement, '', options);
        } else {
            let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
            targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
            targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
            window.scrollTo({
                top: targetBlockElementPosition,
                behavior: 'smooth'
            });
        }
    }
}