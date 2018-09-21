/**
 * This module exports the interface of the UI package
 * @module UI
 */

import * as UIEvents from './events';
import * as UIConstants from './constants';
import UIFacade from './UIFacade';
import connectRenderer from './render';
import { handleOutgoingEvent } from '../Core/EventHandler';

export {
  /**
   * @type {module:UI/events}
   */
  UIEvents,
  /**
   * @type {module:UI/constants}
   */
  UIConstants,
  /**
   * @type {function}
   */
  connectRenderer,
};

/**
 * Registers helpdesk window events with the event dispatching system
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export function registerEventHandlers(windowBridge, app) {
  handleOutgoingEvent(
    windowBridge,
    app,
    UIEvents.EVENT_UI_CHANGED,
    UIEvents.props.EVENT_UI_CHANGED,
  );
}

/**
 * @method
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {AppEventEmitter} internalEventDispatcher
 * @return {UIFacade}
 */
export const createUIFacade = (outgoingDispatcher, internalEventDispatcher) => {
  return new UIFacade(outgoingDispatcher, internalEventDispatcher);
};
