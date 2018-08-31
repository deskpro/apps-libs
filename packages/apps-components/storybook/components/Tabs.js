import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tabs, TabMenu } from '../../src/Tabs';
import {wrapInApp } from './decorators'

storiesOf('Tabs', module)
  .add('normal' , wrapInApp([
    <Tabs active={"Link Issue"} onChange={activeTab => alert(`tab ${activeTab} clicked`)}>
      <TabMenu name="Issues">Issues</TabMenu>
      <TabMenu name="Link Issue">Link Issue</TabMenu>
    </Tabs>
  ]))
;
