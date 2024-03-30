import Grid from './BasicComponents/Grid';

export default class PointTable {
  /**
     * Creates a table that contains points in the database
     *
     * @param {PointManager} pointManager
     * @param {HTMLElement} parent - the parent element
     */
  constructor(pointManager, containerSelector = 'body') {
    this.pointManager = pointManager;
    this.parent = parent;
    this.containerSelector = containerSelector;
    this.#setupDataObservable();
  }

  #mapPointsForTable(points) {
    return points.map((item) => {
      const {
        colorHex, comments, id, radius, x, y,
      } = item;
      const commentIdList = JSON.stringify(comments.map((comment) => comment.id));
      return {
        id, x, y, radius, colorHex, commentIdList,
      };
    });
  }

  #drawTable(points) {
    const { pointManager } = this;
    this.grid = new Grid(
      [
        {
          title: 'Id точки', field: 'id', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'X', field: 'x', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'Y', field: 'y', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'Цвет', field: 'colorHex', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'Радиус', field: 'radius', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          title: 'Комментарии', field: 'commentIdList', attributes: { class: 'k-text-center' }, headerAttributes: { class: 'k-text-center' },
        },
        {
          command: {
            text: 'Delete',
            click(e) {
              e.preventDefault();
              const { id } = this.dataItem($(e.currentTarget).closest('tr'));
              pointManager.deletePoint(id).then((data) => {
              }).catch((error) => {
                console.error('AJAX call failed:', error);
              });
            },
          },
          title: ' ',
          width: '82px',
        }],
      points,
      this.containerSelector,
    );
  }

  #setupDataObservable() {
    this.pointManager.getPointsObservable().subscribe({
      next: (v) => {
        if (!this.grid) {
          this.#drawTable(this.#mapPointsForTable(v));
        } else {
          this.grid.changeDataSource(this.#mapPointsForTable(v));
        }
      },
      error: (err) => console.error(`Cant retrieve points: ${err}`),
    });
  }
}
