import { formValidate } from '@js/components/forms/formValidate';
import { gotoBlock } from '@js/base/goToBlock';

export function formSubmit() {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', function (e) {
				const form = e.target;
				formSubmitAction(form, e);
			});
			form.addEventListener('reset', function (e) {
				const form = e.target;
				formValidate.formClean(form);
			});
		}
	}
	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
		if (error !== 0) {
			e.preventDefault();
			if (form.querySelector('.form-error') && form.hasAttribute('data-goto-error')) {
				const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '.form-error';
				gotoBlock(formGoToErrorClass, 1000);
			}
		}
	}
}