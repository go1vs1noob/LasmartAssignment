import { STAGE_HEIGHT, STAGE_WIDTH } from '../../../config/config';
import Shape from './Shape';

export default class Point extends Shape {
  /**
     * Initializes a point class which is a circle with comments.
     *
     * @param {Circle} circle - The circle object.
     * @param {Array} comments - The comments array.
     * @param {Function} onDoubleClickHandler - The double click event handler.
     * @param {Function} onDragEndHandler - The drag end event handler.
     * @param {Function} onDragMoveHandler - The double drag move event handler.
     */
  constructor(circle, comments, dbId, onDoubleClickHandler, onDragEndHandler, onDragMoveHandler) {
    super();
    this.dbId = dbId;
    this.circle = circle;
    this.comments = comments;
    if (onDoubleClickHandler) {
      this.onDoubleClickHandler = onDoubleClickHandler;
    }
    if (onDragEndHandler) {
      this.onDragEndHandler = onDragEndHandler;
    }
    if (onDragMoveHandler) {
      this.onDragMoveHandler = onDragMoveHandler;
    }
    this.#moveCommentsToItsCircle();
    this.#setupHandlers();
  }

  get konvaShape() {
    const arrToReturn = [];
    if (!this.comments) {
      throw new Error('Comments are not set');
    }
    arrToReturn.push(this.circle.konvaShape);
    this.comments.forEach((comment) => {
      arrToReturn.push(...comment.konvaShape);
    });

    return arrToReturn;
  }

  onDragMoveHandler = () => {
    this.circle.konvaShape.x(Math.max(this.circle.konvaShape.x(), this.circle.radius));
    this.circle.konvaShape.x(Math.min(this.circle.konvaShape.x(), STAGE_WIDTH - this.circle.radius));
    this.circle.konvaShape.y(Math.max(this.circle.konvaShape.y(), this.circle.radius));
    this.circle.konvaShape.y(Math.min(this.circle.konvaShape.y(), STAGE_HEIGHT - this.circle.radius));
    this.#moveCommentsToItsCircle();
  };

  onDoubleClickHandler = () => {
    throw new Error('The onDoubleClick handler has not been defined in a Point component.');
  };

  destroy() {
    this.circle.destroy();
    this.comments.forEach((comment) => {
      comment.destroy();
    });
  }

  #setupHandlers() {
    this.circle.konvaShape.on('dblclick', () => {
      this.onDoubleClickHandler();
    });
    this.circle.konvaShape.on('dragmove', this.onDragMoveHandler);
    this.circle.konvaShape.on('dragend', () => {
      this.onDragEndHandler(this.dbId, this.circle.konvaShape.x(), this.circle.konvaShape.y());
    });
  }

  #moveCommentsToItsCircle() {
    if (!this.comments) {
      throw new Error('Comments are not set');
    }
    if (this.comments.length > 0) {
      this.comments[0].setCoordinates(
        this.circle.konvaShape.x() - this.comments[0].width / 2,
        this.circle.konvaShape.y() + this.circle.konvaShape.radius() + 5,
      );
    }
    for (let i = 1; i < this.comments.length; i++) {
      this.comments[i].setCoordinates(
        this.circle.konvaShape.x() - this.comments[i].width / 2,
        this.comments[i - 1].height + this.comments[i - 1].y,
      );
    }
  }
}
