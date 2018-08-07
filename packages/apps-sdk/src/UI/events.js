/**
 * @module UI/events
 */

import {props} from "../Context/eventsObject";

/**
 * @type {string}
 */
export const EVENT_UI_CHANGED = 'ui.changed';

/**
 * @readonly
 * @enum {string}
 * @type {{EVENT_UI_CHANGED: string}}
 */
export const events = {
  EVENT_UI_CHANGED
};

const eventNames = {
  EVENT_UI_CHANGED
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
