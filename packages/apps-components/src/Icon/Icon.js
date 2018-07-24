import '@deskpro/apps-components-style';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const nameToClassnames = {
  up:         'dp-IconArrow iconArrow--top',
  down:       'dp-IconArrow',
  left:       'dp-IconArrow iconArrow--left',
  right:      'dp-IconArrow iconArrow--right',
  add:        'dp-IconPlus',
  close:      'dp-IconClose',
  edit:       'dp-IconEdit',
  lock:       'dp-IconLock',
  refresh:    'dp-RefreshIcon',
  refreshed:  'dp-RefreshIcon is-updated',
  refreshing: 'dp-RefreshIcon is-updating',
  search:     'dp-IconSearch',
  tag:        'dp-IconTag',
  open:       'dp-IconOpen',
  link:       'dp-IconLink',
  unlink:     'dp-IconUnlink',
  settings:   'dp-IconSettings'
};

/**
 * @param {string} name
 * @param {string} [className]
 * @param [children]
 * @return {*}
 * @constructor
 */
const Icon = ({ name, className, children}) => (
  <i className={classnames( nameToClassnames[name] , className)}>
    {children}
  </i>
);

Icon.propTypes = {

  className: PropTypes.string,

  name: PropTypes.string.isRequired
};


export default Icon;
