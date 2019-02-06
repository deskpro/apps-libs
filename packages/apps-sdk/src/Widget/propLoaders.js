/**
 * Load the app's properties by contacting the parent window
 *
 * @param {string} widgetId
 * @param {{ send: Function }} postRobot
 * @return {function(): Promise<Object, Error>}
 */
export function fromParentWindow(widgetId, postRobot) {
  /**
   * @return {Promise<Object, Error>}
   */
  function fromParentWindowAction() {
    return postRobot
      .send(
        postRobot.parent,
        `urn:deskpro:apps.widget.onready?widgetId=${widgetId}`,
        {},
      )
      .then(event => event.data);
  }

  return fromParentWindowAction;
}

/**
 * Loads the app's properties from the initialization properties
 *
 * @param {string} widgetId
 * @param {InitPropertiesBag} initProps
 * @return {function(): Promise<Object, Error>}
 */
export function fromInitProps(widgetId, initProps) {
  function fromInitPropsAction() {
    return Promise.resolve({
      isPreRender: initProps.getProperty('dpRender') === 'static',
      instanceProps: {
        appId: initProps.getProperty('dpInstanceAppId'),
        appTitle: initProps.getProperty('dpInstanceAppTitle'),
        appPackageName: initProps.getProperty('dpInstanceAppPackageName'),
        instanceId: initProps.getProperty('dpInstanceInstanceId'),
      },
      contextProps: {
        type: initProps.getProperty('dpContextType'),
        entityId: initProps.getProperty('dpContextEntityId'),
        locationId: initProps.getProperty('dpContextLocationId'),
        tabId: initProps.getProperty('dpContextTabId'),
        tabUrl: initProps.getProperty('dpContextTabUrl'),
      },
    });
  }

  return fromInitPropsAction;
}
