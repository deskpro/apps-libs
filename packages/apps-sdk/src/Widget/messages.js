import WidgetResponse from "./WidgetResponse";
import WidgetRequest from "./WidgetRequest";

const ids = {
  messageId: 0,
  correlationId: 0
};

const nextMessageId = () => {
  const id =  ++ids.messageId;
  return id.toString()
};

const nextCorrelationId = () => {
   const id = ++ids.correlationId;
   return id.toString()
};

/**
 * Creates the response message for a request
 *
 * @param {WidgetRequest} request the initial request
 * @param {*} body response body
 * @param {boolean} isError true when the response is an error response
 * @return {WidgetResponse}
 */
export function nextResponse(request, body, isError) {
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
    id,
    widgetId,
    correlationId: correlationId.toString(),
    body,
    status,
  });
}

/**
 * Parse an object literal or a JSON encoded string into a {@link WidgetResponse}
 *
 * @param {{}|string} raw
 * @return {WidgetResponse}
 */
export function parseResponse(raw) {
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
 * Creates a new request
 *
 * @param {string} widgetId
 * @param {*} payload
 * @return {WidgetRequest}
 */
export function nextRequest(widgetId, payload) {
  const correlationId = nextCorrelationId();
  const id = nextMessageId();

  return new WidgetRequest({
    id,
    widgetId,
    correlationId,
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
export function parseRequest(raw) {
  const { id, widgetId, correlationId, body } = raw;
  const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
  return new WidgetRequest({
    id,
    widgetId,
    correlationId: correlationId.toString(),
    body: parsedBody,
  });
}
