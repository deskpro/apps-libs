import '@deskpro/apps-components-style';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Action extends React.PureComponent {
  render() {
    const { icon, label, labelDisplay, className, onClick, ...props } = this.props;

    return (
      <a
        {...props}
        className={classnames(
          'dp-ActionListItem dp-ActionListIcon dp---is-hoverable',
          className,
        )}
        onClick={onClick}
        title=  {labelDisplay === 'onHover' ? label : ""}
      >
        {icon && <Icon name={icon} />}

        {label && labelDisplay === 'always' && <span className="dp-ActionListLabel">{label}</span>}
      </a>
    );
  }
}

Action.propTypes = {

  /**
   * any additional classnames to be applied to the root element
   */
  className: PropTypes.string,

  /**
   * the name of an icon that represents the action
   */
  icon: PropTypes.string,

  /**
   * a handler function
   */
  onClick: PropTypes.func,

  /**
   *the name of the action
   */
  label: PropTypes.string,

  /**
   * A string indicating how to display the label. If the value is "always" the label is shown to the right of the icon. If value is "onHover" label will be shown when mouse is over the icon
   */
  labelDisplay: PropTypes.oneOf(
    'always',
    'onHover'
  ),
};


Action.defaultProps = {
  icon:          null,
  labelDisplay: 'always'
};

export default Action;
