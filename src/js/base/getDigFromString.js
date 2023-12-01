export function getDigFromString(item) {
    return parseInt(item.replace(/[^\d]/g, ''));
}