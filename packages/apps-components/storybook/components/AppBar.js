import React from 'react';
import { storiesOf } from '@storybook/react';

import { sizeToSidebar } from './decorators'

import AppBar from '../../src/AppBar';
import Action from '../../src/Action';
import Menu from '../../src/Menu';
import dpLogo from '../static/dp-logo.svg';

storiesOf('AppBar', module)
  .add('empty', sizeToSidebar(<AppBar title={"Deskpro"} iconUrl={"/dp-logo.svg"} />))
  .add('with controls', sizeToSidebar(
    <AppBar title={"Deskpro"} iconUrl={dpLogo}>
      <Action icon="refresh" />
      <Action icon='up' />
    </AppBar>
  ))
  .add('with controls and badge', sizeToSidebar(
    <AppBar title={"Deskpro"} badgeText={3} iconUrl={dpLogo}>
      <Action icon="refresh" />
      <Action icon='up' />
    </AppBar>
  ))
  .add('with controls, badge and settings menu', sizeToSidebar(
    <AppBar
      badgeText={3}
      title={"Deskpro"}
      iconUrl={dpLogo}
    >
      <Action icon="refresh" />
      <Action icon='up' />
      <Menu isOpen={true}>
        <Action icon="open" label={"Open"} />
        <Action icon="link" label={"Link"} />
      </Menu>
    </AppBar>
  ))
;
