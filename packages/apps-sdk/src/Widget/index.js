/**
 * This module exports the interface of the Widget package
 * @module Widget
 */

import WidgetWindowBridge from './WidgetWindowBridge';
import WidgetRequest from './WidgetRequest';
import WidgetResponse from './WidgetResponse';
import { createMockWindowBridge, createDefaultWindowBridge, createWindowBridge, parseWidgetMessage } from './factories'

export {
  /**
   * @type {WidgetWindowBridge}
   */
  WidgetWindowBridge,
  /**
   * @type {WidgetRequest}
   */
  WidgetRequest,
  /**
   * @type {WidgetResponse}
   */
  WidgetResponse,

  createMockWindowBridge,

  createDefaultWindowBridge,

  createWindowBridge,

  parseWidgetMessage
};
