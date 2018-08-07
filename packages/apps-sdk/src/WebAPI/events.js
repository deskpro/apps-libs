/**
 * WebAPI module.
 * @module WebAPI/events
 */

import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event';

export const EVENT_WEBAPI_REQUEST_DESKPRO = 'webapi.request.deskpro';
export const EVENT_WEBAPI_REQUEST_FETCH = 'webapi.request.fetch';

/**
 * @enum
 * @readonly
 *
 * @type {{EVENT_WEBAPI_REQUEST_DESKPRO: {channelType, invocationType}, EVENT_WEBAPI_REQUEST_FETCH: {channelType, invocationType}}}
 */
export const props = {
  EVENT_WEBAPI_REQUEST_DESKPRO: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
  EVENT_WEBAPI_REQUEST_FETCH: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
};

const eventNames = {
  EVENT_WEBAPI_REQUEST_DESKPRO,
  EVENT_WEBAPI_REQUEST_FETCH
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
