import { removeClasses } from "@js/base/removeClasses";

export function toggleClasses(elem, className, array) {
    if (!elem.classList.contains(className)) {
        removeClasses(array, className);
        elem.classList.add(className);
    }
}