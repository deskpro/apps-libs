import React from 'react';
import { storiesOf } from '@storybook/react';

import { Level, Menu, Action, AppFrame, ActionBar, ListItem, List, Avatar } from '../../src';
import { wrapInAppPanel } from './decorators'
import jiraLogo from '../static/jira-logo.svg';
import dpLogo from '../static/dp-logo.svg';


function renderMenu(isOpen)
{
  return (
    <Menu  isOpen={!!isOpen}>
      <Action icon="open" label={"Open"} />
      <Action icon="link" label={"Link"} />
    </Menu>
  )
}

function repeat(times, prototype) {
  const list = [];
  for (let i =0; i  < times; i++) {
    list.push(React.cloneElement(prototype))
  }

  return list;
}

function content()
{
  return (
    <List>
      <ListItem>
        <ActionBar iconUrl={jiraLogo} title={"Blog calender"}>
          {renderMenu(true)}
        </ActionBar>

        <Level>
          <Level align={"left"}>
            <span>Ready</span><span> | </span><span>Linked 12/06/2018</span>
          </Level>
          <Level align={"right"}>
            <Avatar shape={"round"} src={jiraLogo}/>
          </Level>
        </Level>

      </ListItem>

      {
        repeat(5,
          <ListItem>
            <ActionBar iconUrl={jiraLogo} title={"Design of messages"}>
              {renderMenu()}
            </ActionBar>

            <Level>
              <Level align={"left"}>
                <span>In Planning</span><span> | </span><span>Linked 12/06/2018</span>
              </Level>
              <Level align={"right"}>
                <Avatar shape={"round"} src={jiraLogo}/>
              </Level>
            </Level>

          </ListItem>
        )}
    </List>
  );
}

storiesOf('AppFrame', module)
  .add('empty', wrapInAppPanel(
    <AppFrame title={"Deskpro"} iconUrl={dpLogo}  />
  ))
  .add('empty and disabled', wrapInAppPanel(
    <AppFrame isInactive title={"Deskpro"} iconUrl={dpLogo} />
  ))
  .add('normal', wrapInAppPanel(
    <AppFrame title={"Deskpro"} iconUrl={dpLogo} >
      <ActionBar>
        <Action icon={"search"} label={"Find"}/>,
        <Action icon={"search"} label={"Create"}/>
      </ActionBar>
      {content()}
    </AppFrame>
  ))
  .add('with error', wrapInAppPanel(
    <AppFrame title={"Deskpro"} iconUrl={"/dp-logo.svg"} notification={"what is going on ?"} notificationType={"error"} >
      <ActionBar>
        <Action icon={"search"} label={"Find"}/>,
        <Action icon={"search"} label={"Create"}/>
      </ActionBar>
      {content()}
    </AppFrame>
  ))
;
