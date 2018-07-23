/**
 * This module export constants and utilities functions that apply to Event objects
 *
 * @module Core/Event
 */

import EventMap from './EventMap';

/**
 * @type {string}
 */
export const CHANNEL_INTERNAL = 'event.channel_internal';

/**
 * @type {string}
 */
export const CHANNEL_INCOMING = 'event.channel_incoming';

/**
 * @type {string}
 */
export const CHANNEL_OUTGOING = 'event.channel_outgoing';

/**
 * The list of event channels
 *
 * @enum
 * @type {{CHANNEL_INCOMING: string, CHANNEL_INTERNAL: string, CHANNEL_OUTGOING: string}}
 */
export const channels = {
  CHANNEL_INCOMING,
  CHANNEL_INTERNAL,
  CHANNEL_OUTGOING,
};

/**
 * @type {string}
 */
export const INVOCATION_FIREANDFORGET = 'event.invocation_fireandforget';

/**
 * @type {string}
 */
export const INVOCATION_REQUESTRESPONSE = 'event.invocation_requestresponse';

/**
 * @enum
 * @type {{INVOCATION_FIREANDFORGET: string, INVOCATION_REQUESTRESPONSE: string}}
 */
export const invocations = {
  INVOCATION_FIREANDFORGET,
  INVOCATION_REQUESTRESPONSE,
};

/**
 * Builds an event map from an object literal description where keys are event keys and values are event names
 *
 * @method
 *
 * @param {Object} events
 * @param {Object} eventProps
 * @return {EventMap}
 */
export const buildMap = (events, eventProps) => {
  const names = Object.keys(events).map(key => events[key]);

  const map = {};
  Object.keys(events).forEach(key => {
    const value = events[key];
    map[key] = value;
    map[value] = key;
  });

  return new EventMap({ map, names, props: eventProps });
};

/**
 * @method
 *
 * @param {String} eventName
 * @param {Object} propsPattern
 * @param {EventMap} eventMap
 * @return {boolean}
 */
export const matchEvent = (eventName, propsPattern, eventMap) => {
  if (!eventMap.isEventName(eventName)) {
    return false;
  }

  if (!propsPattern) {
    return true;
  }

  const actualProps = eventMap.getEventProps(eventName);
  return matchProps(actualProps, propsPattern);
};

/**
 * @param {{}} props
 * @return {boolean}
 */
export const isInvocation = props => {
  if (!props || typeof props !== 'object') {
    return false;
  }

  const { event } = props;
  if (typeof event !== 'string') {
    return false;
  }

  const { invocationType } = props;
  return (
    -1 !==
    Object.keys(invocations)
      .reduce((acc, key) => acc.concat(invocations[key]), [])
      .indexOf(invocationType)
  );
};

/**
 *
 * @param {*} actualProps
 * @param {String} channelType
 * @param {String} invocationType
 * @return {boolean}
 */
const matchProps = (actualProps, { channelType, invocationType }) => {
  if (!actualProps) {
    return !channelType && !invocationType;
  }

  if (!channelType && !invocationType) {
    return false;
  }
  if (channelType && actualProps.channelType !== channelType) {
    return false;
  }
  if (invocationType && actualProps.invocationType !== invocationType) {
    return false;
  }

  return true;
};

/**
 * @class Event
 */
class Event {
  /**
   * @param {String} name event name
   * @param {Array} args event arguments
   */
  constructor({ name, args }) {
    this.props = { name, enabled: true, args };
  }

  /**
   * @readonly
   * @type {Array}
   */
  get args() {
    return JSON.parse(JSON.stringify(this.props.args));
  }

  /**
   * @ignore
   * @type {boolean}
   */
  set enabled(flag) {
    this.props.enabled = flag;
  }

  /**
   * @public
   * @type {boolean}
   */
  get enabled() {
    return this.props.enabled;
  }
}

export { Event };
