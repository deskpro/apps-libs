import React from 'react';
import '@deskpro/apps-components-style';
import PropTypes from "prop-types";

const DataList = function ({ className, data, rows, ...props})
{
  let dlRows;
  if (rows) {
    dlRows = rows.map(row => renderRow(row, data))
  } else {
    const rowFn = ({ label, value }) => [label, value];
    dlRows = data.map(data => renderRow(rowFn, data))
  }

  return (
      <dl {...props} className="dp-DataDefList">
        { dlRows.reduce((head, tail) => head.concat(tail), []) }
      </dl>
  );
};

DataList.propTypes = {

  /**
   * any additional classnames to be applied to the root element of this component
   */
  className: PropTypes.string,

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
    <dt key={`dt-${label}-${value}`} className="dp-DataDefListKey">{label}</dt>,
    <dd key={`dd-${label}-${value}`} className="dp-DataDefListValue">{value}</dd>
  ]
}

export default DataList;
