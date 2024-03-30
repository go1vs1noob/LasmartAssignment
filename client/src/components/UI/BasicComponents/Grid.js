import { v4 as uuidv4 } from 'uuid';

export default class Grid {
  /**
     * Creates a kendoGrid with given columns and data source.
     *
     * @param {object} columns - see kendo grid documentation
     * @param {Array} dataSource - see kendo grid documentation
     * @param {HTMLElement} parent - the parent element
     */
  constructor(columns, dataSource, containerSelector = 'body') {
    this.gridId = uuidv4();
    const gridElement = $('<div></div>').attr('id', this.gridId);
    this.containerSelector = containerSelector;
    $(this.containerSelector).append(gridElement);
    $(`#${this.gridId}`).kendoGrid({
      columns,
      dataSource,
    });
  }

  changeDataSource(dataSource) {
    $(`#${this.gridId}`).data('kendoGrid').setDataSource(dataSource);
  }
}
