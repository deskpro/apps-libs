import { parseWidgetMessage } from '../../../src/Widget/factories';
import { parseRequest, parseResponse } from '../../../src/Widget/messages';


import WidgetResponse from '../../../src/Widget/WidgetResponse';
import WidgetRequest from '../../../src/Widget/WidgetRequest';

test('parseMessageFromJS parses response', done => {
  const expectedValue = parseResponse({
    id: '1',
    widgetId: '1',
    correlationId: '100',
    body: JSON.stringify({ some: 'string' }),
    status: 'success',
  });
  const actualValue = parseWidgetMessage(expectedValue.toJS());

  expect(actualValue instanceof WidgetResponse).toBe(true);
  expect(actualValue.toJS()).toEqual(expectedValue.toJS());
  done();
});

test('parseMessageFromJS parses request', done => {
  const expectedValue = parseRequest({
    id: '1',
    widgetId: '1',
    correlationId: '100',
    body: JSON.stringify({ some: 'string' }),
  });
  const actualValue = parseWidgetMessage(expectedValue.toJS());

  expect(actualValue instanceof WidgetRequest).toBe(true);
  expect(actualValue.toJS()).toEqual(expectedValue.toJS());
  done();
});

