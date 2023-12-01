import { routeObjects } from '@js/base/routeObjects';
import tippy from 'tippy.js';
 
/*
inlinePositioning,
followCursor,
animateFill,
roundArrow,
sticky,
*/

//import 'tippy.js/animations/scale';
//import 'tippy.js/dist/tippy';
import "@scss/libs/tippy";

const hints = tippy('[data-tippy-content]', {
    plugins: [
        //animateFill,
        //roundArrow,
        //followCursor,
        //inlinePositioning,
        //sticky,
    ],
    //allowHTML: false,
    //animateFill: false,
    //animation: 'fade',
    //appendTo: () => document.body,
    //appendTo: 'parent',
    //appendTo: element,
    /*aria: {
        content: 'auto',
        expanded: 'auto',
    },*/
    //arrow: true,
    //content: '',
    delay: 0,
    duration: [300, 250],
    //followCursor: false,
    //getReferenceClientRect: null,
    //hideOnClick: true,
    //ignoreAttributes: false,
    //inertia: false,
    //inlinePositioning: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    maxWidth: 350,
    moveTransition: '',
    offset: [0, 10],
    placement: 'top',
    role: 'tooltip',
    showOnCreate: false,
    theme: '',
    touch: true,
    trigger: 'click',
    triggerTarget: null,
});
routeObjects.hints = hints;