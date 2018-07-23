/**
 * Defines events and related functionality which handle the security aspects of the application
 *
 * @module Security/events
 */

import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event';

export const EVENT_SECURITY_AUTHENTICATE_OAUTH = 'security.authenticate.oauth';

export const EVENT_SECURITY_SETTINGS_OAUTH = 'security.settings.oauth';

export const EVENT_SECURITY_OAUTH_REFRESH = 'security.oauth.refresh';

const events = {
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

/**
 * @readonly
 * @enum
 * @type {{EVENT_SECURITY_AUTHENTICATE_OAUTH: {channelType: string, invocationType: string}, EVENT_SECURITY_OAUTH_REFRESH: {channelType: string, invocationType: string}, EVENT_SECURITY_SETTINGS_OAUTH: {channelType: string, invocationType: string}}}
 */
export const props = events;

/**
 * @readonly
 * @type {Array}
 */
export const eventNames = Object.keys(events).map(key => events[key]);

/**
 * @method
 * @param {String} name
 * @return {boolean}
 */
export const isEventName = name => eventNames.indexOf(name) !== -1;
