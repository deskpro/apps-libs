import React from 'react';
import { storiesOf } from '@storybook/react';

import { sizeToSidebar } from './decorators'

import AppBody from '../../src/AppBody';

storiesOf('AppBody', module)
  .add('basic', sizeToSidebar(<AppBody/>))
;
