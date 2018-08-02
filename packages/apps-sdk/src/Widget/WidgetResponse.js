import WidgetMessage from './WidgetMessage';

/**
 * Representation of a response message
 *
 * @class
 * @extends {WidgetMessage}
 */
class WidgetResponse extends WidgetMessage {

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
