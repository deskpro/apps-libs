/**
 * Defines events and related functionality which handle the security aspects of the application
 *
 * @module Security/events
 */

import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event';

export const EVENT_SECURITY_AUTHENTICATE_OAUTH = 'security.authenticate.oauth';

export const EVENT_SECURITY_SETTINGS_OAUTH = 'security.settings.oauth';

export const EVENT_SECURITY_OAUTH_REFRESH = 'security.oauth.refresh';

/**
 * @readonly
 * @enum
 * @type {{EVENT_SECURITY_AUTHENTICATE_OAUTH: {channelType: string, invocationType: string}, EVENT_SECURITY_OAUTH_REFRESH: {channelType: string, invocationType: string}, EVENT_SECURITY_SETTINGS_OAUTH: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_SECURITY_AUTHENTICATE_OAUTH: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
  EVENT_SECURITY_OAUTH_REFRESH: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
  EVENT_SECURITY_SETTINGS_OAUTH: {
    channelType: CHANNEL_OUTGOING,
    invocationType: INVOCATION_REQUESTRESPONSE,
  },
};


const eventNames = {
  EVENT_SECURITY_AUTHENTICATE_OAUTH,
  EVENT_SECURITY_SETTINGS_OAUTH,
  EVENT_SECURITY_OAUTH_REFRESH,
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
