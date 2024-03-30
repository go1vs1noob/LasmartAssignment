import Shape from './Shape';

export default class Rectangle extends Shape {
  /**
     * Creates and encapsulates a new Konva.Rect object with the specified properties.
     *
     * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
     * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {string} stroke - The color of the stroke of the rectangle.
     * @param {number} strokeWidth - The width of the stroke of the rectangle.
     * @param {string} fill - The color of the fill of the rectangle.
     * @param {number} cornerRadius - The radius of the corners of the rectangle.
     */
  constructor(x, y, width, height, stroke, strokeWidth, fill, cornerRadius) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.fill = fill;
    this.cornerRadius = cornerRadius;
    this.#createRectangle();
  }

  get konvaShape() {
    return this.konvaRectangle;
  }

  destroy() {
    this.konvaRectangle.destroy();
  }

  #createRectangle() {
    this.konvaRectangle = new Konva.Rect({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      fill: this.fill,
      cornerRadius: this.cornerRadius,
    });
  }
}
