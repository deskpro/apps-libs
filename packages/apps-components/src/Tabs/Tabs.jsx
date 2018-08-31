import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function objectKeyFilter(obj1, obj2) {
  const obj2Keys = Object.keys(obj2);
  const newProps = Object.assign({}, obj1);
  Object.keys(newProps)
    .filter(key => obj2Keys.indexOf(key) !== -1)
    .forEach(key => delete newProps[key]);

  return newProps;
}

/**
 * Renders a group of links as tabs.
 */
export default class Tabs extends React.Component {
  static propTypes = {
    /**
     * Name of the active tab.
     */
    active:    PropTypes.string.isRequired,
    /**
     * CSS classes to apply to the element.
     */
    className: PropTypes.string,
    /**
     * Children to render.
     */
    children:  PropTypes.node.isRequired,
    /**
     * Called when the active tab changes. Receives the name of the tab.
     */
    onChange:  PropTypes.func
  };

  static defaultProps = {
    active:    '',
    className: '',
    onChange:  () => {},
  };

  handleClick = (active) => {
    if (active !== this.props.active) {
      this.props.onChange(active);
    }
  };

  render() {
    const { className, children, active, ...props } = this.props;

    const tabs = React.Children.map(children, child => React.cloneElement(child, {
      onClick: this.handleClick,
      active:  child.props.name === active
    }));

    return (
      <ul className={classNames('dp-TabSwitcher', className)} {...objectKeyFilter(props, Tabs.propTypes)}>
        {tabs}
      </ul>
    );
  }
}
