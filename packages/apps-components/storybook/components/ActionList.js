import React from 'react';
import { storiesOf } from '@storybook/react';

import { ActionList, Action } from '../../src/Action';
import { sizeToSidebar } from './decorators'


function onAction(actionType)
{
  alert(`Action type '${actionType}' triggered`);
}

function renderAction(icon)
{
  return <Action icon={icon} onClick={() => onAction(icon)}/>
}

storiesOf('ActionList', module)
  .add('horizontal icons', sizeToSidebar(
    <ActionList >
      {
        ['edit', 'lock', 'refresh', 'search', 'tag', 'open', 'link', 'unlink', 'settings'].map(renderAction)
      }
    </ActionList>))
  .add('horizontal icons and labels', sizeToSidebar(
    <ActionList>
      {'edit'}
      <Action icon='lock' label={'Lock'} />
      <Action onAction={() => onAction('refresh')} icon='refresh' label={'Refresh'} />
    </ActionList>

  ))
  .add('vertical', sizeToSidebar(
    <ActionList orientation={"vertical"}>

      {['edit', 'lock', 'refresh', 'search', 'tag', 'open', 'link', 'unlink', 'settings'].map(renderAction)}

    </ActionList>))
  .add('vertical icons and labels', sizeToSidebar(
    <ActionList orientation={"vertical"}>
      {'edit'}
      <Action icon='lock' label={'Lock'} />
      <Action onAction={() => onAction('refresh')} icon='refresh' label={'Refresh'} />
    </ActionList>
    ))
;



