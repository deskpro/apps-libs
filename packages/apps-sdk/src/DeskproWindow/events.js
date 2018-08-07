/**
 * Defines events and related functionality which enable interaction with the helpdesk Window and DOM
 *
 * The events defined in this module give the application the following capabilities:
 *
 *  - insert arbitrary DOM nodes into the helpdesk window
 *  - query the DOM of the helpdesk window
 *  - show a notification in the helpdesk window
 *
 * @module DeskproWindow/events
 */

import {
  CHANNEL_OUTGOING,
  INVOCATION_FIREANDFORGET,
  INVOCATION_REQUESTRESPONSE,
} from '../Core/Event';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_SHOW_NOTIFICATION = 'deskpro_window.show_notification';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_DOM_INSERT = 'deskpro_window.dom_insert';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_DOM_QUERY = 'deskpro_window.dom_query';

/**
 * @readonly
 * @enum
 * @type {{EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_INSERT: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_QUERY: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_FIREANDFORGET,
  },
  EVENT_DESKPROWINDOW_DOM_INSERT: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
  EVENT_DESKPROWINDOW_DOM_QUERY: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
};

const eventNames = {
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION,
  EVENT_DESKPROWINDOW_DOM_INSERT,
  EVENT_DESKPROWINDOW_DOM_QUERY,
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
