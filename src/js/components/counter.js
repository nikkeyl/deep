export function counter(options = { selector: 'section', repeat: false, threshold: 0.3 }) {
    window.addEventListener('load', function () {
        function digitsCountersInit(digitsCountersItems) {
            let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll('[data-digits-counter]');
            if (digitsCounters) {
                digitsCounters.forEach(digitsCounter => {
                    digitsCountersAnimate(digitsCounter);
                });
            }
        }
        function digitsCountersAnimate(digitsCounter) {
            let startTimestamp = null;
            const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
            const startValue = parseInt(digitsCounter.innerHTML);
            const startPosition = 0;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target;
                    const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]');
                    if (digitsCountersItems.length) {
                        digitsCountersInit(digitsCountersItems);
                    }
                    (options.repeat == false) ? observer.unobserve(targetElement) : null;
                }
            });
        }, options);
        let sections = document.querySelectorAll(options.selector);
        if (sections.length) {
            sections.forEach(section => {
                observer.observe(section);
            });
        }
    });
}