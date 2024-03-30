import { v4 as uuidv4 } from 'uuid';

export default class Form {
  /**
     * Base form class that uses kendoForm. Used by a specific form in composition
     *
     * @param {formData} formData - the form data to be initialized with
     * @param {items} items - the items to be set
     * @param {() => {}} submitCallback - the callback function to be executed on submit
     */
  constructor(formData, items, submitCallback, containerSelector = 'body') {
    this.containerSelector = containerSelector;
    this.formData = formData;
    this.items = items;
    this.gridId = uuidv4();
    this.formId = uuidv4();
    this.submitCallback = submitCallback;
    const formElement = $('<form></form>').attr('id', this.formId);
    $(containerSelector).append(formElement);
  }

  initForm() {
    $(`#${this.formId}`).kendoForm({
      orientation: 'vertical',
      formData: this.formData,
      items: this.items,
      validateField(e) {
        e.preventDefault();
        // console.log(e);
      },
      submit: this.submitCallback,
      clear(e) {
        e.preventDefault();
        // console.log(ev);
      },
    });
  }

  submitCallback() {
    throw new Error('Pass in a callback function for submit');
  }
}
