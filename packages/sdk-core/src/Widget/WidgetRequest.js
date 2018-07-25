import WidgetMessage from './WidgetMessage';
import { nextMessageId, nextCorrelationId } from './messageId';

/**
 * Representation of a request message
 *
 * @class
 * @extends {WidgetMessage}
 */
class WidgetRequest extends WidgetMessage {
  /**
   * Creates a new request
   *
   * @static
   * @method
   *
   * @param {string} widgetId
   * @param {*} payload
   * @return {WidgetRequest}
   */
  static nextRequest(widgetId, payload) {
    const correlationId = nextCorrelationId();
    const id = nextMessageId();

    return new WidgetRequest({
      id: id.toString(),
      widgetId,
      correlationId: correlationId.toString(),
      body: payload,
    });
  }

  /**
   * Parse an object literal or a JSON encoded string into a {@link WidgetResponse}
   * @method
   *
   * @param {{}|string} raw
   * @return {WidgetRequest}
   */
  static parse(raw) {
    const { id, widgetId, correlationId, body } = raw;
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    return new WidgetRequest({
      id,
      widgetId,
      correlationId: correlationId.toString(),
      body: parsedBody,
    });
  }

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
