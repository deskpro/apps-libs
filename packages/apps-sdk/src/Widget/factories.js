import InitPropertiesBag from './InitPropertiesBag';
import WidgetWindowBridge from './WidgetWindowBridge';
import { parseResponse, parseRequest } from './messages';
import * as propLoaders from './propLoaders';

/**
 * @return {WidgetWindowBridge}
 */
export function createDefaultWindowBridge() {
  if (window) {
    return createWindowBridge(window);
  }

  throw new Error('could not find a global window object');
}

/**
 * Creates a fake bridge for use in a test env
 *
 * @param {Window} windowObject
 * @param options
 * @return {WidgetWindowBridge}
 */
export function createMockWindowBridge(windowObject, options = {}) {
  return new WidgetWindowBridge(
    windowObject,
    {
      ...options,
      widgetId: options.widgetId || 'MOCK',
      dpWidgetId: options.dpWidgetId || 'MOCK',
    },
    propLoaders
  );
}
/**
 * @param {Window} windowObject
 * @return {WidgetWindowBridge}
 */
export function createWindowBridge(windowObject) {
  const initProps = InitPropertiesBag.fromWindow(windowObject);
  if (InitPropertiesBag.validate(initProps)) {
    return new WidgetWindowBridge(windowObject, initProps, propLoaders);
  }

  throw new Error('invalid or missing init properties');
}

/**
 * Parse an object literal or a JSON encoded string into a {@link WidgetResponse} or a {@link WidgetRequest}
 *
 * @param {{}|string} raw
 * @return {WidgetMessage}
 */
export function parseWidgetMessage(raw) {
  const { status } = raw;
  const parser = status ? parseResponse : parseRequest;
  return parser(raw);
}
