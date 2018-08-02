import { nextRequest, nextResponse, parseResponse, parseRequest } from '../../../src/Widget/messages';


test('nextRequest increments messageId and correlationId', done => {
  const payload = { some: 'string' };
  const widgetId = 100;

  const firstRequest = nextRequest(widgetId, payload);
  const secondRequest = nextRequest(widgetId, payload);

  expect(parseInt(secondRequest.id, 10) > parseInt(firstRequest.id, 10)).toBe(
    true,
  );
  expect(
    parseInt(secondRequest.correlationId, 10) >
    parseInt(firstRequest.correlationId, 10),
  ).toBe(true);

  done();
});

test('nextResponse increments messageId and re-uses correlationId', done => {
  const request = parseResponse({
    id: '1',
    widgetId: '1',
    correlationId: '100',
    body: JSON.stringify({ some: 'string' }),
  });

  const firstResponse = nextResponse(
    request,
    JSON.stringify({ some: 'string' }),
    false,
  );
  const secondResponse = nextResponse(
    request,
    JSON.stringify({ some: 'string' }),
    false,
  );

  expect(parseInt(firstResponse.id, 10) < parseInt(secondResponse.id, 10)).toBe(
    true,
  );
  expect(firstResponse.correlationId).toBe(secondResponse.correlationId);
  expect(firstResponse.correlationId).toBe('100');

  done();
});

