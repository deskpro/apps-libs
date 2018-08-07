/**
 * Defines events and event related functionality which are closely related to an application's context
 *
 * @module Core/ContextUserEvents
 */

import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from './Event';
import { handleOutgoingEvent } from './EventHandler';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_ME_GET = 'context.me_get';

/**
 * @enum
 * @readonly
 * @type {{EVENT_ME_GET: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_ME_GET: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
};

const eventNames = {
  EVENT_ME_GET
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
 * @method
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, EVENT_ME_GET, props.EVENT_ME_GET);
};
