/**
 * Handles the delivery of outgoing events (those originating in the application) and the receipt of incoming events
 * (those originating in a 3rd party, like the help desk application)
 *
 * @module Core/EventHandler
 */

import {
  MessageBus,
  IncomingEventDispatcher,
  OutgoingEventDispatcher,
} from './emit';
import WidgetFactories from '../Widget/WidgetFactories';
import WidgetRequest from '../Widget/WidgetRequest';
import WidgetResponse from '../Widget/WidgetResponse';
import {
  INVOCATION_REQUESTRESPONSE,
  INVOCATION_FIREANDFORGET,
  CHANNEL_INCOMING,
  CHANNEL_OUTGOING,
} from './Event';

/**
 * @TODO this should form the basic for the driver for WidgetWindowBridge
 * @internal
 */
class EventHandler {
  /**
   * @param {WidgetWindowBridge} windowBridge
   * @param {function} resolve
   * @param {function} reject
   * @param {string} event
   * @param {*} data
   * @param {string} invocationType
   */
  static handleOutgoingEvent(
    windowBridge,
    resolve,
    reject,
    { event, invocationType, data },
  ) {
    if (invocationType === INVOCATION_REQUESTRESPONSE) {
      windowBridge
        .emitRequest(event, data)
        .then(({ request, emit }) => {
          // resolve the promise when response comes
          const responseExecutor = response =>
            response.status === 'success'
              ? resolve(response.body)
              : reject(response.body);
          MessageBus.once(request.correlationId, responseExecutor);
          return { request, emit };
        })
        .then(({ emit }) => emit()); // finally after registering a response listener send the request
    } else if (invocationType === INVOCATION_FIREANDFORGET) {
      windowBridge
        .emitRequest(event, data)
        .then(({ emit }) => emit())
        .then(() => resolve(data));
    }
  }

  /**
   * @param {WidgetWindowBridge} windowBridge
   * @param {string} event
   * @param {string} invocationType
   * @param {WidgetRequest} request
   */
  static handleIncomingEvent(windowBridge, { event, invocationType }, request) {
    if (invocationType === INVOCATION_REQUESTRESPONSE) {
      const cb = (error, data) => {
        windowBridge
          .emitResponse(event, error, data, request)
          .then(({ response, emit }) => emit());
      };

      IncomingEventDispatcher.emit(event, cb, request.body);
    } else if (invocationType === INVOCATION_FIREANDFORGET) {
      IncomingEventDispatcher.emit(event, request.body);
    } else {
      throw new Error('can not handle incoming event: unknown invocation type');
    }
  }
}

/**
 * @param {WidgetWindowBridge} windowBridge
 * @param {String} eventName
 * @param {Object} eventProps
 * @param {{ data:* }} event
 */
const dispatchIncomingEvent = (windowBridge, eventName, eventProps, event) => {
  const { data: rawMessage } = event;

  const message = WidgetFactories.parseMessageFromJS(rawMessage);
  if (
    message instanceof WidgetRequest &&
    eventProps.invocationType === INVOCATION_REQUESTRESPONSE
  ) {
    MessageBus.emit(eventName, message);
    return;
  }

  if (
    message instanceof WidgetRequest &&
    eventProps.invocationType === INVOCATION_FIREANDFORGET
  ) {
    MessageBus.emit(eventName, message);
    return;
  }

  if (
    message instanceof WidgetResponse &&
    eventProps.invocationType === INVOCATION_REQUESTRESPONSE
  ) {
    MessageBus.emit(message.correlationId, message);
    return;
  }
};

/**
 * Registers an outgoing event listener
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export const handleInvokeEvents = (windowBridge, app) => {
  OutgoingEventDispatcher.onInvoke(
    EventHandler.handleOutgoingEvent.bind(null, windowBridge),
  );
};

/**
 * Handles an incoming or outgoing event
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 * @param {String} eventName
 * @param {{invocationType:String}} eventProps
 * @return null
 */
export function handleAppEvents(windowBridge, app, eventName, eventProps) {
  const { channelType } = eventProps;
  if (channelType === CHANNEL_INCOMING) {
    handleIncomingEvent(windowBridge, app, eventName, eventProps);
  } else if (channelType === CHANNEL_OUTGOING) {
    handleOutgoingEvent(windowBridge, app, eventName, eventProps);
  } else {
    throw new Error('unknown event channel');
  }
}

/**
 * Handles an incoming event
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 * @param {String} eventName
 * @param {Object} eventProps
 * @return null
 */
export const handleIncomingEvent = (
  windowBridge,
  app,
  eventName,
  eventProps,
) => {
  const { invocationType, ...otherProps } = eventProps;

  if (
    -1 !==
    [INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE].indexOf(
      invocationType,
    )
  ) {
    const invocation = { event: eventName, invocationType, ...otherProps };
    MessageBus.on(
      eventName,
      EventHandler.handleIncomingEvent.bind(null, windowBridge, invocation),
    );
    windowBridge.on(
      eventName,
      dispatchIncomingEvent.bind(null, windowBridge, eventName, eventProps),
    );
  } else {
    throw new Error('unknown invocation type');
  }
};

/**
 * Handles an outgoing event
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 * @param {string} eventName
 * @param {{invocationType:String, ...other}} eventProps
 */
export const handleOutgoingEvent = (
  windowBridge,
  app,
  eventName,
  eventProps,
) => {
  const { invocationType, ...otherProps } = eventProps;

  if (
    -1 !==
    [INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE].indexOf(
      invocationType,
    )
  ) {
    const handler = (resolve, reject, data) =>
      EventHandler.handleOutgoingEvent(windowBridge, resolve, reject, {
        event: eventName,
        data,
        invocationType,
        ...otherProps,
      });

    OutgoingEventDispatcher.on(eventName, handler);
    windowBridge.on(
      eventName,
      dispatchIncomingEvent.bind(null, windowBridge, eventName, eventProps),
    );
  } else {
    throw new Error('unknown invocation type');
  }
};
