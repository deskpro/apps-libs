import React from 'react';
import '@deskpro/apps-components-style';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ActionBar, Action } from '../Action'

const borderToClassName = {
  "solid": "",
  "none": "dp-Panel--borderless"
};

const Panel = function ({ className, title, iconUrl, border, children, ...props })
{
  const actions = [];
  const bodyItems = [];

  React.Children.forEach(children, function (child) {

    if (child && child.type === Action) {
      actions.push(child);
    } else {
      bodyItems.push(child);
    }
  });


  return (
    <div {...props} className={classnames("dp-Panel", borderToClassName[border], className)}>
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

  /**
   * The type of border surrounding this component
   */
  border: PropTypes.oneOf(["none", "solid"])
};

Panel.defaultProps = {
  border: 'solid'
};

export default Panel
