import * as Events from './events';
import * as Constants from './constants';

function setProps(newProps)
{
  const { localDispatcher, props: oldProps } = this;
  this.props = {  ...oldProps, ...newProps };
  localDispatcher.emit(Events.EVENT_UI_CHANGED, this.props, oldProps);
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
    this.setProps = setProps.bind(this);

    this.props = {
      display:            Constants.DISPLAY_EXPANDED, // expanded, collapsed
      visibility:         Constants.VISIBILITY_VISIBLE, // visible, hidden
      state:              Constants.STATE_READY, // loading, ready, empty, error, ? partial
      menu:               Constants.VISIBILITY_VISIBLE, // visible, hidden
      badgeVisibility:    Constants.VISIBILITY_HIDDEN, // visible, hidden
      badgeCount:         0,

      settingsVisibility: Constants.VISIBILITY_HIDDEN, // visible, hidden
      isResizing:         false,

      notification:            null,
      notificationType:        null
    }
  }

  // MENU API

  get menu() { return this.props.menu; }

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
   * The number to display in in the application badge
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
    const {
      badgeCount: oldCount,
    } = this.props;

    if (oldCount !== newCount) {
      this.setProps({ badgeCount: newCount });
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
      this.setProps({ visibility: newVisibility })
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
      this.setProps({ visibility: newVisibility })
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
      this.setProps({ display: newDisplay })
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
  get notification() { return this.props.notification; }

  get notificationType() { return this.props.notificationType; }

  showNotification = (notification, notificationType) => {
    this.setProps({ notification, notificationType });
  };
  /**
   * @param {Error} error
   */
  showErrorNotification = (error) => { this.showNotification(error.message, 'error') };

  closeNotification = () => {
    this.setProps({ notification:null, notificationType:null });
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
