import { propertyProviderTab } from '../../../src/Context/properties';
import ContextProps from '../../../src/Core/ContextProps';
import AppEventEmitter from '../../../src/Core/AppEventEmitter';

test('propertyProviderTab rejects with error if tabId not passed via Context', () => {
  const outgoingDispatcher = new AppEventEmitter();
  const contextProps = new ContextProps({});

  return propertyProviderTab(outgoingDispatcher, contextProps)('data.me').catch(
    e => {
      expect(e instanceof Error).toEqual(true);
      expect(e.message).toEqual(
        'missing tab id from context, property fetching will not work',
      );
    },
  );
});
