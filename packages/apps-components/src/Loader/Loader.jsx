import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Loader = ({ children, className }) => (
  <div className={classnames('dp-Loader dp-Loader--isActive', className)}>
    {children}
  </div>
);

Loader.propsType = {

  /**
   * any additional class names to be applied to the container element
   */
  className: PropTypes.string,
};

export default Loader;
