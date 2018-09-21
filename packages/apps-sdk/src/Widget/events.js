/**
 * @module Widget/events
 */

import { CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET } from '../Core/Event';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_WINDOW_MOUSEEVENT = 'window.mouseevent';

/**
 * @todo Should be named 'window.window-resize' when this event will be handled by the container
 * @readonly
 * @type {string}
 */
export const EVENT_WINDOW_RESIZE = 'app.reset_size';

/**
 * @enum
 * @readonly
 * @type {{EVENT_WINDOW_MOUSEEVENT: {channelType: string, invocationType: string}, EVENT_WINDOW_RESIZE: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_WINDOW_MOUSEEVENT: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_FIREANDFORGET,
  },

  EVENT_WINDOW_RESIZE: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_FIREANDFORGET,
  },
};

const eventNames = {
  EVENT_WINDOW_MOUSEEVENT,
  EVENT_WINDOW_RESIZE,
};

/**
 * @param {string} eventName
 * @return {{ channelType: string, invocationType:string }|null}
 */
export function getDefinition(eventName) {
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
export const isEventName = name =>
  Object.keys(eventNames)
    .map(key => events[key])
    .indexOf(name) !== -1;
