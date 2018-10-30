import React from 'react';
import { storiesOf } from '@storybook/react';

import { wrapInAppPanel } from './decorators'
import { AppFrame, AppPlaceholder } from '../../src';

import dpLogo from '../static/dp-logo.svg';

storiesOf('AppPlaceholder', module)
  .add('normal', wrapInAppPanel(
    <AppFrame title={"Deskpro"} iconUrl={dpLogo}>
      <AppPlaceholder/>
    </AppFrame>
  ))
;
