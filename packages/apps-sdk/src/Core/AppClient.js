import * as AppEvents from './AppEvents';
import * as Event from './Event';

/**
 * A facade exposing all the underlying services required by an application
 *
 * @class
 */
class AppClient {
  /**
   *
   * @param {function} registerEventHandlers registers on demand event handlers via the {@link AppClient.subscribe} method
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} localDispatcher the internal events dispatcher
   * @param {InstanceProps} instanceProps the property bag containing instance props
   * @param {ContextProps} contextProps the property bag containing context props
   * @param {Context} context instance of the {@link Context} client
   * @param {DeskproAPIClient} restApi instance of the deskpro api client
   * @param {StorageApiFacade} storageApi instance of the storage api client
   * @param {DeskproWindowFacade} deskproWindow instance of the deskpro window client
   * @param {OauthFacade} oauth instanceof of the oauth client
   * @param {UIFacade} ui instance of the ui client
   */
  constructor({
    registerEventHandlers,
    outgoingDispatcher,
    incomingDispatcher,
    localDispatcher,
    instanceProps,
    contextProps,
    context,
    restApi,
    storageApi,
    deskproWindow,
    oauth,
    ui
  }) {
    this.props = {
      registerEventHandlers,
      outgoingDispatcher,
      incomingDispatcher,
      localDispatcher,
      instanceProps,
      contextProps,
      context,
      restApi,
      storageApi,
      deskproWindow,
      oauth,
      ui
    };

    this._state = {
      appTitle: instanceProps.appTitle,
    };
  }

  // EVENT EMITTER API
  /**
   * Registers an event listener. For the moment, you can only listen to internal events via this method
   *
   * @public
   * @param {String} eventName
   * @param {function} listener
   */
  on = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    this.props.localDispatcher.on(eventName, listener);
  };

  /**
   * Removes an event listener. For the moment, only internal events are supported
   *
   * @public
   * @method
   * @param {String} eventName
   * @param {function} listener
   */
  off = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everything is
    this.eventDispatcher.removeListener(eventName, listener);
  };

  /**
   * Adds a one time event listener for an internal event
   *
   * @public
   * @method
   * @param {String} eventName
   * @param {function} listener
   */
  once = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everything is
    this.eventDispatcher.once(eventName, listener);
  };

  // EVENT SUBSCRIBER API

  /**
   * Get notified when the app receives an incoming event, such as one sent from the helpdesk window.
   * An example of such an event is the `context.ticket.reply`event which is sent when the agent replies to a ticket
   *
   * @param {string} eventName
   * @param {function(Object):Promise}  handler
   */
  subscribe(eventName, handler) {
    const { outgoingDispatcher, registerEventHandlers } = this.props;

    function sendHandlerResponse(sendResponse, data) {
      let handlerResult;

      try {
        handlerResult = handler(data);
      } catch (e) {
        sendResponse(null, { canceled: false, message: e });
        return;
      }

      const handlerPromise =
        handlerResult instanceof Promise
          ? handlerResult
          : Promise.resolve(handlerResult);

      handlerPromise
        .catch(message => {
          sendResponse(null, { canceled: true, message });
          return Promise.reject(message);
        })
        .then(message => sendResponse(null, { canceled: false, message }));
    }

    outgoingDispatcher
      .emitAsync(AppEvents.EVENT_SUBSCRIBE, { events: [eventName] })
      .then(events => {
        for (const event of events) {
          const eventProps = {
            channelType: Event.CHANNEL_INCOMING,
            invocationType: event.invocationType,
          };
          registerEventHandlers(this, event.name, eventProps);
          this.props.incomingDispatcher.on(event.name, sendHandlerResponse);
        }
      });
  }

  /**
   * Triggers the listeners of an outgoing or internal event
   *
   * @public
   * @method
   * @param {string|{}} event
   * @param {...*} args
   * @return {Promise.<*>}
   */
  async emit(event, ...args) {
    // invocation
    if (Event.isInvocation(event) && args.length > 0) {
      const { outgoingDispatcher } = this.props;
      return outgoingDispatcher.emitInvokeAsync({ ...event, data: args[0] });
    }

    // internal event
    const { localDispatcher } = this.props;
    const dispatcherArgs = [event].concat(args);
    localDispatcher.emit.apply(localDispatcher, dispatcherArgs);
    return Promise.resolve(args);
  }

  // Properties API

  /**
   * Returns the value of a property by looking up in the instance properties bag then in the context properties bag
   *
   * @public
   * @method
   * @param {String} propertyName
   * @return {String|null|undefined}
   */
  getProperty = propertyName => {
    const { instanceProps, contextProps } = this.props;
    let value = instanceProps.getProperty(propertyName);

    if (value === undefined) {
      value = contextProps.getProperty(propertyName);
    }

    return value;
  };

  /**
   * Returns a map of all the instance and context properties
   *
   * @public
   * @return {Object}
   */
  get properties() {
    const { instanceProps, contextProps } = this.props;

    const instanceProperties = instanceProps.toJS();
    const contextProperties = contextProps.toJS();

    return { ...instanceProperties, ...contextProperties };
  }

  /**
   * Returns the name of the current application environment
   *
   * @public
   * @return {'production'|'development'}
   */
  get environment() {
    const defaultEnvironment = 'production';

    const { contextProps } = this.props;
    const env = contextProps.getProperty('appsEnvironment');
    return env || defaultEnvironment;
  }

  /**
   * The id of the application this instance belongs to
   *
   * @public
   * @readonly
   * @return {String}
   */
  get appId() {
    return this.props.instanceProps.appId;
  }

  /**
   * The id of this instance
   *
   * @public
   * @readonly
   * @return {String}
   */
  get instanceId() {
    return this.props.instanceProps.instanceId;
  }

  /**
   * The display title of this application
   *
   * @public
   * @return {String}
   */
  get appTitle() {
    return this._state.appTitle;
  }

  /**
   * @ignore
   * @param {String} newTitle
   */
  set appTitle(newTitle) {
    const oldTitle = this._state.appTitle;

    if (newTitle !== oldTitle) {
      this._state.appTitle = newTitle;

      const { eventDispatcher } = this.props;
      eventDispatcher.emit(AppEvents.EVENT_TITLE_CHANGED, newTitle, oldTitle);
    }
  }

  /**
   * Resets the display title of this application
   *
   * @public
   * @method
   */
  resetAppTitle = () => {
    this.appTitle = this.props.instanceProps.appTitle;
  };

  /**
   * The package name (from package.json) of this application
   *
   * @public
   * @readonly
   * @type {String}
   */
  get packageName() {
    return this.props.instanceProps.appPackageName;
  }

  // Misc API

  /**
   * Emits an internal event that signals its handlers the application needs to refresh. When the application has
   * an UI then it will re-render
   *
   * @public
   * @method
   */
  refresh = () => {

    if (window && window.location && typeof window.location.reload === 'function') {
      window.location.reload(true);
    }

  };


  // CLIENTS

  /**
   * The oauth client
   *
   * @public
   * @readonly
   * @type {OauthFacade}
   */
  get oauth() {
    return this.props.oauth;
  }

  /**
   * The UI client of the application, which provides a standard way to invoke UI behaviour
   *
   * @public
   * @readonly
   * @type {UIFacade}
   */
  get ui() {
    return this.props.ui;
  }

  /**
   * The help desk UI client, which enables interaction with the UI of the helpdesk window hosting the application
   *
   * @public
   * @readonly
   * @type {DeskproWindowFacade}
   */
  get deskproWindow() {
    return this.props.deskproWindow;
  }

  /**
   * A client for the Deskpro REST API
   *
   * @public
   * @readonly
   * @type {DeskproAPIClient}
   */
  get restApi() {
    return this.props.restApi;
  }

  /**
   * A client for accessing the storage APIs in a simple manner
   *
   * @public
   * @readonly
   * @type {StorageApiFacade}
   */
  get storage() {
    return this.props.storageApi;
  }

  /**
   * The context in which the application runs
   *
   * @public
   * @readonly
   * @type {Context}
   */
  get context() {
    return this.props.context;
  }

  log = (...args) => {
    console.log.apply(console, args);
  };
}

export default AppClient;
