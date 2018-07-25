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
 * @return {*}
 * @constructor
 */
const Avatar = ({ src, shape, className }) => (
  <i className={classnames(shapeClassNames[shape], className)}>
    <img src={src} alt="" />
  </i>
);

Avatar.propTypes = {
  className: PropTypes.string,

  src: PropTypes.string.isRequired,

  shape: PropTypes.oneOf(['round', 'auto']),
};

Avatar.defaultProps = {
  shape: 'auto',
};

export default Avatar;
