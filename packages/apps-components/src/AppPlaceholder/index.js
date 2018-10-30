import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '@deskpro/apps-components-style';

const AppPlaceholder = ({ className, children, ...props }) => [
  <div {...props} className={classnames('dp-AppPlaceholder', className)}>

      <span className={classnames('dp-AppPlaceholder__line')} />
      <span className={classnames('dp-AppPlaceholder__line')} style={{  animationDelay: '100ms' }}/>
      <span className={classnames('dp-AppPlaceholder__line')} style={{  animationDelay: '200ms' }}/>
      <span className={classnames('dp-AppPlaceholder__line')} style={{  animationDelay: '300ms' }}/>
      <span className={classnames('dp-AppPlaceholder__line')} style={{  animationDelay: '400ms' }}/>

  </div>,
  children
];

AppPlaceholder.propTypes = {
  /**
   * any additional classnames to be applied to the AppBar container
   */
  className: PropTypes.string,

  /**
   * a list of children to render.
   */
  children: PropTypes.array,
};

export default AppPlaceholder;
