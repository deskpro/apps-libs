/**
 * Defines events and event related functionality which are related to the application
 *
 * @module Core/AppEvents
 */

import {
  CHANNEL_OUTGOING,
  INVOCATION_FIREANDFORGET,
  INVOCATION_REQUESTRESPONSE,
} from './Event';

import { handleOutgoingEvent } from './EventHandler';

/**
 * @type {string}
 */
export const EVENT_TITLE_CHANGED = 'app.title_changed';

/**
 * @type {string}
 */
export const EVENT_SUBSCRIBE = 'app.subscribe_to_event';

/**
 * @type {string}
 */
export const EVENT_BADGE = 'app.badge';

/**
 * @enum
 * @readonly
 * @type {{EVENT_TITLE_CHANGED: string, EVENT_BADGE: {channelType: string, invocationType: string}, EVENT_SUBSCRIBE: {channelType: string, invocationType: string}}}
 */
export const props = {

  EVENT_TITLE_CHANGED,

  EVENT_BADGE: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_FIREANDFORGET,
  },

  EVENT_SUBSCRIBE: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
};

const eventNames = {
  EVENT_TITLE_CHANGED,
  EVENT_BADGE,
  EVENT_SUBSCRIBE
};


/**
 * @param {string} eventName
 * @return {{ channelType: string, invocationType:string }|null}
 */
export function getDefinition(eventName)
{
  for (const key of Object.keys(eventNames)) {
    if (eventNames[key] === eventName) {
      return props[key];
    }
  }

  return null;
}


/**
 * @method
 *
 * @param {string} name
 * @return {boolean}
 */
export const isEventName = name => Object.keys(eventNames).map(key => events[key]).indexOf(name) !== -1;

/**
 * Registers
 *
 * @function
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(
    windowBridge,
    app,
    EVENT_SUBSCRIBE,
    props.EVENT_SUBSCRIBE,
  );
  handleOutgoingEvent(windowBridge, app, EVENT_BADGE, props.EVENT_BADGE);
};
