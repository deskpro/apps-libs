import React from 'react';
import { storiesOf } from '@storybook/react';

import { sizeToSidebar, wrapInApp } from './decorators'
import {List, ListItem, Button} from '../../src';

storiesOf('Button', module)
  .add('all', wrapInApp(<List>
      <p>Some great content...</p>

      <Button appearance={"primary"} className={"btn-demo"}>Primary</Button>
      <Button appearance={"secondary"}>Cancel</Button>

      <p>Some great content...</p>
      <Button size={"small"} appearance={"success"}>Success</Button>
  </List>))
;
