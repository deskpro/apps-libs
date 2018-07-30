/**
 * @module UI/events
 */

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
