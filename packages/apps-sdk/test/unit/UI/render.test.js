import { createRenderer, createAppFromProps } from '../../../src/Core/create';
import * as Constants from '../../../src/UI/constants';
import * as Events from '../../../src/UI/events';
import connectRenderer from '../../../src/UI/render';
import AppEventEmitter from '../../../src/Core/AppEventEmitter';

const outgoingDispatcher = new AppEventEmitter();
outgoingDispatcher.addListener(
  Events.EVENT_UI_CHANGED,
  (resolve, reject, data) => {
    resolve(data);
  },
);

test('connectRenderer connects a renderer function', () => {
  const app = createAppFromProps({
    registerEventHandlers: function() {},
    localDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    outgoingDispatcher,

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
    },
  });

  const render = jest.fn();
  const renderFactory = dpapp => render;
  const connectedRenderer = connectRenderer(app, renderFactory);

  expect(typeof connectedRenderer).toEqual('function');

  // trigger an update
  app.ui.badgeCount = 1;

  expect(render.mock.calls[0][0]).toHaveProperty('badgeCount', 1);
  expect(render.mock.calls[0][0]).toHaveProperty(
    'badgeVisibility',
    Constants.VISIBILITY_HIDDEN,
  );
  expect(render.mock.calls[0][0]).toHaveProperty(
    'display',
    Constants.DISPLAY_EXPANDED,
  );
  expect(render.mock.calls[0][0]).toHaveProperty('title', 'title');
  expect(render.mock.calls[0][0]).toHaveProperty('iconUrl', 'assets/icon.png');
  expect(render.mock.calls[0][0]).toHaveProperty('notification', null);
  expect(render.mock.calls[0][0]).toHaveProperty('notificationType', null);
  expect(render.mock.calls[0][0]).toHaveProperty(
    'state',
    Constants.STATE_READY,
  );

  expect(render.mock.calls[0][0]).toHaveProperty('refresh', app.refresh);
  expect(render.mock.calls[0][0]).toHaveProperty('collapse', app.ui.collapse);
  expect(render.mock.calls[0][0]).toHaveProperty('expand', app.ui.expand);
  expect(render.mock.calls[0][0]).toHaveProperty(
    'closeNotification',
    app.ui.closeNotification,
  );
});

test('render function gets invoked with the correct app title', () => {
  const app = createAppFromProps({
    registerEventHandlers: function() {},
    localDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    outgoingDispatcher,

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
    },
  });

  const render = jest.fn();
  const renderFactory = dpapp => render;
  const connectedRenderer = connectRenderer(app, renderFactory);

  expect(typeof connectedRenderer).toEqual('function');

  // trigger an update
  app.ui.badgeCount = 1;
  // trigger another update
  app.ui.changeTitle('another title');
  // trigger another update
  app.ui.changeTitle();

  expect(render.mock.calls[0][0]).toHaveProperty('title', 'title');
  expect(render.mock.calls[1][0]).toHaveProperty('title', 'another title');
  expect(render.mock.calls[2][0]).toHaveProperty('title', 'title');
});
