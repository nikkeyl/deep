import { _slideDown } from '@js/base/slideDown';
import { _slideUp } from '@js/base/slideUp';

export let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}