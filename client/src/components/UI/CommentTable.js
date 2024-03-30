import CommentManager from '../Managers/CommentManager';
import PointManager from '../Managers/PointManager';
import Grid from './BasicComponents/Grid';

export default class CommentTable {
  /**
     * * Creates a table that contains comments in the database
     *
     * @param {CommentManager} commentManager - instance of CommentManager
     * @param {PointManager} pointManager - instance of PointManager
     */
  constructor(commentManager, pointManager, containerSelector = 'body') {
    this.commentManager = commentManager;
    this.pointManager = pointManager;
    this.containerSelector = containerSelector;
    this.#setupDataObservable();
  }

  #drawTable(comments) {
    const { commentManager } = this;
    this.grid = new Grid(
      [
        {
          title: 'Id комментария', field: 'id', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'Текст', field: 'text', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'Цвет', field: 'colorHex', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'Id точки', field: 'pointId', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          command: {
            text: 'Delete',
            click(e) {
              e.preventDefault();
              const { id } = this.dataItem($(e.currentTarget).closest('tr'));
              commentManager.deleteComment(id).then((data) => {
              }).catch((error) => {
                console.error('AJAX call failed:', error);
              });
            },
          },
          title: ' ',
          width: '82px',
        }],
      comments,
      this.containerSelector,
    );
  }

  #setupDataObservable() {
    this.commentManager.getCommentsObservable().subscribe((v) => {
      if (!this.grid) {
        this.#drawTable(this.#mapCommentsForTable(v));
      } else {
        this.grid.changeDataSource(this.#mapCommentsForTable(v));
      }
    });
    this.pointManager.getPointsObservable().subscribe({
      next: () => {
        this.commentManager.getAllComments().then((comments) => {
          if (!this.grid) {
            this.#drawTable(this.#mapCommentsForTable(comments));
          } else {
            this.grid.changeDataSource(this.#mapCommentsForTable(comments));
          }
        });
      },
      error: (err) => console.error(`Cant retrieve points: ${err}`),
    });
  }

  #mapCommentsForTable(comments) {
    return comments.map((item) => {
      const {
        id, colorHex, pointId, text,
      } = item;
      return {
        id, colorHex, pointId, text,
      };
    });
  }
}
