import Shape from './Shape';

export default class Circle extends Shape {
  /**
     * Creates and encapsulates a new Konva.Circle object with the specified properties.
     *
     * @param {type} x - The x coordinate of the circle
     * @param {type} y - The y coordinate of the circle
     * @param {type} radius - The radius of the circle
     * @param {type} fill - The fill color of the circle
     * @return {type} undefined
     */
  constructor(x, y, radius, fill) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill = fill;
    this.konvaCircle = new Konva.Circle({
      x,
      y,
      radius,
      fill,
      draggable: true,
    });
  }

  get konvaShape() {
    return this.konvaCircle;
  }

  destroy() {
    this.konvaCircle.destroy();
  }
}
