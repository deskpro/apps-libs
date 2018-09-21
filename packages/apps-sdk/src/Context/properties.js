import * as ObjectEvents from './eventsObject';

/**
 * @param {AppEventEmitter}  outgoingDispatcher
 * @param {ContextProps} contextProps
 * @return {Function}
 */
export function propertyProviderTab(outgoingDispatcher, contextProps) {
  const { tabId } = contextProps;

  if (tabId) {
    return function(props) {
      const eventProps = { ...props, tabId };
      return outgoingDispatcher.emitAsync(
        ObjectEvents.EVENT_CONTEXT_PROPERTY_GET,
        eventProps,
      );
    };
  }

  console.warn('missing tab id from context, property fetching will not work');
  return function(props) {
    return Promise.reject(
      new Error('missing tab id from context, property fetching will not work'),
    );
  };
}
