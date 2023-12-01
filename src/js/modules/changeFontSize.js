import { toggleClasses } from '@js/base/toggleClasses';

export function changeFontSize() {
    window.addEventListener('load', () => {
        const range = document.querySelector('[data-change-font-range]');
        const value = document.querySelector('[data-change-font-value]');
        const text = document.querySelector('[data-change-font-item]');
        function addSize(value) {
            text.style.fontSize = parseInt(value) + 'px';
        }
        if (text) {
            if (range && value) {
                addSize(range.value);
                value.innerHTML = range.value;
                range.oninput = () => {
                    addSize(range.value);
                    value.innerHTML = range.value;
                }
            }
            document.addEventListener('click', (e) => {
                const targetElement = e.target;
                if (targetElement.closest('[data-change-font-size]')) {
                    addSize(targetElement.getAttribute('data-change-font-size'));
                    toggleClasses(targetElement, 'active', '[data-change-font-size].active');
                }
            });
        }
    });
}