import { propertyProviderTab } from '../../../src/Context/properties';
import ContextProps from '../../../src/Core/ContextProps';
import AppEventEmitter from '../../../src/Core/AppEventEmitter';

test('propertyProviderTab throws error if missing tabId', () => {
  const outgoingDispatcher = new AppEventEmitter();
  const contextProps = new ContextProps({});

  expect(() => propertyProviderTab(outgoingDispatcher, contextProps)).toThrow();
});
