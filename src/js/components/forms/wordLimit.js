export function wordLimit() {
    window.addEventListener('load', function (e) {
        const txtItem = document.querySelector('[data-input]');
        if (txtItem) {
            const txtItemLimit = txtItem.getAttribute('maxlength');
            const txtCounter = document.querySelector('[data-max-length]');
            if (txtCounter && txtItemLimit) {
                txtCounter.innerHTML = txtItemLimit;
                if (e.code === 8) {
                    txtItem.addEventListener('input', () => {
                        const txtCounterResult = txtItemLimit - txtItem.value.length;
                        txtCounter.innerHTML = txtCounterResult;
                    });
                }
                txtItem.addEventListener('keyup', () => {
                    const txtCounterResult = txtItemLimit - txtItem.value.length;
                    txtCounter.innerHTML = txtCounterResult;
                });
            }
        }
    });
}