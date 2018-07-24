import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AppBody from "../AppBody";
import AppBar from "../AppBar";

function propTypeReactElement(propValue, key, componentName, location, propFullName) {
  if (! React.isValidElement(propValue)) {
    return new Error(
      'Invalid prop `' + propFullName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    );
  }
}

class AppFrame extends React.PureComponent
{
  render()
  {
    const { isInactive, display, children, iconUrl, title, badgeText, actions } = this.props;

    return (
      <div
        className={classnames(
          "dp-AppFrame",
          isInactive ? 'is-inactive' : '',
          display === 'collapsed' ? 'is-colapsed' : '' ,
          this.props.className
        )}
      >
        <AppBar iconUrl={iconUrl} title={title} badgeText={badgeText} >
          {actions}
        </AppBar>

        <AppBody>
          {children}
        </AppBody>

      </div>
    )
  }
}

export default AppFrame;

AppFrame.propTypes = {

  /**
   * The url to the icon displayed in the bar
   */
  iconUrl:        PropTypes.string.isRequired,

  /**
   * The title displayed in the bar
   */
  title:          PropTypes.string.isRequired,

  /**
   * The text or number to display in the badge
   */
  badgeText:      PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * any additional classnames to be applied to the AppBar container
   */
  className:      PropTypes.string,

  /**
   * a list of actions associated with this component
   */
  actions:        PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.func,
    propTypeReactElement,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        propTypeReactElement
      ])
    ),
  ),

  /**
   * controls if the frame displays the inactive state
   */
  isInactive:     PropTypes.bool,

  /**
   * controls how the app frame is displayed
   */
  display:       PropTypes.oneOf([
    'collapsed',
    'expanded'
  ])
};

AppFrame.defaultProps = {

  className:      "",

  isInactive:     false,

  display:       'expanded'
};
