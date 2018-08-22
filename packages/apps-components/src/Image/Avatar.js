import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const shapeClassNames = {
  auto: 'dp-Icon',
  round: 'dp-Icon dp-Icon--Round',
};

/**
 * @param {string} [align]
 * @param {string} [className]
 * @return {*}
 * @constructor
 */
/**
 * @param {string} src
 * @param {string} [shape]
 * @param {string} [className]
 * @param props
 * @return {*}
 * @constructor
 */
const Avatar = ({ src, shape, className, ...props }) => (
  <i {...props} className={classnames(shapeClassNames[shape], className)}>
    <img src={src} title="" />
  </i>
);

Avatar.propTypes = {
  /**
   * any additional classnames to be applied to the root element of this component
   */
  className: PropTypes.string,

  /**
   * The image source
   */
  src: PropTypes.string.isRequired,

  /**
   * The shape of the avatar
   */
  shape: PropTypes.oneOf(['round', 'auto']),
};

Avatar.defaultProps = {
  shape: 'auto',
};

export default Avatar;
