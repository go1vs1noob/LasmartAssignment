import { RECT_STROKE_WIDTH, TEXT_ALIGN, TEXT_PADDING } from '../../../config/config';
import Rectangle from './Rectangle';
import Shape from './Shape';
import Text from './Text';

export default class Comment extends Shape {
  /**
* Initializes a comment class which is a rectangle with text.
 *
* @param {number} x - Represents the x-coordinate of the comment
     * @param {number} y - Represents the y-coordinate of the comment
     * @param {number} width - Represents the width of the comment
     * @param {string} text - Represents the text content of the comment
     * @param {number} fontSize - Represents the font size of the text in the comment
     * @param {string} fontFamily - Represents the font family of the text in the comment
     * @param {string} textFill - Represents the fill color of the text in the comment
     * @param {string} rectStroke - Represents the stroke of the rectangle in the comment
     * @param {string} rectFill - Represents the fill color of the rectangle in the comment
     * @param {number} cornerRadius - Represents the corner radius of the rectangle in the comment
 */
  constructor(x, y, width, text, fontSize, fontFamily, textFill, rectStroke, rectFill, cornerRadius) {
    super();
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.textFill = textFill;
    this.rectStroke = rectStroke;
    this.rectFill = rectFill;
    this.cornerRadius = cornerRadius;

    this.text = new Text(x, y, text, fontSize, fontFamily, textFill, width, TEXT_PADDING, TEXT_ALIGN);
    this.rect = new Rectangle(x, y, width, this.text.konvaShape.height(), rectStroke, RECT_STROKE_WIDTH, rectFill, cornerRadius);
  }

  get konvaShape() {
    const arrToReturn = [this.rect.konvaShape, this.text.konvaShape];
    return arrToReturn;
  }

  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
    this.text.konvaShape.x(this.x);
    this.text.konvaShape.y(this.y);
    this.rect.konvaShape.x(this.x);
    this.rect.konvaShape.y(this.y);
  }

  get height() {
    return this.text.konvaShape.height();
  }

  get width() {
    return this.text.konvaShape.width();
  }

  destroy() {
    this.text.destroy();
    this.rect.destroy();
  }
}
