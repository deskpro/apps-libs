import OauthFacade from '../../../src/Security/OauthFacade';
import {
  EVENT_SECURITY_AUTHENTICATE_OAUTH,
  EVENT_SECURITY_SETTINGS_OAUTH,
  EVENT_SECURITY_OAUTH_REFRESH,
} from '../../../src/Security/events';

import LocalStorageAdapter from '../../../src/Storage/LocalStorageAdapter';
import StorageApiFacade from '../../../src/Storage/StorageApiFacade';
import AppEventEmitter from '../../../src/Core/AppEventEmitter';

const localStorageMock = {
  store: {},
  lastGetKey: null,
  lastSetKey: null,
  lastRemoveKey: null,
  getItem: function(key) {
    this.lastGetKey = key;
    return this.store[key];
  },
  setItem: function(key, value) {
    this.lastSetKey = key;
    this.store[key] = value.toString();
  },
  removeItem: function(key) {
    this.lastRemoveKey = key;
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  },
};

const localStorage = new LocalStorageAdapter(localStorageMock);

/**
 * Creates a dummy storage api facade
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @return {StorageApiFacade}
 */
function createStorageApiFacade(outgoingDispatcher) {
  return new StorageApiFacade(outgoingDispatcher, localStorage, {
    instanceId: '1',
    contextEntityType: 'ticket',
    contextEntityId: '2',
    appId: '3',
  });
}

function createOauth2TokenResponse({ protocolVersion, ...rest }) {
  let { body } = rest;
  if (!body || typeof body !== 'object') {
    body = {
      token: {},
    };
  }

  return {
    oauthVersion: protocolVersion,
    body,
    ...rest,
  };
}

/**
 * @param {function} expects
 * @return {AppEventEmitter}
 */
function createOutgoingDispatcherWithExpectations(event, expects) {
  let handler;
  if (
    event === EVENT_SECURITY_OAUTH_REFRESH ||
    event === EVENT_SECURITY_AUTHENTICATE_OAUTH
  ) {
    handler = (resolve, reject, params) => {
      try {
        expects(params);
        resolve(createOauth2TokenResponse(params));
      } catch (e) {
        reject(e);
      }
    };
  } else {
    handler = (resolve, reject, params) => {
      try {
        expects(params);
        resolve(params);
      } catch (e) {
        reject(e);
      }
    };
  }

  const outgoingDispatcher = new AppEventEmitter();
  outgoingDispatcher.on(event, handler);
  return outgoingDispatcher;
}

describe('OauthFacade', () => {
  const localStorage = new LocalStorageAdapter(localStorageMock);

  test('requestAccess: default oauth version is 2.0', () => {
    function expects({ provider, protocolVersion }) {
      expect(protocolVersion).toEqual('2.0');
    }

    const outgoingDispatcher = createOutgoingDispatcherWithExpectations(
      EVENT_SECURITY_AUTHENTICATE_OAUTH,
      expects,
    );
    const storageClient = createStorageApiFacade(outgoingDispatcher);
    const facade = new OauthFacade(
      outgoingDispatcher,
      storageClient.setAppStorage.bind(localStorage),
    );
    return facade.requestAccess('jira');
  });

  test('requestAccess: custom oauth version is used', () => {
    function expects({ provider, protocolVersion }) {
      expect(protocolVersion).toEqual('1.0');
    }

    const outgoingDispatcher = createOutgoingDispatcherWithExpectations(
      EVENT_SECURITY_AUTHENTICATE_OAUTH,
      expects,
    );
    const storageClient = createStorageApiFacade(outgoingDispatcher);
    const facade = new OauthFacade(
      outgoingDispatcher,
      storageClient.setAppStorage.bind(localStorage),
    );
    return facade.requestAccess('jira', { protocolVersion: '1.0' });
  });

  test('settings: default oauth version is 2.0', () => {
    function expects({ provider, protocolVersion }) {
      expect(protocolVersion).toEqual('2.0');
    }

    const outgoingDispatcher = createOutgoingDispatcherWithExpectations(
      EVENT_SECURITY_SETTINGS_OAUTH,
      expects,
    );
    const storageClient = createStorageApiFacade(outgoingDispatcher);
    const facade = new OauthFacade(
      outgoingDispatcher,
      storageClient.setAppStorage.bind(localStorage),
    );
    return facade.settings('jira');
  });

  test('settings: custom oauth version is used', () => {
    function expects({ provider, protocolVersion }) {
      expect(protocolVersion).toEqual('1.0');
    }

    const outgoingDispatcher = createOutgoingDispatcherWithExpectations(
      EVENT_SECURITY_SETTINGS_OAUTH,
      expects,
    );
    const storageClient = createStorageApiFacade(outgoingDispatcher);
    const facade = new OauthFacade(
      outgoingDispatcher,
      storageClient.setAppStorage.bind(localStorage),
    );
    return facade.settings('jira', { protocolVersion: '1.0' });
  });

  test('register: can register a connection', done => {
    const outgoingDispatcher = new AppEventEmitter();

    const setStorage = (storageName, connectionJS) => {
      expect(connectionJS.providerName).toBe('jira');
      expect(connectionJS.customProp).toBe('custom prop');
      expect(storageName).toBe('oauth:jira');
      return Promise.resolve(connectionJS);
    };

    const facade = new OauthFacade(outgoingDispatcher, setStorage);
    facade
      .register('jira', {
        urlAuthorize: 'http://deskpro-dev/oauth/authorize',
        urlAccessToken: 'http://deskpro-dev/oauth/access',
        urlResourceOwnerDetails: 'http://deskpro-dev/api/v2/me',
        urlRedirect: 'http://deskpro-dev/apps/5',
        clientId: 'an id',
        clientSecret: 'a secret',
        customProp: 'custom prop',
      })
      .then(() => done());
  });

  test('requestAccess emits event EVENT_SECURITY_AUTHENTICATE_OAUTH', () => {
    function expects({ provider, protocolVersion, query }) {
      expect(protocolVersion).toEqual('2.0');
      expect(provider).toEqual('jira');
      expect(query).toBeDefined();
      expect(query).toEqual({
        refresh_token: 'token',
        random: 'param value',
      });
    }

    const outgoingDispatcher = createOutgoingDispatcherWithExpectations(
      EVENT_SECURITY_AUTHENTICATE_OAUTH,
      expects,
    );
    const storageClient = createStorageApiFacade(outgoingDispatcher);
    const facade = new OauthFacade(
      outgoingDispatcher,
      storageClient.setAppStorage.bind(localStorage),
    );

    return facade.requestAccess('jira', {
      protocolVersion: '2.0',
      query: { refresh_token: 'token', random: 'param value' },
    });
  });

  test('refreshAccess emits event EVENT_SECURITY_OAUTH_REFRESH', () => {
    function expects({ provider, protocolVersion, query }) {
      expect(protocolVersion).toEqual('2.0');
      expect(provider).toEqual('jira');
      expect(query).toBeDefined();
      expect(query).toEqual({
        refresh_token: 'token',
        random: 'param value',
      });
    }

    const outgoingDispatcher = createOutgoingDispatcherWithExpectations(
      EVENT_SECURITY_OAUTH_REFRESH,
      expects,
    );
    const storageClient = createStorageApiFacade(outgoingDispatcher);
    const facade = new OauthFacade(
      outgoingDispatcher,
      storageClient.setAppStorage.bind(localStorage),
    );

    return facade.refreshAccess('jira', {
      protocolVersion: '2.0',
      query: { refresh_token: 'token', random: 'param value' },
    });
  });
});
