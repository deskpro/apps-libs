import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '@deskpro/apps-components-style';

const AppPlaceholder = ({ className, children, ...props }) => [
  <div {...props} className={classnames('dp-AppPlaceholder', className)}>

      <span className={classnames('dp-AppPlaceholder__line')} />
      <span className={classnames('dp-AppPlaceholder__line', 'dp-AppPlaceholder--animationDelay100')} />
      <span className={classnames('dp-AppPlaceholder__line', 'dp-AppPlaceholder--animationDelay200')} />
      <span className={classnames('dp-AppPlaceholder__line', 'dp-AppPlaceholder--animationDelay300')} />
      <span className={classnames('dp-AppPlaceholder__line', 'dp-AppPlaceholder--animationDelay400')} />

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
