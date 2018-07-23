import AppClient from '../../../src/Core/AppClient';
import AppEventEmitter from '../../../src/Core/AppEventEmitter';
import ContextProps from '../../../src/Core/ContextProps';
import InstanceProps from '../../../src/Core/InstanceProps';
import WidgetWindowBridge from '../../../src/Widget/WidgetWindowBridge';
import InitPropertiesBag from '../../../src/Widget/InitPropertiesBag';

test('successfully create an application', done => {
  const params = {
    outgoingDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    internalDispatcher: new AppEventEmitter(),
    instanceProps: new InstanceProps({
      appId: '1',
      appTitle: 'title',
      appPackageName: 'com.deskpro.app',
      instanceId: '1',
    }),
    contextProps: new ContextProps({
      type: 'ticket',
      entityId: '1',
      locationId: '1',
      tabId: 'tab-1',
      tabUrl: 'https://127.0.0.1',
    }),
    appWindow: new WidgetWindowBridge(
      {
        addEventListener: () => ({}),
        document: { readyState: 'ready' },
      },
      new InitPropertiesBag({ dpXconfTag: '' }),
    ),
  };

  const app = new AppClient(params);

  expect(app).toBeTruthy();
  done();
});

test('retrieve properties', done => {
  const experimental = {
    instanceExperimentalOne: 'instanceExperimentalOne',
    instanceExperimentalTwo: 'instanceExperimentalTwo',
    contextExperimentalThree: 3,
  };

  const instanceProps = new InstanceProps({
    appId: '1',
    appTitle: 'title',
    appPackageName: 'com.deskpro.app',
    instanceId: '1',

    instanceExperimentalOne: experimental.instanceExperimentalOne,
    instanceExperimentalTwo: experimental.instanceExperimentalTwo,
  });

  const contextProps = new ContextProps({
    type: 'ticket',
    entityId: '1',
    locationId: '1',
    tabId: 'tab-1',
    tabUrl: 'https://127.0.0.1',

    contextExperimentalThree: experimental.contextExperimentalThree,
  });

  const params = {
    outgoingDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    internalDispatcher: new AppEventEmitter(),
    instanceProps,
    contextProps,
    appWindow: new WidgetWindowBridge(
      {
        addEventListener: () => ({}),
        document: { readyState: 'ready' },
      },
      new InitPropertiesBag({ dpXconfTag: '' }),
    ),
  };

  const app = new AppClient(params);

  expect(app.getProperty('appId')).toEqual('1');
  expect(app.getProperty('contextType')).toEqual('ticket');
  expect(app.getProperty('contextType')).toEqual(
    app.context.get('ticket').type,
  );
  expect(app.getProperty('tabUrl')).toEqual('https://127.0.0.1');
  expect(app.getProperty('instanceExperimentalTwo')).toEqual(
    experimental.instanceExperimentalTwo,
  );

  done();
});

test('retrieve property', done => {
  const experimental = {
    instanceExperimentalOne: 'instanceExperimentalOne',
    instanceExperimentalTwo: 'instanceExperimentalTwo',
    contextExperimentalThree: 3,
  };

  const instanceProps = new InstanceProps({
    appId: '1',
    appTitle: 'title',
    appPackageName: 'com.deskpro.app',
    instanceId: '1',

    instanceExperimentalOne: experimental.instanceExperimentalOne,
    instanceExperimentalTwo: experimental.instanceExperimentalTwo,
  });

  const contextProps = new ContextProps({
    type: 'ticket',
    entityId: '1',
    locationId: '1',
    tabId: 'tab-1',
    tabUrl: 'https://127.0.0.1',

    contextExperimentalThree: experimental.contextExperimentalThree,
  });

  const params = {
    outgoingDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    internalDispatcher: new AppEventEmitter(),
    instanceProps,
    contextProps,
    appWindow: new WidgetWindowBridge(
      {
        addEventListener: () => ({}),
        document: { readyState: 'ready' },
      },
      new InitPropertiesBag({ dpXconfTag: '' }),
    ),
  };

  const app = new AppClient(params);

  expect(app.properties).toEqual(
    Object.assign({}, instanceProps.toJS(), contextProps.toJS()),
  );
  done();
});
