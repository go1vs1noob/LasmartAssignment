import CommentManager from '../Managers/CommentManager';
import PointManager from '../Managers/PointManager';
import Form from './BasicComponents/Form';
import Helpers from '../Helpers';

export default class CommentForm {
  /**
     * Creates a form for creating comments
     *
     * @param {CommentManager} commentManager - The comment manager object.
     * @param {PointManager} pointManager - The point manager object.
     */
  constructor(commentManager, pointManager, containerSelector) {
    this.commentManager = commentManager;
    this.pointManager = pointManager;
    this.containerSelector = containerSelector;
    this.form = new Form(this.getFormData(), this.getItems(), (e) => {
      e.preventDefault();
      this.pointManager.getAllPoints().then((points) => {
        if (points.find((p) => `${p.id}` === `${e.model.pointId}`)) {
          commentManager.addComment(e.model).then(() => { }).catch((error) => {
            console.error(error);
          });
        } else {
          alert('Point not found');
        }
      });
    }, this.containerSelector);
    this.form.initForm();
  }

  getFormData() {
    return {
      pointId: '',
      text: '',
      colorHex: '',
    };
  }

  getItems() {
    return [{
      type: 'group',
      label: 'Создать комментарий',
      items: [
        { field: 'pointId', label: 'Id точки:', validation: Helpers.getValidationRulesForNumericInput() },
        { field: 'text', label: 'Текст:', validation: Helpers.getValidationRulesForTextInput(1, 30) },
        { field: 'colorHex', label: 'Цвет:', validation: Helpers.getValidationRulesForHexInput() },
      ],
    }];
  }
}
