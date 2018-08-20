import '@deskpro/apps-components-style';

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ActionList from './ActionList';
import { Level } from '../Layout';

/**
 * @param {string} [iconUrl]
 * @param {string} [title]
 * @param {string|Number} badgeText
 * @param children
 * @param {string} className
 * @constructor
 */
const ActionBar = ({ iconUrl, title, children, className }) => (
  <div className={classnames('dp-ActionBar dp-Level', className)}>
    <Level align={'left'}>
      {iconUrl && (
        <i className="dp-Icon dp-ActionBarIcon">
          <img src={iconUrl} alt={title} />
        </i>
      )}

      <span className="dp-ActionBarTitle">{title}</span>
    </Level>

    <ActionList className={'dp-LevelRight'}>{children}</ActionList>
  </div>
);

ActionList.propTypes = {

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

export default ActionBar;
