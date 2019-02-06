import { createContext, ContextFactory } from '../../../src/Context';
import Context from '../../../src/Core/Context';

import AppEventEmitter from '../../../src/Core/AppEventEmitter';
import ContextProps from '../../../src/Core/ContextProps';
import InstanceProps from '../../../src/Core/InstanceProps';

test('can create a default context', done => {
  const contextType = 'rogue-context';
  expect(ContextFactory.contextObjectTypes.indexOf(contextType)).toBe(-1);

  const outgoingDispatcher = new AppEventEmitter();
  const incomingDispatcher = new AppEventEmitter();
  const instanceProps = new InstanceProps({
    appId: '1',
    appTitle: 'title',
    appPackageName: 'com.deskpro.app',
    instanceId: '1',
    locale: 'en',
  });
  const contextProps = new ContextProps({
    type: contextType,
    entityId: '1',
    locationId: 'install',
    manifest: { field: 'value' },
    tabId: 1,
    tabUrl: 'http://localhost',
  });

  const context = createContext(
    outgoingDispatcher,
    incomingDispatcher,
    instanceProps,
    contextProps,
  );
  expect(context instanceof Context).toBe(true);
  expect(context.hasProperty('manifest')).toBe(true);
  expect(context.getProperty('manifest')).toEqual({ field: 'value' });

  done();
});
