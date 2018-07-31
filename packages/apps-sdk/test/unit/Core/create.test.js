import { createRenderer, createAppFromProps } from '../../../src/Core/create';
import AppEventEmitter from "../../../src/Core/AppEventEmitter";

test('createRenderer creates a renderer function for an app', () => {

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

  const render = jest.fn();
  const renderFactory = dpapp => render;
  const appRenderer = createRenderer(renderFactory);

  expect(typeof appRenderer).toEqual('function');

  appRenderer(app);
  app.ui.badgeCount = 6;

  expect(render.mock.calls[0][0]).toHaveProperty('badgeCount', 0);
  expect(render.mock.calls[0][0]).toHaveProperty('badgeVisibility');
  expect(render.mock.calls[0][0]).toHaveProperty('display');
  expect(render.mock.calls[0][0]).toHaveProperty('title');
  expect(render.mock.calls[0][0]).toHaveProperty('iconUrl');
  expect(render.mock.calls[0][0]).toHaveProperty('notification');
  expect(render.mock.calls[0][0]).toHaveProperty('notificationType');
  expect(render.mock.calls[0][0]).toHaveProperty('refresh');
  expect(render.mock.calls[0][0]).toHaveProperty('collapse');
  expect(render.mock.calls[0][0]).toHaveProperty('expand');
  expect(render.mock.calls[0][0]).toHaveProperty('closeNotification');
  expect(render.mock.calls[0][0]).toHaveProperty('state');

  expect(render.mock.calls[1][0]).toHaveProperty('badgeCount', 6);
  expect(render.mock.calls[1][0]).toHaveProperty('badgeVisibility');
  expect(render.mock.calls[1][0]).toHaveProperty('display');
  expect(render.mock.calls[1][0]).toHaveProperty('title');
  expect(render.mock.calls[1][0]).toHaveProperty('iconUrl');
  expect(render.mock.calls[1][0]).toHaveProperty('notification');
  expect(render.mock.calls[1][0]).toHaveProperty('notificationType');
  expect(render.mock.calls[1][0]).toHaveProperty('refresh');
  expect(render.mock.calls[1][0]).toHaveProperty('collapse');
  expect(render.mock.calls[1][0]).toHaveProperty('expand');
  expect(render.mock.calls[1][0]).toHaveProperty('closeNotification');
  expect(render.mock.calls[1][0]).toHaveProperty('state');
});
