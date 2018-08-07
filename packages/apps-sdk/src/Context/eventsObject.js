/**
 * This module exports events available when the application is hosted by a UI Tab component
 *
 * @module Context/eventsTicket
 */

import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event';

/**
 * Fetch a property of a context object
 *
 * @readonly
 * @type {string}
 */
export const EVENT_CONTEXT_PROPERTY_GET = 'context.property.get';

/**
 * @enum
 * @readonly
 * @type {{EVENT_CONTEXT_PROPERTY_GET: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_CONTEXT_PROPERTY_GET: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
};

const eventNames = { EVENT_CONTEXT_PROPERTY_GET };


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
