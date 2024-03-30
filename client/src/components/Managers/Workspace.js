import { v4 as uuidv4 } from 'uuid';
import Point from '../Shapes/Point';
import Circle from '../Shapes/Circle';
import Comment from '../Shapes/Comment';
import Helpers from '../Helpers';
import {
  COMMENT_FONT_FAMILY, COMMENT_FONT_SIZE, COMMENT_TEXT_COLOR, COMMENT_WIDTH, OUTLINE_COMMENT_TEXT_COLOR,
} from '../../../config/config';

export default class Workspace {
  /**
   * Creates a workspace where points are located
   *
   * @param {number} width - The width of the workspace.
   * @param {number} height - The height of the workspace.
   * @param {PointManager} pointManager - The point manager for the workspace.
   * @param {CommentManager} commentManager - The comment manager for the workspace.
   */
  constructor(width, height, pointManager, commentManager, containerSelector = 'body') {
    this.pointManager = pointManager;
    this.commentManager = commentManager;
    this.width = width;
    this.height = height;
    this.containerSelector = containerSelector;
    this.id = uuidv4();
    this.#createWorkspaceDiv();
    this.#initWorkspaceSetupObservables();
  }

  #createWorkspaceDiv() {
    const containerDiv = $('<div></div>', { id: this.id });
    $(this.containerSelector).append(containerDiv);
  }

  #initWorkspaceSetupObservables() {
    this.pointManager.getPointsObservable().subscribe({
      next: (v) => {
        this.#onPointsUpdate(v);
      },
      error: (err) => console.error(`Cant retrieve points: ${err}`),
    });
    this.commentManager.getCommentsObservable().subscribe({
      next: (v) => {
        this.#onCommentsUpdate(v);
      },
      error: (err) => console.error(`Cant retrieve points: ${err}`),
    });
  }

  #onPointsUpdate(pointsData) {
    this.#clearWorkspace(this.width, this.height, this.id);
    this.#updateShapesList(pointsData);
    this.#addShapesToLayers();
    this.#drawWorkspace();
  }

  #onCommentsUpdate() {
    this.pointManager.getEmitPoints();
  }

  #updateShapesList(pointsData) {
    this.shapes = [];
    pointsData.forEach((element) => {
      const circle = new Circle(element.x, element.y, element.radius, element.colorHex);
      const commentClasses = element.comments.map((comment) => new Comment(
        0,
        0,
        COMMENT_WIDTH,
        comment.text,
        COMMENT_FONT_SIZE,
        COMMENT_FONT_FAMILY,
        COMMENT_TEXT_COLOR,
        OUTLINE_COMMENT_TEXT_COLOR,
        comment.colorHex,
        1,
      ));
      const point = new Point(circle, commentClasses, element.id, () => point.destroy(), this.#handleDragEnd);
      this.shapes.push(point);
    });
  }

  #handleDragEnd = (id, x, y) => {
    this.pointManager.patchPoint({ id, x, y }).then(() => {
    }).catch((error) => {
      console.error('Error occurred while patching point:', error);
    });
  };

  #clearWorkspace(width, height, id) {
    this.stage = new Konva.Stage({
      container: id,
      width,
      height,
    });
    this.layer = new Konva.Layer();
  }

  #addShapesToLayers() {
    this.shapes.forEach((shape) => {
      if (Helpers.canBeSpread(shape.konvaShape)) {
        this.layer.add(...shape.konvaShape);
      } else {
        this.layer.add(shape.konvaShape);
      }
    });
  }

  #drawWorkspace() {
    this.stage.add(this.layer);
    this.layer.draw();
  }
}
