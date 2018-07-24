import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from "../Button/Button";

const Content = ({ className, children, ...props }) => (
  <div {...props} className={classnames('dp-Content', className)}>{children}</div>
);

Content.propTypes = {

  /**
   * any additional classnames to be applied to the AppBar container
   */
  className:      PropTypes.string,

};

Content.defaultProps = {

  className: ''

};

export default Content;
