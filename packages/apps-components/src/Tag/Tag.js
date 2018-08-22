import React from 'react';
import '@deskpro/apps-components-style';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const colorToClass = {
  green: "dp-Tag--green",
  blue: "dp-Tag--blue",
  orange: "dp-Tag--orange",
  red: "dp-Tag--red"
};

const Tag = function ({ className, color, children, ...props })
{
  return (
    <span {...props} className={classnames("dp-Tag", colorToClass[color], className)}>{children}</span>
  )
};

Tag.propTypes = {
  /**
   * any additional classnames to be applied to this component
   */
  className: PropTypes.string,

  /**
   * the color of the tag.
   */
  color: PropTypes.oneOf(['green', 'blue', 'orange', 'red']),
};


export default Tag;
