/**
 * This module exports the interface of the UI package
 * @module UI
 */

import * as UIEvents from './events';
import * as UIConstants from './constants';
import UIFacade from './UIFacade';
import connectRenderer from './render';

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
    connectRenderer
};

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

