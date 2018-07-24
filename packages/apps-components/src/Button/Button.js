import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const appeareanceToClass = {
  'default':    '',
  transparent:  'Button--transparent',
  primary:      'Button--primary',
  secondary:    'Button--secondary',
  success:      'Button--success',
  info:         'Button--info',
  warning:      'Button--warning',
  danger:       'Button--danger',
  white:        'Button--white',
  black:        'Button--black',
  text:         'Button--text',
};

const sizeToClass = {
  small: 'Button--small',
  normal: '',
  medium: 'Button--medium',
  large: 'Button--large'
};

const shapeToClass = {
  rectangle: '',
  rounded: 'Button--rounded'
};

const Button = ({ className, shape, disabled, size, appearance, children, ...props }) => (
  <button {...props} className={classnames('dp-Button', appeareanceToClass[appearance], sizeToClass[size], shapeToClass[shape], className)} disabled={disabled}>{children}</button>
);

Button.propTypes = {

  /**
   * any additional classnames to be applied to the AppBar container
   */
  className:      PropTypes.string,

  /**
   * a list of children to render.
   */
  shape:       PropTypes.oneOf([
    'rectangle',
    'rounded'
  ]),

  disabled: PropTypes.bool,

  size: PropTypes.oneOf([
    'small',
    'normal',
    'medium',
    'large'
  ]),

  appearance: PropTypes.oneOf([
    'default',
    'transparent',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'white',
    'black',
    'text'
  ])

};

Button.defaultProps = {

  appearance: 'default',

  shape: 'rectangle',

  size: 'normal',

  disabled: false
};


export default Button;
