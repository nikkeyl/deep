import { uniqArray } from '@js/base/uniqArray';

export function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(function (item) {
        if (item.dataset[dataSetValue]) {
            return item.dataset[dataSetValue].split(',')[0];
        }
    });
    if (media.length) {
        const breakpointsArray = [];
        media.forEach(item => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(',');
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });
        let mdQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
        });
        mdQueries = uniqArray(mdQueries);
        const mdQueriesArray = [];

        if (mdQueries.length) {
            mdQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(',');
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                const itemsArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia
                })
            });
            return mdQueriesArray;
        }
    }
}