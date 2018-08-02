import React from 'react';
import { storiesOf } from '@storybook/react';

import Notification from '../../src/Notification';
import { wrapInApp } from './decorators'


function dismiss(actionType)
{
  alert(`Notification dismissed`);
}

storiesOf('Notification', module)
  .add('info' , wrapInApp([
    <Notification type={'info'} dismiss={dismiss} >
      <ul style={{ margin: 0 }}>
        <li>It's good to see you again.</li>
        <li>Did you know it's been a while?</li>
      </ul>
    </Notification>,
  ]))
  .add('warning' , wrapInApp([
    <Notification type={'warning'} dismiss={dismiss}>
      {"Visit our registration page, then try again"}
    </Notification>,

  ]))
  .add('error' , wrapInApp([
    <Notification type={'error'} dismiss={dismiss} >
      <h4>Oooops !</h4>
      <ul style={{ margin: 0 }}>
        <li>Authentication token has expired.</li>
        <li>API endpoint not found</li>
      </ul>
    </Notification>,

  ]))
  .add('success' , wrapInApp([
    <Notification type={'success'} dismiss={dismiss} >
      {"Go to your special offers page to see now."}
    </Notification>,

  ]))
;
