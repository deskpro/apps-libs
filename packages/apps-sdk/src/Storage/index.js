/**
 * This module exports the interface of the Storage package
 * @module Storage
 */

import StorageApiFacade from './StorageApiFacade';
import FetchStorageAdapter from './FetchStorageAdapter';
import LocalStorageAdapter from './LocalStorageAdapter';

export {
  /**
   * @type {StorageApiFacade}
   */
  StorageApiFacade,
};

export const registerEventHandlers = () => {};

function storageAdapterProps(instanceProps, contextProps) {
  return {
    appId: instanceProps.appId,
    instanceId: instanceProps.instanceId,
    contextEntityType: contextProps.contextType,
    contextEntityId: contextProps.entityId,
  };
}

/**
 * @method
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 *
 * @return {StorageApiFacade}
 */
export const createStorageAPIClient = (
  outgoingDispatcher,
  instanceProps,
  contextProps,
) => {
  const props = storageAdapterProps(instanceProps, contextProps);
  const env = contextProps.getProperty('appsEnvironment');
  const adapter = contextProps.getProperty('appsStorageadapter');

  let storageAdapter = new FetchStorageAdapter();
  if (env === 'development') {
    if (adapter !== 'fetch') {
      storageAdapter = LocalStorageAdapter.fromGlobals();
    }
  }

  return new StorageApiFacade(outgoingDispatcher, storageAdapter, props);
};
