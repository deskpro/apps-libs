import FetchStorageAdapter from '../../../src/Storage/FetchStorageAdapter';
import AppEventEmitter from '../../../src/Core/AppEventEmitter';
import { WebAPIEvents } from '../../../src/WebAPI';

describe('FetchStorageAdapter', () => {
  const storageAdapter = new FetchStorageAdapter();

  test('handleSetBatchStorage sends the expected batch request representation', () => {
    let actualRequest;

    const expectedRequest = {
      url: 'batch',
      init: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: {
            key1: {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              url: 'apps/1/state/2/key1',
              data: { value: 'value-1' },
            },
            key2: {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              url: 'apps/1/state/2/key2',
              data: { value: 'value-2' },
            },
          },
        }),
      },
    };

    let response = {
      body: {
        responses: {
          key1: {
            value: 'expected-value-1',
            headers: {
              'status-code': 200,
            },
          },
          key2: {
            value: 'expected-value-2',
            headers: {
              'status-code': 200,
            },
          },
        },
      },
    };

    const batch = [['key1', 'value-1'], ['key2', 'value-2']];

    const outgoingDispatcher = new AppEventEmitter();
    outgoingDispatcher.addListener(
      WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH,
      (resolve, reject, data) => {
        actualRequest = data;
        resolve(response);
      },
    );

    return storageAdapter
      .handleSetBatchStorage(
        Promise.resolve({
          outgoingDispatcher,
          instanceId: 1,
        }),
        batch,
        2,
      )
      .then(data => {
        expect(data).toEqual([]);
        expect(actualRequest.init.body).toEqual(expectedRequest.init.body);
      });
  });
});
