import React from 'react';
import '@deskpro/apps-components-style';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ActionBar, Action } from '../Action'

const Panel = function ({ className, title, iconUrl, children })
{
  const actions = [];
  const bodyItems = [];

  React.Children.forEach(children, function (child) {

    if (child.type === Action) {
      actions.push(child);
    } else {
      bodyItems.push(child);
    }
  });

  return (
    <div className={classnames("dp-Panel", className)}>
      <div className="dp-PanelHeader">
        <ActionBar title={title} iconUrl={iconUrl}>
          {actions}
        </ActionBar>
      </div>
      <div className="dp-PanelBody">
        {bodyItems}
      </div>
    </div>
  )
};

Panel.propTypes = {

  /**
   * any additional classnames to be applied to the root element
   */
  className: PropTypes.string,

  /**
   * The url of an icon to be displayed to the left of the title
   */
  iconUrl: PropTypes.string,

  /**
   * The text displayed on the left side
   */
  title: PropTypes.string,
};

export default Panel
