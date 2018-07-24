import React from 'react';
import { storiesOf } from '@storybook/react';

import { sizeToSidebar, wrapInApp } from './decorators'
import {List, ListItem} from '../../src';


function repeat(times, prototype) {
  const list = [];
  for (let i =0; i  < times; i++) {
    list.push(React.cloneElement(prototype))
  }

  return list;
}



storiesOf('List', module)
  .add('basic', wrapInApp(<List>
    {repeat(30, <p>Some great content...</p>)}
  </List>))
  .add('with ListItem', wrapInApp(<List>
    {repeat(30, <ListItem><p>Some great content...</p></ListItem>)}
  </List>))
;
