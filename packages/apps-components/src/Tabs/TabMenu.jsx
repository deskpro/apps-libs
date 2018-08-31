import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Renders a link in a tab group.
 */
const TabMenu = ({ name, active, onClick, children, className, ...props }) => {
  const classes = classNames(
    'dp-TabItem',
    className,
    {
      'is-active': active
    }
  );

  return (
    <li className={classes} {...props} onClick={() => { onClick(name); }}>
      <div>
        {children}
      </div>
    </li>
  );
};

TabMenu.propTypes = {
  /**
   * The name of the tab.
   */
  name:      PropTypes.string.isRequired,
  /**
   * Whether or not the tab is active.
   */
  active:    PropTypes.bool,
  /**
   * CSS classes to apply to the element.
   */
  className: PropTypes.string,
  /**
   * Children to render.
   */
  children:  PropTypes.node,
  /**
   * Called when the link is clicked. Receives the name of the tab.
   */
  onClick:   PropTypes.func
};

TabMenu.defaultProps = {
  active:    false,
  onClick:   () => {},
  className: '',
  children:  ''
};

export default TabMenu;
