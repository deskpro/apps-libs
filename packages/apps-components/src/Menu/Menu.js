import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ActionList } from '../Action';

import '@deskpro/apps-components-style';

const Menu = ({ className, children, isOpen, onClick }) => (

  <div className={classnames("dp-Menu", className)}>

    <i className="dp-IconSettings" onClick={onClick} />

    <ActionList orientation={"vertical"} className={`${isOpen ? '' : 'dp---is-hidden'}`} >
      { children }
    </ActionList>

  </div>
);

Menu.propsType = {

  classname: PropTypes.string,

  type: PropTypes.string,

  isOpen: PropTypes.bool,

  onClick: PropTypes.func
};

Menu.defaultProps = {

  isOpen: false
};

export default Menu;
