export function getHash() {
    if (location.hash) { return location.hash.replace('#', ''); }
}