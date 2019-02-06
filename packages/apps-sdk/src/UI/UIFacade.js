import * as Events from './events';
import * as Constants from './constants';

function requestChangeProps(newProps) {
  const { outgoingDispatcher } = this;
  const oldProps = JSON.parse(JSON.stringify(this.props));

  const nextProps = { ...oldProps, ...newProps };
  return outgoingDispatcher.emitAsync(Events.EVENT_UI_CHANGED, nextProps);
}

/**
 * @param {Object} newProps
 * @return {Object}
 */
function receiveChangeProps(newProps) {
  const { localDispatcher } = this;
  const oldProps = JSON.parse(JSON.stringify(this.props));

  const actualProps = { ...oldProps, ...newProps };
  this.props = actualProps;

  localDispatcher.emit(Events.EVENT_UI_CHANGED, actualProps, oldProps);
  return actualProps;
}

/**
 * @param {UIFacade} facade
 */
function actionChangePropsAsync(facade) {
  const request = requestChangeProps.bind(facade);
  const receive = receiveChangeProps.bind(facade);

  return function action(props) {
    return request(props).then(receive);
  };
}

function setProps(newProps) {
  const { outgoingDispatcher, localDispatcher } = this;
  const oldProps = JSON.parse(JSON.stringify(this.props));

  const nextProps = { ...oldProps, ...newProps };
  this.props = JSON.parse(JSON.stringify(newProps));
  localDispatcher.emit(Events.EVENT_UI_CHANGED, nextProps, oldProps);
  outgoingDispatcher.emitAsync(Events.EVENT_UI_CHANGED, nextProps);
}

/**
 * A facade which allows application code to interact with the UI Container
 *
 * @class
 */
class UIFacade {
  /**
   * @param {AppEventEmitter} outgoingDispatcher
   * @param {AppEventEmitter} localDispatcher
   */
  constructor(outgoingDispatcher, localDispatcher) {
    this.outgoingDispatcher = outgoingDispatcher;
    this.localDispatcher = localDispatcher;
    this.setPropsAsync = actionChangePropsAsync(this);
    this.setProps = setProps.bind(this);

    this.props = {
      display: Constants.DISPLAY_EXPANDED, // expanded, collapsed
      visibility: Constants.VISIBILITY_VISIBLE, // visible, hidden
      state: Constants.STATE_READY, // loading, ready, empty, error, ? partial
      menu: Constants.VISIBILITY_VISIBLE, // visible, hidden
      badgeVisibility: Constants.VISIBILITY_HIDDEN, // visible, hidden
      badgeCount: 0,
      badgeStyle: Constants.BADGESTYLE_URGENT,

      settingsVisibility: Constants.VISIBILITY_HIDDEN, // visible, hidden
      isResizing: false,

      notification: null,
      notificationType: null,
      title: null,
    };
  }

  // TITLE API

  /**
   * Resets the display title the application
   *
   * @param {string|null} [title]
   */
  changeTitle = title => {
    const { title: oldTitle } = this.props;
    if (title !== oldTitle) {
      this.setProps({ title: !!title ? title : null });
    }
  };

  // MENU API

  get menu() {
    return this.props.menu;
  }

  /**
   * Shows the UI container's application menu
   *
   * @method
   */
  showMenu = () => {
    const { menu: oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_VISIBLE;

    if (oldVisibility !== newVisibility) {
      this.setProps({ menu: newVisibility });
    }
  };

  /**
   * Hides the UI container's application menu
   *
   * @method
   */
  hideMenu = () => {
    const { menu: oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_HIDDEN;

    if (oldVisibility !== newVisibility) {
      this.setProps({ menu: newVisibility });
    }
  };

  // BADGE API

  /**
   * The visibility of the application badge
   *
   * @readonly
   * @type {string}
   */
  get badgeVisibility() {
    return this.props.badgeVisibility;
  }

  /**
   * Shows a number in the application badge
   *
   * @method
   */
  showBadgeCount = () => {
    const { badgeVisibility: oldVisibility, badgeCount } = this.props;
    const newVisibility = Constants.VISIBILITY_VISIBLE;

    if (oldVisibility !== newVisibility) {
      this.setProps({ badgeVisibility: newVisibility });
    }
  };

  /**
   * Hides a number in the application badge
   *
   * @method
   */
  hideBadgeCount = () => {
    const { badgeVisibility: oldVisibility, badgeCount } = this.props;
    const newVisibility = Constants.VISIBILITY_HIDDEN;

    if (oldVisibility !== newVisibility) {
      this.setProps({ badgeVisibility: newVisibility });
    }
  };

  /**
   * The number to display in the application badge
   *
   * @type {number}
   */
  get badgeCount() {
    return this.props.badgeCount;
  }

  /**
   * @ignore
   * @param {number} newCount
   */
  set badgeCount(newCount) {
    const { badgeCount: oldCount } = this.props;

    if (oldCount !== newCount) {
      this.setProps({ badgeCount: newCount });
    }
  }

  /**
   * The style of the application badge
   *
   * @type {string}
   */
  get badgeStyle() {
    return this.props.badgeStyle;
  }

  /**
   * @ignore
   * @param {string} newStyle
   */
  set badgeStyle(newStyle) {
    const isValid =
      -1 !==
      [Constants.BADGESTYLE_URGENT, Constants.BADGESTYLE_STANDARD].indexOf(
        newStyle,
      );

    if (!isValid) {
      throw new Error('Invalid style');
    }

    const { badgeStyle: oldStyle } = this.props;

    if (oldStyle !== newStyle) {
      this.setProps({ badgeStyle: newStyle });
    }
  }

  // APP VISIBILITY API

  /**
   * The application visibility property
   *
   * @readonly
   * @type {string}
   */
  get visibility() {
    return this.props.visibility;
  }

  /**
   * Checks if the application is visible
   *
   * @method
   *
   * @return {boolean}
   */
  isVisible = () => {
    return this.props.visibility === Constants.VISIBILITY_VISIBLE;
  };

  /**
   * Checks if the application is hidden
   *
   * @method
   *
   * @return {boolean}
   */
  isHidden = () => {
    return this.props.visibility === Constants.VISIBILITY_HIDDEN;
  };

  /**
   * Shows the application
   *
   * @method
   */
  show = () => {
    const newVisibility = Constants.VISIBILITY_VISIBLE;
    const { visibility: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.setProps({ visibility: newVisibility });
    }
  };

  /**
   * Hides the application
   *
   * @method
   */
  hide = () => {
    const newVisibility = Constants.VISIBILITY_HIDDEN;
    const { visibility: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.setProps({ visibility: newVisibility });
    }
  };

  // APP DISPLAY / APP LAYOUT API

  /**
   * The application display property
   *
   * @readonly
   * @type {string}
   */
  get display() {
    return this.props.display;
  }

  /**
   * Checks if the application is expanded
   *
   * @method
   *
   * @return {boolean}
   */
  isExpanded = () => {
    return this.props.display === Constants.DISPLAY_EXPANDED;
  };

  /**
   * Checks if the application is collapsed
   *
   * @method
   *
   * @return {boolean}
   */
  isCollapsed = () => {
    return this.props.display === Constants.DISPLAY_COLLAPSED;
  };

  /**
   * Collapses the application
   *
   * @method
   */
  collapse = () => {
    const newDisplay = Constants.DISPLAY_COLLAPSED;
    const { display: oldDisplay } = this.props;

    if (oldDisplay !== newDisplay) {
      this.setProps({ display: newDisplay });
    }
  };

  /**
   * Expands the application
   *
   * @method
   */
  expand = () => {
    const newDisplay = Constants.DISPLAY_EXPANDED;
    const { display: oldDisplay } = this.props;

    if (oldDisplay !== newDisplay) {
      this.setProps({ display: newDisplay });
    }
  };

  /**
   * Puts the application in full-screen mode. Full-screen mode will not be acquired if another app is already in full-screen
   *
   * @method
   */
  fullscreen = () => {
    const newDisplay = Constants.DISPLAY_FULLSCREEN;
    const { display: oldDisplay } = this.props;

    if (oldDisplay !== newDisplay) {
      this.setPropsAsync({ display: newDisplay });
    }
  };

  // UI STATE API

  /**
   * The UI container state property
   *
   * @readonly
   * @type {string}
   */
  get state() {
    return this.props.state;
  }

  /**
   * Checks if the UI is in a loading state
   *
   * @method
   *
   * @return {boolean}
   */
  isLoading = () => {
    return this.props.state === Constants.STATE_LOADING;
  };

  /**
   * Checks if the UI is in the ready state
   *
   * @method
   *
   * @return {boolean}
   */
  isReady = () => {
    return this.props.state === Constants.STATE_READY;
  };

  /**
   * Checks if the UI is in a loading state
   *
   * @method
   *
   * @return {boolean}
   */
  isError = () => {
    return this.props.state === Constants.STATE_ERROR;
  };

  /**
   * Shows a loading indicator
   *
   * @method
   */
  showLoading = () => {
    const { state } = this.props;

    if (state !== Constants.STATE_LOADING) {
      this.setProps({ state: Constants.STATE_LOADING });
    }
  };

  /**
   * Hides the active loading indicator
   *
   * @method
   */
  hideLoading = () => {
    const { state } = this.props;

    if (state === Constants.STATE_LOADING) {
      this.setProps({ state: Constants.STATE_READY });
    }
  };

  // Message API

  /**
   * The UI container state property
   *
   * @readonly
   * @type {string|Error}
   */
  get notification() {
    return this.props.notification;
  }

  get notificationType() {
    return this.props.notificationType;
  }

  /**
   * @param {string} message the message of the notificatino
   * @param {string} type the type of notification, for instance "error"
   */
  showNotification = (message, type) => {
    this.setProps({ notification: message, notificationType: type });
  };
  /**
   * @param {Error} error
   */
  showErrorNotification = error => {
    this.showNotification(error.message, 'error');
  };

  closeNotification = () => {
    this.setProps({ notification: null, notificationType: null });
  };

  // SETTINGS API

  /**
   * Shows the settings API
   *
   * @method
   */
  showSettings = () => {
    const newVisibility = Constants.VISIBILITY_VISIBLE;
    const { settingsVisibility: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.setProps({ settingsVisibility: newVisibility });
    }
  };
}

export default UIFacade;
