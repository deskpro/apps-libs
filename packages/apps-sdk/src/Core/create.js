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

import { createContext } from '../Context';
import { createUIFacade, connectRenderer } from '../UI';
import { createStorageAPIClient } from '../Storage';
import { createDeskproApiClient } from '../WebAPI';
import { createDeskproWindowFacade } from '../DeskproWindow';
import { createOauthAPIClient } from '../Security';

import AppClient from './AppClient';

import InstanceProps from './InstanceProps';
import ContextProps from './ContextProps';

/**
 * @ignore
 * @internal
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
function registerAppEventListeners (windowBridge, app) {
  handleInvokeEvents(windowBridge, app);

  [
    registerSecurityEventHandlers,
    registerStorageEventHandlers,
    registerAppEventHandlers,
    registerContextUserEventHandlers,
    registerContextEventHandlers,
    registerWebAPIEventHandlers,
    registerDeskproWindowEventHandlers,
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
export function createAppFromProps({ registerEventHandlers, instanceProps, contextProps, ...others })
{
  const instancePropsObject = new InstanceProps(instanceProps);
  const contextPropsObject = new ContextProps(contextProps);

  const incomingDispatcher = others.incomingDispatcher || IncomingEventDispatcher;
  const outgoingDispatcher = others.outgoingDispatcher || OutgoingEventDispatcher;
  const localDispatcher = others.localDispatcher || InternalEventDispatcher;


  const defaultProps = {
    registerEventHandlers,

    incomingDispatcher,
    outgoingDispatcher,
    localDispatcher,

    instanceProps:  instancePropsObject,
    contextProps:   contextPropsObject,
    context:        createContext(outgoingDispatcher, incomingDispatcher, instancePropsObject, contextPropsObject),
    restApi:        createDeskproApiClient(outgoingDispatcher),
    storageApi:     createStorageAPIClient(outgoingDispatcher, instancePropsObject, contextPropsObject),
    deskproWindow:  createDeskproWindowFacade(outgoingDispatcher),
    oauth:          createOauthAPIClient(outgoingDispatcher, instancePropsObject, contextPropsObject),
    ui:             createUIFacade(outgoingDispatcher, localDispatcher)
  };

  const appProps = {  ...defaultProps, ...others, registerEventHandlers };
  return new AppClient(appProps);
}

/**
 * @param {function(AppClient): function} renderFactory a callback to be invoked after the app is ready
 */
export function createRenderer(renderFactory)
{
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
function createAppOnConnection({widgetWindow, instanceProps, contextProps})
{
  /**
   * @type {function}
   */
  const registerEventHandlers = handleAppEvents.bind(null, widgetWindow);
  return createAppFromProps({ registerEventHandlers, instanceProps, contextProps })
}

/**
 * @param {function(AppClient): function} renderFactory a callback to be invoked after the app is ready
 * @param widgetWin
 * @return {Promise<{dpapp: AppClient, renderer: Function}>}
 */
export function createApp(renderFactory, widgetWin)
{
  const WidgetWindow = widgetWin || createWindowBridge(window);

  return WidgetWindow.connect(createAppOnConnection)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(createRenderer(renderFactory))
  ;
}

/**
 * @function
 * @param {function(AppClient)} createRenderer a callback to be invoked after the app is ready
 * @param options
 * @return {Promise<{dpapp: AppClient, renderer: Function}>}
 */
export function createMockApp (createRenderer, options = {}) {
  const WidgetWindow = createMockWindowBridge(options.window || document.getElementById('testAppFrame') || window, options);

  // DPAPP_MANIFEST is exported by webpack.
  const manifest = DPAPP_MANIFEST || null;

  WidgetWindow.connect(createAppOnConnection)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(createRenderer(createRenderer, manifest))
}

export default createApp;
