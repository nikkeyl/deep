import { bodyLockStatus, bodyLock, bodyUnlock } from '@js/base/bodyLockToggle';
import { routeObjects } from '@js/base/routeObjects';

class Popup {
    constructor(options) {
        let config = {
            init: true,
            attributeOpenButton: 'data-popup',
            attributeCloseButton: 'data-close',
            fixElementSelector: '[data-lp]',
            classes: {
                popup: 'popup',
                popupContent: 'popup__content',
                popupActive: 'popup--show',
                bodyActive: 'popup-show',
            },
            closeEsc: true,
            bodyLock: true,
        }
        this.isOpen = false;
        this.targetOpen = {
            selector: false,
            element: false,
        }
        this.previousOpen = {
            selector: false,
            element: false,
        }
        this.lastClosed = {
            selector: false,
            element: false,
        }
        this._dataValue = false;

        this._reopen = false;
        this._selectorOpen = false;

        this.lastFocusEl = false;
        this._focusEl = [
            'a[href]',
            'button:not([disabled]):not([aria-hidden])',
            'area[href]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        this.options = {
            ...config,
            ...options,
            classes: {
                ...config.classes,
                ...options?.classes,
            },
            on: {
                ...config.on,
                ...options?.on,
            }
        }
        this.bodyLock = false;
        this.options.init ? this.initPopups() : null
    }
    initPopups() {
        this.eventsPopup();
    }
    eventsPopup() {
        document.addEventListener('click', function (e) {
            const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (buttonOpen) {
                e.preventDefault();
                this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
                    buttonOpen.getAttribute(this.options.attributeOpenButton) :
                    'error';
                if (this._dataValue !== 'error') {
                    if (!this.isOpen) this.lastFocusEl = buttonOpen;
                    this.targetOpen.selector = `${this._dataValue}`;
                    this._selectorOpen = true;
                    this.open();
                    return;
                }

                return;
            }
            const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
            if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                e.preventDefault();
                this.close();
                return;
            }
        }.bind(this));
        document.addEventListener('keydown', function (e) {
            if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
                e.preventDefault();
                this.close();
                return;
            }
        }.bind(this))
    }
    open(selectorValue) {
        if (bodyLockStatus) {
            this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;

            if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
                this.targetOpen.selector = selectorValue;
                this._selectorOpen = true;
            }
            if (this.isOpen) {
                this._reopen = true;
                this.close();
            }
            if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
            if (!this._reopen) this.previousActiveElement = document.activeElement;

            this.targetOpen.element = document.querySelector(this.targetOpen.selector);

            if (this.targetOpen.element) {
                this.targetOpen.element.classList.add(this.options.classes.popupActive);
                document.documentElement.classList.add(this.options.classes.bodyActive);

                if (!this._reopen) {
                    !this.bodyLock ? bodyLock() : null;
                }
                else this._reopen = false;

                this.targetOpen.element.setAttribute('aria-hidden', 'false');

                this.previousOpen.selector = this.targetOpen.selector;
                this.previousOpen.element = this.targetOpen.element;

                this._selectorOpen = false;

                this.isOpen = true;

                setTimeout(() => {
                    this._focusTrap();
                }, 50);
            }
        }
    }
    close(selectorValue) {
        if (selectorValue && typeof (selectorValue) === 'string' && selectorValue.trim() !== '') {
            this.previousOpen.selector = selectorValue;
        }
        if (!this.isOpen || !bodyLockStatus) {
            return;
        }
        this.previousOpen.element.classList.remove(this.options.classes.popupActive);
        this.previousOpen.element.setAttribute('aria-hidden', 'true');
        if (!this._reopen) {
            document.documentElement.classList.remove(this.options.classes.bodyActive);
            !this.bodyLock ? bodyUnlock() : null;
            this.isOpen = false;
        }
        if (this._selectorOpen) {
            this.lastClosed.selector = this.previousOpen.selector;
            this.lastClosed.element = this.previousOpen.element;

        }
        setTimeout(() => {
            this._focusTrap();
        }, 50);
    }
    _focusTrap() {
        const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
        if (!this.isOpen && this.lastFocusEl) {
            this.lastFocusEl.focus();
        } else {
            focusable[0].focus();
        }
    }
}
routeObjects.popup = new Popup({});