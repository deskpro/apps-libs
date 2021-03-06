/**
 * Exports application factories
 *
 * @module Core/createApp
 */

import { createWindowBridge, createMockWindowBridge } from '../Widget';

import {
  InternalEventDispatcher,
  IncomingEventDispatcher,
  OutgoingEventDispatcher,
} from './emit';
import { handleInvokeEvents, handleAppEvents } from './EventHandler';

import { registerEventHandlers as registerStorageEventHandlers } from '../Storage';
import { registerEventHandlers as registerSecurityEventHandlers } from '../Security';
import { registerEventHandlers as registerAppEventHandlers } from './AppEvents';
import { registerEventHandlers as registerContextEventHandlers } from '../Context';
import { registerEventHandlers as registerContextUserEventHandlers } from './ContextUserEvents';
import { registerEventHandlers as registerWebAPIEventHandlers } from '../WebAPI';
import { registerEventHandlers as registerDeskproWindowEventHandlers } from '../DeskproWindow';
import { registerEventHandlers as registerUIEventHandlers } from '../UI';

import { createContext } from '../Context';
import { createUIFacade, connectRenderer } from '../UI';
import { createStorageAPIClient } from '../Storage';
import { createDeskproApiClient } from '../WebAPI';
import { createDeskproWindowFacade } from '../DeskproWindow';
import { createOauthAPIClient } from '../Security';
import { createI18n } from '../I18n/create';

import AppClient from './AppClient';

import InstanceProps from './InstanceProps';
import ContextProps from './ContextProps';

let appInstanceSingleton;

/**
 * @ignore
 * @internal
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
function registerAppEventListeners(windowBridge, app) {
  handleInvokeEvents(windowBridge, app);

  [
    registerSecurityEventHandlers,
    registerStorageEventHandlers,
    registerAppEventHandlers,
    registerContextUserEventHandlers,
    registerContextEventHandlers,
    registerWebAPIEventHandlers,
    registerDeskproWindowEventHandlers,
    registerUIEventHandlers,
  ].forEach(registrar =>
    registrar(
      windowBridge,
      app,
      IncomingEventDispatcher,
      OutgoingEventDispatcher,
    ),
  );

  return app;
}

/**
 * @param {function} registerEventHandlers
 * @param {Object} instanceProps
 * @param {Object} contextProps
 * @param [others]
 * @return {AppClient}
 */
export function createAppFromProps({
  registerEventHandlers,
  instanceProps,
  contextProps,
  ...others
}) {
  const instancePropsObject = new InstanceProps(instanceProps);
  const contextPropsObject = new ContextProps(contextProps);

  const incomingDispatcher =
    others.incomingDispatcher || IncomingEventDispatcher;
  const outgoingDispatcher =
    others.outgoingDispatcher || OutgoingEventDispatcher;
  const localDispatcher = others.localDispatcher || InternalEventDispatcher;

  const defaultProps = {
    registerEventHandlers,

    incomingDispatcher,
    outgoingDispatcher,
    localDispatcher,

    instanceProps: instancePropsObject,
    contextProps: contextPropsObject,
    context: createContext(
      outgoingDispatcher,
      incomingDispatcher,
      instancePropsObject,
      contextPropsObject,
    ),
    restApi: createDeskproApiClient(outgoingDispatcher),
    storageApi: createStorageAPIClient(
      outgoingDispatcher,
      instancePropsObject,
      contextPropsObject,
    ),
    deskproWindow: createDeskproWindowFacade(outgoingDispatcher),
    oauth: createOauthAPIClient(
      outgoingDispatcher,
      instancePropsObject,
      contextPropsObject,
    ),
    ui: createUIFacade(outgoingDispatcher, localDispatcher),

    i18n: createI18n(instancePropsObject.locale),
  };

  const appProps = { ...defaultProps, ...others, registerEventHandlers };
  const appClient = new AppClient(appProps);

  if (!others.noSetSingleton) {
    if (!appInstanceSingleton || others.forceSetSingleton) {
      appInstanceSingleton = appClient;
    }
  }

  return appClient;
}

/**
 * Get the instance of the app client. Can only be called after an app client
 * has actually been created.
 *
 * @return {AppClient}
 */
export function getDpApp() {
  if (!appInstanceSingleton) {
    throw new Error(
      'You cannot use getDpApp() before the client has been created',
    );
  }
  return appInstanceSingleton;
}

/**
 * @param {function(AppClient): function} renderFactory a callback to be invoked after the app is ready
 */
export function createRenderer(renderFactory) {
  /**
   * @param {AppClient} dpapp
   */
  function renderer(dpapp) {
    const connectedRenderer = connectRenderer(dpapp, renderFactory);
    connectedRenderer(dpapp.ui); // trigger the connected renderer
    return { dpapp, renderer: connectedRenderer };
  }

  return renderer;
}

/**
 * Creates an application after the initial connection handshaking
 *
 * @param {WidgetWindowBridge} widgetWindow
 * @param {Object} instanceProps
 * @param {Object} contextProps
 * @return {AppClient}
 */
function createAppOnConnection({
  widgetWindow,
  instanceProps,
  contextProps,
  ...others
}) {
  /**
   * @type {function}
   */
  const registerEventHandlers = handleAppEvents.bind(null, widgetWindow);
  return createAppFromProps({
    registerEventHandlers,
    instanceProps,
    contextProps,
    ...others,
  });
}

/**
 * @param {function(AppClient): function} renderFactory a callback to be invoked after the app is ready
 * @param widgetWin
 * @return {Promise<{dpapp: AppClient, renderer: Function}>}
 */
export function createApp(renderFactory, widgetWin) {
  const WidgetWindow = widgetWin || createWindowBridge(window);

  return WidgetWindow.connect(createAppOnConnection)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(createRenderer(renderFactory));
}

/**
 * @function
 * @param {function(AppClient)} createRenderer a callback to be invoked after the app is ready
 * @param options
 * @return {Promise<{dpapp: AppClient, renderer: Function}>}
 */
export function createMockApp(createRenderer, options = {}) {
  const WidgetWindow = createMockWindowBridge(
    options.window || document.getElementById('testAppFrame') || window,
    options,
  );

  // DPAPP_MANIFEST is exported by webpack.
  const manifest = DPAPP_MANIFEST || null;

  WidgetWindow.connect(createAppOnConnection)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(createRenderer(createRenderer, manifest));
}

export default createApp;
