import '@deskpro/apps-components-style';

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Action from './Action';

function renderAction(action) {
  if (typeof action === 'string') {
    return <Action icon={action} />;
  }

  if (typeof action === 'function') {
    return action();
  }

  return action;
}

function normalize(component) {
  if (React.isValidElement(component) && component.type !== Action) {
    return <div className={'dp-ActionListItem'}>{component}</div>;
  }

  return component;
}

/**
 * @param orientation
 * @param className
 * @param actions
 * @return {*}
 * @constructor
 */

/**
 * @param orientation
 * @param className
 * @param children a list containing a string, a function or an Action component
 * @return {*}
 * @constructor
 */
const ActionList = ({ orientation, className, children, ...props }) => (
  <div
    {...props}
    className={classnames(
      'dp-ActionList',
      orientation === 'vertical' ? 'dp-ActionList--is-vertical' : '',
      className,
    )}
  >
    {children && React.Children.map(children, renderAction).map(normalize)}
  </div>
);

ActionList.propTypes = {
  /**
   * the direction in which the items are layed out
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * any additional classnames to be applied to the root element of this component
   */
  className: PropTypes.string,

  /**
   * a function that will be invoked when one of the action is triggered (from a click for example)
   */
  onAction: PropTypes.func,
};

ActionList.defaultProps = {
  orientation: 'horizontal',
};

export default ActionList;
