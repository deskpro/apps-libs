import React from 'react';
import '@deskpro/apps-components-style';
import classnames from 'classnames';
import PropTypes from "prop-types";
import { ActionBar } from "../Action";

const DataList = function ({ className, title, children, data, rows})
{

  let dlRows;
  if (rows) {
    dlRows = rows.map(row => renderRow(row, data))
  } else {
    const rowFn = ({ label, value }) => [label, value];
    dlRows = data.map(data => renderRow(rowFn, data))
  }

  return (
    <div className={classnames(className)}>
      <ActionBar title={title}>{children}</ActionBar>

      <dl className="dp-DataDefList">
        { dlRows.reduce((head, tail) => head.concat(tail), []) }
      </dl>
    </div>
  );
};

DataList.propTypes = {

  /**
   * any additional classnames to be applied to the root element of this component
   */
  className: PropTypes.string,

  /**
   * the title of the list
   */
  title: PropTypes.string.isRequired,

  /**
   * the list of values
   */
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    PropTypes.array
  ]).isRequired,

  /**
   * A list of functions that will be applied to data to obtain each row.
   */
  rows: PropTypes.arrayOf(
    PropTypes.func
  )
};

DataList.defaultProps = {

  className: ''
};


function renderRow(row, data)
{
  const [label, value] = row(data);

  return [
    <dt className="dp-DataDefListKey">{label}</dt>,
    <dd className="dp-DataDefListValue">{value}</dd>
  ]
}

export default DataList;
