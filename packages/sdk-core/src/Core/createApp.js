/**
 * Exports application factories
 *
 * @module Core/createApp
 */

import { WidgetFactories } from '../Widget';
import postRobot from 'post-robot';

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
const registerAppEventListeners = (windowBridge, app) => {
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
};

/**
 * Creates an application using the keys defined on the props object
 *
 * @method
 * @param {WidgetWindowBridge} widgetWindow
 * @param {Object} instanceProps
 * @param {Object} contextProps
 * @return {AppClient}
 */
export const createAppFromProps = ({
  widgetWindow,
  instanceProps,
  contextProps,
}) => {
  const appProps = {
    registerEventHandlers: handleAppEvents.bind(null, widgetWindow),
    incomingDispatcher: IncomingEventDispatcher,
    outgoingDispatcher: OutgoingEventDispatcher,
    internalDispatcher: InternalEventDispatcher,
    instanceProps: new InstanceProps(instanceProps),
    contextProps: new ContextProps(contextProps),
  };

  return new AppClient(appProps);
};

/**
 * @function
 * @param {createAppCallback} cb a callback to be invoked after the app is ready
 */
export const createApp = (cb, widgetWin) => {
  const WidgetWindow = widgetWin || WidgetFactories.windowBridgeFromWindow(window);

  WidgetWindow.connect(createAppFromProps)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(cb);
};

/**
 * @function
 * @param {createAppCallback} cb a callback to be invoked after the app is ready
 */
export const createMockApp = (cb, options = {}) => {
  const WidgetWindow = WidgetFactories.windowBridgeFromMockData(options.window || document.getElementById('testAppFrame') || window, options);

  WidgetWindow.connect(createAppFromProps)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(cb);
}

export default createApp;

/**
 * Event emitter function
 *
 * @callback createAppCallback
 * @param {Error|null} error
 */
