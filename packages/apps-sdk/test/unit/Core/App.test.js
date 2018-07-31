import AppClient from '../../../src/Core/AppClient';
import { createAppFromProps } from '../../../src/Core/create';
import AppEventEmitter from "../../../src/Core/AppEventEmitter";

test('successfully create an application with default params', done => {

  const app = createAppFromProps({
    registerEventHandlers: function() {},
    localDispatcher:    new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    outgoingDispatcher: new AppEventEmitter(),
    instanceProps: {
      appId: '1',
      appTitle: 'title',
      appPackageName: 'com.deskpro.app',
      instanceId: '1',
    },
    contextProps: {
      type: 'ticket',
      entityId: '1',
      locationId: '1',
      tabId: 'tab-1',
      tabUrl: 'https://127.0.0.1',
    }
  });


  expect(app instanceof AppClient).toBeTruthy();
  done();
});

test('retrieve properties', done => {
  const experimental = {
    instanceExperimentalOne: 'instanceExperimentalOne',
    instanceExperimentalTwo: 'instanceExperimentalTwo',
    contextExperimentalThree: 3,
  };

  const app = createAppFromProps({
      registerEventHandlers: function () {},
      localDispatcher:    new AppEventEmitter(),
      incomingDispatcher: new AppEventEmitter(),
      outgoingDispatcher: new AppEventEmitter(),
      instanceProps: {
        appId: '1',
        appTitle: 'title',
        appPackageName: 'com.deskpro.app',
        instanceId: '1',

        instanceExperimentalOne: experimental.instanceExperimentalOne,
        instanceExperimentalTwo: experimental.instanceExperimentalTwo
      },
      contextProps: {
        type: 'ticket',
        entityId: '1',
        locationId: '1',
        tabId: 'tab-1',
        tabUrl: 'https://127.0.0.1',

        contextExperimentalThree: experimental.contextExperimentalThree
      }
    }
  );

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

test('retrieve all application properties', done => {
  const experimental = {
    instanceExperimentalOne: 'instanceExperimentalOne',
    instanceExperimentalTwo: 'instanceExperimentalTwo',
    contextExperimentalThree: 3,
  };

  const instanceProps = {
    appId:          '1',
    appTitle:       'title',
    appPackageName: 'com.deskpro.app',
    instanceId:     '1',

    instanceExperimentalOne: experimental.instanceExperimentalOne,
    instanceExperimentalTwo: experimental.instanceExperimentalTwo
  };

  const contextProps = {
    type:       'ticket',
    entityId:   '1',
    locationId: '1',
    tabId:      'tab-1',
    tabUrl:     'https://127.0.0.1',

    contextExperimentalThree: experimental.contextExperimentalThree
  };

  const app = createAppFromProps({
    registerEventHandlers: function() {},
    localDispatcher:    new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    outgoingDispatcher: new AppEventEmitter(),
    instanceProps,
    contextProps
  });

  const { type: contextType, ...expectedContextProps } = contextProps;

  expect(app.properties).toEqual(
    Object.assign({}, instanceProps, { contextType, ...expectedContextProps }),
  );
  done();
});
