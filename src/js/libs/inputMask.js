import { routeObjects } from "@js/base/routeObjects";
import "inputmask/dist/inputmask.min.js";

const inputMasks = document.querySelectorAll('input');
if (inputMasks.length) {
    routeObjects.inputmask = Inputmask().mask(inputMasks);
}