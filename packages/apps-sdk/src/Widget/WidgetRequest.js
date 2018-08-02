import WidgetMessage from './WidgetMessage';

/**
 * Representation of a request message
 *
 * @class
 * @extends {WidgetMessage}
 */
class WidgetRequest extends WidgetMessage {

  /**
   * @param {String} id the message id
   * @param {String} widgetId the widget it
   * @param {String} correlationId the conversation id
   * @param {*} body the message body
   */
  constructor({ id, widgetId, correlationId, body }) {
    super({ id, widgetId, correlationId, body });
  }
}

export default WidgetRequest;
