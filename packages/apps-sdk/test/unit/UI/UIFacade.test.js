import { createUIFacade, UIEvents, UIConstants } from '../../../src/UI';
import AppEventEmitter from '../../../src/Core/AppEventEmitter';
import * as Constants from '../../../src/UI/constants';

test('badgeCount property is stored after setting', done => {
  const outgoingDispatcher = new AppEventEmitter();
  const eventDispatcher = new AppEventEmitter();

  const ui = createUIFacade(outgoingDispatcher, eventDispatcher);
  ui.badgeCount = 5;
  expect(ui.badgeCount).toBe(5);
  done();
});

test('badge_countchanged event fires only if count actually changes', done => {
  const emitMock = jest.fn();
  const outgoingDispatcher = new AppEventEmitter();
  const eventDispatcher = new AppEventEmitter();
  eventDispatcher.emit = emitMock;

  const ui = createUIFacade(outgoingDispatcher, eventDispatcher);
  ui.badgeCount = 5;
  ui.badgeCount = 5;

  expect(emitMock.mock.calls.length).toBe(1);
  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_UI_CHANGED);
  done();
});

test('the new value of badgeCount is propagated to all listeners', done => {
  const emitMock = jest.fn();
  const outgoingDispatcher = new AppEventEmitter();
  const eventDispatcher = new AppEventEmitter();
  eventDispatcher.emit = emitMock;

  const ui = createUIFacade(outgoingDispatcher, eventDispatcher);
  ui.badgeCount = 5;
  ui.badgeCount = 6;

  expect(emitMock.mock.calls.length).toBe(2);

  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_UI_CHANGED);
  expect(emitMock.mock.calls[0][1]).toHaveProperty('badgeCount', 5);
  expect(emitMock.mock.calls[0][2]).toHaveProperty('badgeCount', 0);

  expect(emitMock.mock.calls[1][0]).toBe(UIEvents.EVENT_UI_CHANGED);
  expect(emitMock.mock.calls[1][1]).toHaveProperty('badgeCount', 6);
  expect(emitMock.mock.calls[1][2]).toHaveProperty('badgeCount', 5);

  done();
});

test('menu visibility change event fires everytime menu visibility changes', done => {
  const emitMock = jest.fn();
  const outgoingDispatcher = new AppEventEmitter();
  const eventDispatcher = new AppEventEmitter();
  eventDispatcher.emit = emitMock;

  const ui = createUIFacade(outgoingDispatcher, eventDispatcher);
  ui.hideMenu();
  ui.hideMenu();
  ui.showMenu();
  ui.showMenu();

  expect(emitMock.mock.calls.length).toBe(2);
  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_UI_CHANGED);
  expect(emitMock.mock.calls[0][1]).toHaveProperty(
    'menu',
    Constants.VISIBILITY_HIDDEN,
  );
  expect(emitMock.mock.calls[0][2]).toHaveProperty(
    'menu',
    Constants.VISIBILITY_VISIBLE,
  );

  expect(emitMock.mock.calls[1][0]).toBe(UIEvents.EVENT_UI_CHANGED);
  expect(emitMock.mock.calls[1][1]).toHaveProperty(
    'menu',
    Constants.VISIBILITY_VISIBLE,
  );
  expect(emitMock.mock.calls[1][2]).toHaveProperty(
    'menu',
    Constants.VISIBILITY_HIDDEN,
  );

  done();
});

test('changing title fires an ui change event', done => {
  const emitMock = jest.fn();
  const outgoingDispatcher = new AppEventEmitter();
  const eventDispatcher = new AppEventEmitter();
  eventDispatcher.emit = emitMock;

  const ui = createUIFacade(outgoingDispatcher, eventDispatcher);
  ui.changeTitle('a title');
  ui.changeTitle('a title');

  expect(emitMock.mock.calls.length).toBe(1);
  expect(emitMock.mock.calls[0][0]).toBe(UIEvents.EVENT_UI_CHANGED);
  expect(emitMock.mock.calls[0][1]).toHaveProperty('title', 'a title');

  done();
});

test('showLoading does not emit event if ui is in loading state ', done => {
  const emitMock = jest.fn();
  const outgoingDispatcher = new AppEventEmitter();
  const eventDispatcher = new AppEventEmitter();
  eventDispatcher.emit = emitMock;

  const ui = createUIFacade(outgoingDispatcher, eventDispatcher);
  ui.showLoading();
  ui.showLoading();

  expect(emitMock.mock.calls.length).toBe(1);
  done();
});

test('hide does not emit event if ui is in not loading state ', done => {
  const emitMock = jest.fn();
  const outgoingDispatcher = new AppEventEmitter();
  const eventDispatcher = new AppEventEmitter();
  eventDispatcher.emit = emitMock;

  const ui = createUIFacade(outgoingDispatcher, eventDispatcher);
  ui.showLoading();
  ui.hideLoading();
  ui.hideLoading();

  expect(emitMock.mock.calls.length).toBe(2);
  done();
});
