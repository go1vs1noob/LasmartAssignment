import Shape from './Shape';

export default class Text extends Shape {
  /**
     * Creates and encapsulates a new Konva.Text object with the specified properties.
     *
     * @param {number} x - The x-coordinate of the text.
     * @param {number} y - The y-coordinate of the text.
     * @param {string} text - The text content of the text.
     * @param {number} fontSize - The font size of the text.
     * @param {string} fontFamily - The font family of the text.
     * @param {string} fill - The fill color of the text.
     * @param {number} width - The width of the text.
     * @param {number} padding - The padding of the text.
     * @param {string} [align='center'] - The alignment of the text. Defaults to 'center'.
     */
  constructor(x, y, text, fontSize, fontFamily, fill, width, padding, align = 'center') {
    super();
    this.x = x;
    this.y = y;
    this.text = text;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fill = fill;
    this.width = width;
    this.padding = padding;
    this.align = align;
    this.#createText();
  }

  get konvaShape() {
    return this.konvaText;
  }

  destroy() {
    this.konvaText.destroy();
  }

  #createText() {
    this.konvaText = new Konva.Text({
      x: this.x,
      y: this.y,
      text: this.text,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      fill: this.fill,
      width: this.width,
      padding: this.padding,
      align: this.align,
    });
  }
}
