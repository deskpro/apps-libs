import '@deskpro/apps-components-style';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Action extends React.PureComponent
{
  render()
  {
    const { icon, label, className, onClick } = this.props;

    return (
      <a className={classnames("dp-ActionListItem dp-ActionListIcon dp---is-hoverable", className)} onClick={onClick}>

        <Icon name={icon} />

        { label && <span className="dp-ActionListLabel">{label}</span> }

      </a>
    )
  }
}

Action.propTypes = {
  className:  PropTypes.string,
  icon:        PropTypes.string.isRequired,
  onClick:     PropTypes.func,
  label:       PropTypes.string
};

export default Action;
