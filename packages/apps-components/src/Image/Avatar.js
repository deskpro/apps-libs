import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const shapeClassNames = {
  auto: 'dp-Icon',
  round: 'dp-Icon dp-Icon--Round',
};

/**
 * @param {string} src
 * @param {string} [shape]
 * @param {string} [className]
 * @param {string} [title]
 * @param props
 * @return {*}
 * @constructor
 */
const Avatar = ({ src, shape, className, title, ...props }) => (
  <i {...props} className={classNames(shapeClassNames[shape], className)}>
    <img src={src} title={title} />
  </i>
);

Avatar.propTypes = {
  /**
   * any additional class names to be applied to the root element of this component
   */
  className: PropTypes.string,

  /**
   * The image source
   */
  src: PropTypes.string.isRequired,

  /**
   * The image title
   */
  title: PropTypes.string,

  /**
   * The shape of the avatar
   */
  shape: PropTypes.oneOf(['round', 'auto']),
};

Avatar.defaultProps = {
  shape: 'auto',
  title: '',
};

export default Avatar;
