export function clock() {
    window.addEventListener('load', () => {
        setInterval(() => {
            const now = new Date();
            const clock = document.querySelector('[data-clock]');
            if (clock) {
                clock.innerHTML = now.toLocaleTimeString();
            }
        }, 1000);
    });
}