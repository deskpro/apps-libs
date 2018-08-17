import React from 'react';
import '@deskpro/apps-components-style';
import classnames from 'classnames';
import PropTypes from "prop-types";

const DataTable = function ({ className, columns, data })
{
  return (
    <table className={classnames("dp-DataTable", className)}>
      { data.map(row => renderRow(columns, row)) }
    </table>
  )
};

DataTable.propTypes = {
  /**
   * any additional classnames to be applied to this component
   */
  className: PropTypes.string,

  /**
   * the ordered list of columns, list starts with the leftmost column
   */
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.function,
    ])
  ).isRequired,

  /**
   * the rows of the tables
   */
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ])
  )
};


/**
 * @param {Array} columns
 * @param row
 */
function renderRow(columns, row)
{
  return (
    <tr className={"dp-DataTableRow"}>
      {columns.map(column => renderColumn(column, row))}
    </tr>
  );
}

function renderColumn(column, row)
{
  let cell = null;
  if (typeof column === 'function') {
    cell = column(row);
  } else if (typeof column === 'string' || typeof column === 'number') {
    cell = row[column];
  }

  return (<td>{ cell }</td>);
}

export default DataTable;