import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '@deskpro/apps-components-style';

const AppBody = ({ className, children, ...props }) => (
  <section {...props} className={classnames('dp-AppBody dp-Section', className)}>
    {children}
  </section>
);

AppBody.propTypes = {
  /**
   * any additional classnames to be applied to the AppBar container
   */
  className: PropTypes.string,

  /**
   * a list of children to render.
   */
  children: PropTypes.array,
};

export default AppBody;
