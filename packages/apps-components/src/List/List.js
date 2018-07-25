import '@deskpro/apps-components-style';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

export function renderTrackVerticalDefault({ style, ...props }) {
  const finalStyle = {
    ...style,
    right: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
  };
  return <div style={finalStyle} {...props} />;
}

function renderThumbVertical({ style, ...props }) {
  const finalStyle = {
    ...style,
    right: 0,
  };

  return <div className="dp-ScrollableThumb" style={finalStyle} />;
}

const List = ({ children, height, className }) => (
  <div className={classnames('dp-Scrollable dp---is-hooverable', className)}>
    <Scrollbars
      autoHeight
      autoHeightMin={height}
      renderThumbVertical={renderThumbVertical}
      renderTrackVertical={renderTrackVerticalDefault}
    >
      {children}
    </Scrollbars>
  </div>
);

List.propTypes = {
  /**
   * the height of the list in pixels
   */
  height: PropTypes.number,

  /**
   * any additional classnames to be applied to the AppBar container
   */
  className: PropTypes.string,

  /**
   * a list of children to render.
   */
  children: PropTypes.array,
};

List.defaultProps = {
  height: 50,
};

export default List;
