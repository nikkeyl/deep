export function addLoadedClass() {
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.documentElement.classList.add('loaded');
        }, 0);
    });
}