export let isMobile = {
    Android: () => {
        return navigator.userAgent.match(/Android/i)
    },
    iOS: () => {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: () => {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    BlackBerry: () => {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    any: () => {
        return (isMobile.Android() || isMobile.iOS() || isMobile.Opera() || isMobile.BlackBerry())
    }
}