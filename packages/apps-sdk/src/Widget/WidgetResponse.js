import WidgetMessage from './WidgetMessage';
import { nextMessageId } from './messageId';

/**
 * Representation of a response message
 *
 * @class
 * @extends {WidgetMessage}
 */
class WidgetResponse extends WidgetMessage {
  /**
   * Creates the response message for a request
   *
   * @static
   * @method
   *
   * @param {WidgetRequest} request the initial request
   * @param {*} body response body
   * @param {boolean} isError true when the response is an error response
   * @return {WidgetResponse}
   */
  static nextResponse(request, body, isError) {
    const id = nextMessageId();
    const {
      /**
       * @ignore
       *
       * @type {string}
       * */
      widgetId,
      correlationId,
    } = request;
    const status = isError ? 'error' : 'success';

    //const parsedBody = body === null ? body : JSON.stringify(body);
    return new WidgetResponse({
      id: id.toString(),
      widgetId,
      correlationId: correlationId.toString(),
      body,
      status,
    });
  }

  /**
   * Parse an object literal or a JSON encoded string into a {@link WidgetResponse}
   *
   * @static
   * @method
   *
   * @param {{}|string} raw
   * @return {WidgetResponse}
   */
  static parse(raw) {
    const { id, widgetId, correlationId, body, status } = raw;
    // still receiving json encoded strings as body from success responses
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    return new WidgetResponse({
      id,
      widgetId,
      correlationId: correlationId.toString(),
      body: parsedBody,
      status,
    });
  }

  /**
   * @param {String} id the message id
   * @param {String} widgetId the widget it
   * @param {String} correlationId the conversation id
   * @param {*} body the message body
   * @param {String} status the response status
   */
  constructor({ id, widgetId, correlationId, body, status }) {
    super({ id, widgetId, correlationId, body, status });
  }

  /**
   * @readonly
   *
   * @type {String}
   */
  get status() {
    return this.props.status;
  }

  /**
   * @readonly
   *
   * @type {*}
   */
  get rawBody() {
    return this.props.body;
  }

  /**
   * @readonly
   *
   * @type {*}
   */
  get body() {
    return this.props.body;
  }
}

export default WidgetResponse;
