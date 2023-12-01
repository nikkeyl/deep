import { toggleClasses } from '@js/base/toggleClasses';

export function changeStyle(options = { firstRemoveClass: 'block', secondRemoveClass: 'line' }) {
    window.addEventListener('load', () => {
        const item = document.querySelector('[data-change-style-item]');
        if (item) {
            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.closest('[data-change-style-button]')) {
                    item.classList.remove(options.firstRemoveClass);
                    item.classList.remove(options.secondRemoveClass);
                    item.classList.add(el.getAttribute('data-change-style-button'));
                    toggleClasses(el, 'active', '[data-change-style-button].active');
                }
            });
        }
    });
}