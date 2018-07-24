import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const alignToClassName = {
  left:   "dp-LevelLeft",
  right:  "dp-LevelRight",
  top:    "dp-LevelTop",
  bottom: "dp-LevelBottom",
  auto:   "dp-Level"
};

/**
 * @param {string} [align]
 * @param {string} [className]
 * @param {*} [children]
 * @return {*}
 * @constructor
 */
const Level = ({align, className, children}) => (
  <div className={classnames( alignToClassName[align] , className)} >
    {children}
  </div>
);

Level.propTypes = {

  className: PropTypes.string,

  align: PropTypes.oneOf([
    'left',
    'right',
    'top',
    'bottom',
    'auto'
  ])
};

Level.defaultProps = {
  align: "auto"
};

export default Level;
