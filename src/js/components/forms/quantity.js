export function quantity() {
    document.addEventListener('click', function (e) {
        let targetElement = e.target;
        if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
            const valueElement = targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]');
            let value = parseInt(valueElement.value);
            if (targetElement.hasAttribute('data-quantity-plus')) {
                value++;
                if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) {
                    value = valueElement.dataset.quantityMax;
                }
            } else {
                --value;
                if (+valueElement.dataset.quantityMin) {
                    if (+valueElement.dataset.quantityMin > value) {
                        value = valueElement.dataset.quantityMin;
                    }
                } else if (value < 1) {
                    value = 1;
                }
            }
            targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]').value = value;
        }
    });
}