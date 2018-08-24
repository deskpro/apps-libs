import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '@deskpro/apps-components-style';

import { ActionList } from '../Action';

/**
 * @param {string} iconUrl
 * @param {string} title
 * @param {string|Number} badgeText
 * @param  children
 * @param {string} className
 * @return {AppBar}
 * @constructor
 */
const AppBar = ({ iconUrl, title, badgeText, children, className, ...props }) => (
  <div {...props} className={classnames('dp-AppBar dp-Level', className)}>
    <div className="dp-LevelLeft">
      <div className="dp-AppBarIcon-wrap">
        {iconUrl && (
          <i className="dp-Icon">
            <img src={iconUrl} alt={title} />
          </i>
        )}

        {!!badgeText && <span className="dp-IconBadge">{badgeText}</span>}
      </div>

      <span className="dp-AppBarTitle">{title}</span>
    </div>

    {React.Children.count(children) > 0 && (
      <div className="dp-LevelRight">
        <ActionList>{children}</ActionList>
      </div>
    )}
  </div>
);

AppBar.propTypes = {
  /**
   * The url to the icon displayed in the bar
   */
  iconUrl: PropTypes.string,

  /**
   * The title displayed in the bar
   */
  title: PropTypes.string,

  /**
   * The text or number to display in the badge
   */
  badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * any additional classnames to be applied to the root element
   */
  className: PropTypes.string,
};

export default AppBar;
