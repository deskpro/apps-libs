/**
 * This module exports events available when the application is hosted by a UI Tab component
 *
 * @module Context/eventsTicket
 */

import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_STATUS = 'context.tab_status';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_DATA = 'context.tab_data';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_ACTIVATE = 'context.tab_activate';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_CLOSE = 'context.tab_close';

/**
 * @enum
 * @readonly
 * @type {{EVENT_ME_GET: {channelType: string, invocationType: string}, EVENT_TAB_DATA: {channelType: string, invocationType: string}, EVENT_TAB_ACTIVATE: {channelType: string, invocationType: string}, EVENT_TAB_CLOSE: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_TAB_DATA: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },

  EVENT_TAB_ACTIVATE: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },

  EVENT_TAB_CLOSE: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
};

const eventNames = {
  EVENT_TAB_DATA,
  EVENT_TAB_ACTIVATE,
  EVENT_TAB_CLOSE,
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
