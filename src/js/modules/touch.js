import { isMobile } from "@js/base/isMobile";

export function addTouchClass() {
    if (isMobile.any()) document.documentElement.classList.add('touch');
}