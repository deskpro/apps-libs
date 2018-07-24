import React from 'react';
import '../custom-css.css';

import {AppFrame, Action} from '../../src'

/**
 * Returns a function that can be used with storiesOf.add which wraps the component in a div as wide as the apps sidebar
 *
 * @param {object} component
 * @return {function(): object}
 */
export function sizeToSidebar(component) {
  return () => (
    <div className={"dp-sidebar"}>
      <div className={"dp-Root"}>{component}</div>
    </div>

  );
}

export function wrapInAppPanel(component)
{
  return sizeToSidebar(
    <div className={"dp-AppPanel"}>
      <div className={"dp-AppPanelBody"}>
        {component}
      </div>
    </div>
  );
}

export function wrapInApp(body)
{
  return sizeToSidebar(
    <div className={"dp-AppPanel"}>
      <div className={"dp-AppPanelBody"}>
        <AppFrame title={"Deskpro"} iconUrl={"/dp-logo.svg"} actions={['refresh', () => <Action type='up' />]} >
          { body }
        </AppFrame>
      </div>
    </div>
  );
}
