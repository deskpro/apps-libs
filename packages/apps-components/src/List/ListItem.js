import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @param component
 * @return {Object}
 */
function decorateListItem(component) {
  return <div className={'dp-ListItemRow'}>{component}</div>;
}

function renderChildren(children) {
  function map(component) {
    return React.isValidElement(component)
      ? decorateListItem(component)
      : component;
  }

  return React.Children.map(children, map);
}

const ListItem = ({ children, className }) => (
  <div className={classnames('dp-ListItem dp---is-hoverable', className)}>
    {renderChildren(children)}
  </div>
);

ListItem.propsType = {
  /**
   * any additional classnames to be applied to the AppBar container
   */
  className: PropTypes.string,
};

export default ListItem;
