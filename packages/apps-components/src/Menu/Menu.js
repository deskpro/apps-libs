import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ActionList } from '../Action';

import '@deskpro/apps-components-style';

/**
 * @param string className
 * @param children
 * @param {bool} isOpen
 * @param {function} onClick
 * @param {object} props
 * @return {*}
 * @constructor
 */
const Menu = React.forwardRef(({ className, children, isOpen, onClick, ...props }, ref) => (
  <div {...props} className={classnames('dp-Menu', className)} ref={ref}>
    <i className="dp-IconSettings" onClick={onClick} />

    <ActionList
      orientation={'vertical'}
      className={`${isOpen ? '' : 'dp---is-hidden'}`}
    >
      {children}
    </ActionList>
  </div>
));

Menu.propsType = {

  /**
   * any additional classnames to be applied to the root element of this component
   */
  classname: PropTypes.string,

  /**
   * flag to indicate if the menu shows its options
   */
  isOpen: PropTypes.bool,

  /**
   * a function to handle mouse clicks
   */
  onClick: PropTypes.func,
};

Menu.defaultProps = {
  isOpen: false,
};

export default Menu;
