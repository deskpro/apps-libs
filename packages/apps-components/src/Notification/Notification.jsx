import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ActionList, Action } from '../Action'

const typeToClassname = {
  'success':  'dp-Notification--isSuccess',
  'info':     'dp-Notification--isInfo',
  'error':    'dp-Notification--isError',
  'warning':  'dp-Notification--isWarning'
};

const Notification = ({ children, className, type, dismiss }) => (

  <div className={classnames('dp-Notification', typeToClassname[type], className)}>
    <div className={'dp-Level '}>
      <ActionList className={'dp-LevelRight dp-LevelItem'}>
        <Action icon={'close-heavy'} onClick={dismiss} className={"dp-Notification--Close"}/>
      </ActionList>
    </div>
    <div className={"dp-Content "}>
      {children}
    </div>
  </div>
);

Notification.propTypes = {

  /**
   * a function that handles the closing of the notification
   */
  dismiss: PropTypes.func,

  /**
   * the type of notification
   */
  type: PropTypes.oneOf(['success', 'info', 'error', 'warning']),

  /**
   * any additional class names to be applied to the container element
   */
  className: PropTypes.string,
};

export default Notification;
