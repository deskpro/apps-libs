/**
 * @module UI/events
 */

import { CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET } from "../Core/Event";

/**
 *
 *
 * @type {string}
 */
export const EVENT_UI_CHANGED = 'ui.changed';

const eventNames = {
  EVENT_UI_CHANGED
};

/**
 * @readonly
 * @enum {string}
 * @type {{EVENT_UI_CHANGED: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_UI_CHANGED: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_FIREANDFORGET,
  },
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
