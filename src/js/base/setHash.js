export function setHash(hash) {
    hash = hash ? `#${hash}` : window.location.href.split('#')[0];
    history.pushState('', '', hash);
}