import { formValidate } from '@js/components/forms/formValidate';
import { routeObjects } from '@js/base/routeObjects';
import { _slideToggle } from '@js/base/slideToggle';
import { _slideUp } from '@js/base/slideUp';

class SelectConstructor {
    constructor(props, data = null) {
        let defaultConfig = {
            init: true
        }
        this.config = Object.assign(defaultConfig, props);
        this.selectClasses = {
            classSelect: 'select',
            classSelectBody: 'select__body',
            classSelectTitle: 'select__title',
            classSelectValue: 'select__value',
            classSelectLabel: 'select__label',
            classSelectInput: 'select__input',
            classSelectText: 'select__text',
            classSelectLink: 'select__link',
            classSelectOptions: 'select__options',
            classSelectOptionsScroll: 'select__scroll',
            classSelectOption: 'select__option',
            classSelectContent: 'select__content',
            classSelectRow: 'select__row',
            classSelectData: 'select__asset',
            classSelectDisabled: 'select-disabled',
            classSelectTag: 'select-tag',
            classSelectOpen: 'select-open',
            classSelectActive: 'select-active',
            classSelectFocus: 'select-focus',
            classSelectMultiple: 'select-multiple',
            classSelectCheckBox: 'select-checkbox',
            classSelectOptionSelected: 'select-selected',
            classSelectPseudoLabel: 'select-pseudo-label',
        }
        this._this = this;
        if (this.config.init) {
            const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
            if (selectItems.length) {
                this.selectsInit(selectItems);
            }
        }
    }
    getSelectClass(className) {
        return `.${className}`;
    }
    getSelectElement(selectItem, className) {
        return {
            originalSelect: selectItem.querySelector('select'),
            selectElement: selectItem.querySelector(this.getSelectClass(className)),
        }
    }
    selectsInit(selectItems) {
        selectItems.forEach((originalSelect, index) => {
            this.selectInit(originalSelect, index + 1);
        });
        document.addEventListener('click', function (e) {
            this.selectsActions(e);
        }.bind(this));
        document.addEventListener('keydown', function (e) {
            this.selectsActions(e);
        }.bind(this));
        document.addEventListener('focusin', function (e) {
            this.selectsActions(e);
        }.bind(this));
        document.addEventListener('focusout', function (e) {
            this.selectsActions(e);
        }.bind(this));
    }
    selectInit(originalSelect, index) {
        const _this = this;
        let selectItem = document.createElement('div');
        selectItem.classList.add(this.selectClasses.classSelect);
        originalSelect.parentNode.insertBefore(selectItem, originalSelect);
        selectItem.appendChild(originalSelect);
        originalSelect.hidden = true;
        index ? originalSelect.dataset.id = index : null;

        if (this.getSelectPlaceholder(originalSelect)) {
            originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
            if (this.getSelectPlaceholder(originalSelect).label.show) {
                const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
            }
        }
        selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
        this.selectBuild(originalSelect);

        originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
        originalSelect.addEventListener('change', function (e) {
            _this.selectChange(e);
        });
    }
    selectBuild(originalSelect) {
        const selectItem = originalSelect.parentElement;
        selectItem.dataset.id = originalSelect.dataset.id;
        originalSelect.dataset.classModif ? selectItem.classList.add(`select--${originalSelect.dataset.classModif}`) : null;
        originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
        originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
        this.setSelectTitleValue(selectItem, originalSelect);
        this.setOptions(selectItem, originalSelect);
        originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
        originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
        this.selectDisabled(selectItem, originalSelect);
    }
    selectsActions(e) {
        const targetElement = e.target;
        const targetType = e.type;
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
            const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            if (targetType === 'click') {
                if (!originalSelect.disabled) {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
                        this.selectAction(selectItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                }
            } else if (targetType === 'focusin' || targetType === 'focusout') {
                if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
                    targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                }
            } else if (targetType === 'keydown' && e.code === 'Escape') {
                this.selectsСlose();
            }
        } else {
            this.selectsСlose();
        }
    }
    selectsСlose(selectOneGroup) {
        const selectsGroup = selectOneGroup ? selectOneGroup : document;
        const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
        if (selectActiveItems.length) {
            selectActiveItems.forEach(selectActiveItem => {
                this.selectСlose(selectActiveItem);
            });
        }
    }
    selectСlose(selectItem) {
        const originalSelect = this.getSelectElement(selectItem).originalSelect;
        const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
        if (!selectOptions.classList.contains('slide')) {
            selectItem.classList.remove(this.selectClasses.classSelectOpen);
            _slideUp(selectOptions, originalSelect.dataset.speed);
        }
    }
    selectAction(selectItem) {
        const originalSelect = this.getSelectElement(selectItem).originalSelect;
        const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;

        if (originalSelect.closest('[data-one-select]')) {
            const selectOneGroup = originalSelect.closest('[data-one-select]');
            this.selectsСlose(selectOneGroup);
        }

        if (!selectOptions.classList.contains('slide')) {
            selectItem.classList.toggle(this.selectClasses.classSelectOpen);
            _slideToggle(selectOptions, originalSelect.dataset.speed);
        }
    }
    setSelectTitleValue(selectItem, originalSelect) {
        const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
        if (selectItemTitle) selectItemTitle.remove();
        selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
    }
    getSelectTitleValue(selectItem, originalSelect) {
        let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
        if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
            selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="select-tag">${this.getSelectElementContent(option)}</span>`).join('');
            if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
            }
        }
        selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
        let pseudoAttribute = '';
        let pseudoAttributeClass = '';
        if (originalSelect.hasAttribute('data-pseudo-label')) {
            pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
            pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
        }
        this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
        if (originalSelect.hasAttribute('data-search')) {
            return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
        } else {
            const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
            return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
        }
    }
    getSelectElementContent(selectOption) {
        const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
        const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
        let selectOptionContentHTML = ``;
        selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
        selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
        selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
        selectOptionContentHTML += selectOptionData ? `</span>` : '';
        selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
        selectOptionContentHTML += selectOption.textContent;
        selectOptionContentHTML += selectOptionData ? `</span>` : '';
        selectOptionContentHTML += selectOptionData ? `</span>` : '';
        return selectOptionContentHTML;
    }
    getSelectPlaceholder(originalSelect) {
        const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
        if (selectPlaceholder) {
            return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            }
        }
    }
    getSelectedOptionsData(originalSelect) {
        let selectedOptions = [];
        if (originalSelect.multiple) {
            selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
        } else {
            selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
        }
        return {
            elements: selectedOptions.map(option => option),
            values: selectedOptions.filter(option => option.value).map(option => option.value),
            html: selectedOptions.map(option => this.getSelectElementContent(option))
        }
    }
    getOptions(originalSelect) {
        let selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
        let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : '';
        let selectOptions = Array.from(originalSelect.options);
        if (selectOptions.length > 0) {
            let selectOptionsHTML = ``;
            if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
                selectOptions = selectOptions.filter(option => option.value);
            }
            selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : '';
            selectOptions.forEach(selectOption => {
                selectOptionsHTML += this.getOption(selectOption, originalSelect);
            });
            selectOptionsHTML += selectOptionsScroll ? `</div>` : '';
            return selectOptionsHTML;
        }
    }
    getOption(selectOption, originalSelect) {
        const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
        const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
        const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
        const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
        const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
        let selectOptionHTML = ``;
        selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
        selectOptionHTML += this.getSelectElementContent(selectOption);
        selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
        return selectOptionHTML;
    }
    setOptions(selectItem, originalSelect) {
        const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
        selectItemOptions.innerHTML = this.getOptions(originalSelect);
    }
    optionAction(selectItem, originalSelect, optionItem) {
        if (originalSelect.multiple) {
            optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
            const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
            originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
                originalSelectSelectedItem.removeAttribute('selected');
            });
            const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
            selectSelectedItems.forEach(selectSelectedItems => {
                originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
            });
        } else {
            if (!originalSelect.hasAttribute('data-show-selected')) {
                if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
                    selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                }
                optionItem.hidden = true;
            }
            originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
            this.selectAction(selectItem);
        }
        this.setSelectTitleValue(selectItem, originalSelect);
        this.setSelectChange(originalSelect);
    }
    selectChange(e) {
        const originalSelect = e.target;
        this.selectBuild(originalSelect);
        this.setSelectChange(originalSelect);
    }
    setSelectChange(originalSelect) {
        if (originalSelect.hasAttribute('data-validate')) {
            formValidate.validateInput(originalSelect);
        }
        if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
            let tempButton = document.createElement("button");
            tempButton.type = "submit";
            originalSelect.closest('form').append(tempButton);
            tempButton.click();
            tempButton.remove();
        }
        const selectItem = originalSelect.parentElement;
        this.selectCallback(selectItem, originalSelect);
    }
    selectDisabled(selectItem, originalSelect) {
        if (originalSelect.disabled) {
            selectItem.classList.add(this.selectClasses.classSelectDisabled);
            this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
        } else {
            selectItem.classList.remove(this.selectClasses.classSelectDisabled);
            this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
        }
    }
    searchActions(selectItem) {
        // const originalSelect = this.getSelectElement(selectItem).originalSelect;
        const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
        const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
        const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
        const _this = this;
        selectInput.addEventListener('input', function () {
            selectOptionsItems.forEach(selectOptionsItem => {
                if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) {
                    selectOptionsItem.hidden = false;
                } else {
                    selectOptionsItem.hidden = true;
                }
            });
            selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
        });
    }
    selectCallback(selectItem, originalSelect) {
        document.dispatchEvent(new CustomEvent('selectCallback', {
            detail: {
                select: originalSelect
            }
        }));
    }
}
routeObjects.select = new SelectConstructor({});