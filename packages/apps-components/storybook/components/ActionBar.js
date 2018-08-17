import React from 'react';
import { storiesOf } from '@storybook/react';

import { ActionBar, Action } from '../../src/Action';
import Menu from '../../src/Menu';
import jiraLogo from '../static/jira-logo.svg';
import {wrapInApp } from './decorators'


function onAction(actionType)
{
  alert(`Action type '${actionType}' triggered`);
}

storiesOf('ActionBar', module)
  .add('empty' , wrapInApp([
    <ActionBar iconUrl={jiraLogo} title={'Ticket DP-109'}/>,
    <p>No actions available</p>
  ]))
  .add('with actions' , wrapInApp([
    <ActionBar title={'Ticket DP-109'} iconUrl={jiraLogo} >
      <Action icon={'open'} onClick={() => onAction('open')} />
      {'close'}
      {'settings'}
    </ActionBar>
      ,
    <p><b>From:</b> John McEnroe</p>,
    <p>Do you have any documentation stating how to integrate microsoft dynamics 365 and also shopify?</p>
  ]))
  .add('only title and menu opened' , wrapInApp([
    <ActionBar iconUrl={jiraLogo} title={'Ticket DP-109'}>
      {'open'}
      {'close'}
      <Menu isOpen={true}>
        <Action icon="lock" label={"Pin"} />
        <Action icon="link" label={"Link"} />
      </Menu>
    </ActionBar>,
    <p><b>From:</b> John McEnroe</p>,
    <p>Do you have any documentation stating how to integrate microsoft dynamics 365 and also shopify?</p>

  ]))
;
