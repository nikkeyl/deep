import { routeObjects } from '@js/base/routeObjects';
import marquee from 'vanilla-marquee';

if (document.querySelector('[data-marquee]')) {
    const marq = new marquee({
        css3easing: 'linear',
        delayBeforeStart: 1000,
        direction: 'left',
        duplicated: true,
        // duration: 15000,
        speed: 100,
        gap: 20,
        pauseOnHover: true,
        startVisible: true,
        recalcResize: true
    });
    routeObjects.marq = marq;
}