import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AppBody from '../AppBody';
import AppBar from '../AppBar';
import Notification from '../Notification';
import Action from '../Action';

class AppFrame extends React.PureComponent {
  render() {
    const {
      state,

      display,

      iconUrl,
      title,
      badgeCount,
      badgeVisibility,

      refresh,
      collapse,
      expand,

      notification,
      notificationType,
      closeNotification,

      children

    } = this.props;

    return (

      <div className={"dp-Root"}>
        <div
          className={classnames(
            'dp-AppFrame',
            state === 'inactive' ? 'is-inactive' : '',
            display === 'collapsed' ? 'is-colapsed' : '',
            this.props.className,
          )}
        >
          <AppBar iconUrl={iconUrl} title={title} badgeText={badgeVisibility === 'visible' ? badgeCount : null}>
            <Action icon='refresh' onClick={refresh} />
            <Action icon={ display === 'collapsed' ? 'down' : 'up'  } onClick={ display === 'collapsed' ? expand : collapse } />
          </AppBar>

          <AppBody>
            { notification && <Notification type={notificationType} dismiss={closeNotification}>{notification}</Notification> }
            {children}
          </AppBody>
        </div>
      </div>
    );
  }
}

export default AppFrame;

AppFrame.propTypes = {
  /**
   * The url to the icon displayed in the bar
   */
  iconUrl: PropTypes.string.isRequired,

  /**
   * The title displayed in the bar
   */
  title: PropTypes.string.isRequired,

  /**
   * The text or number to display in the badge
   */
  badgeVisibility: PropTypes.oneOf(['hidden', 'visible']),

  /**
   * The number to display in the badge
   */
  badgeCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * controls how the app frame is displayed
   */
  display: PropTypes.oneOf(['collapsed', 'expanded']),

  /**
   * controls the state of the frame
   */
  state: PropTypes.oneOf(['ready', 'loading', 'error', 'inactive']),

  /**
   * a message to be displayed
   */
  notification: PropTypes.string,

  /**
   * the type of notification to be displayed
   */
  notificationType: Notification.propTypes.type,

  /**
   * a function that is called when the refresh icon is clicked
   */
  refresh: PropTypes.func,

  /**
   * a function that is called when the collapse icon is clicked
   */
  collapse: PropTypes.func,

  /**
   * a function that is called when the expand icon is clicked
   */
  expand: PropTypes.func,

  /**
   * a function that is called when the expand icon is clicked
   */
  closeNotification: PropTypes.func,

  /**
   * any additional classnames to be applied to the AppBar container
   */
  className: PropTypes.string,

};

AppFrame.defaultProps = {
  className: '',

  state: 'ready',

  display: 'expanded',

  badgeVisibility: 'hidden'
};
