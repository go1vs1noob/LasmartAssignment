export default class Shape {
  /**
     * Abstract class for shapes.
     *
     */
  constructor() { }

  get konvaShape() {
    throw new Error('Implement a konva shape representation from your class.');
  }

  destroy() {
    throw new Error('Implement a destroy() method for your class');
  }
}
