import SimpleBar from 'simplebar';

import '@scss/libs/simplebar';

if (document.querySelectorAll('[data-simplebar]').length) {
    document.querySelectorAll('[data-simplebar]').forEach(scrollBlock => {
        new SimpleBar(scrollBlock, {
            autoHide: false,
            scrollBarMinSize: 100,
        });
    });
}