import PointManager from '../Managers/PointManager';
import Form from './BasicComponents/Form';
import Helpers from '../Helpers';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../../../config/config';

export default class PointForm {
  /**
     * Creates a form for creating points
     *
     * @param {PointManager} pointManager - The point manager object.
     */
  constructor(pointManager, containerSelector = 'body') {
    this.containerSelector = containerSelector;
    this.form = new Form(this.getFormData(), this.getItems(), (e) => {
      e.preventDefault();
      pointManager.addPoint(e.model);
    }, this.containerSelector);
    this.form.initForm();
  }

  getFormData() {
    return {
      X: '',
      Y: '',
      colorHex: '',
      radius: '',
    };
  }

  getItems() {
    return [{
      type: 'group',
      label: 'Создать точку',
      items: [
        { field: 'X', label: 'X:', validation: Helpers.getValidationRulesForNumericInput(0, STAGE_WIDTH) },
        { field: 'Y', label: 'Y:', validation: Helpers.getValidationRulesForNumericInput(0, STAGE_HEIGHT) },
        { field: 'colorHex', label: 'Цвет:', validation: Helpers.getValidationRulesForHexInput() },
        {
          field: 'radius',
          label: 'Радиус:',
          validation: Helpers.getValidationRulesForNumericInput(1, STAGE_HEIGHT / 2),
        },
      ],
    }];
  }
}
