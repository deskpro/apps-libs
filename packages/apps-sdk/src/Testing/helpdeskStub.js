import * as postRobot from 'post-robot';
import { parse } from 'query-string';

import * as AppEvents from '../Core/AppEvents';
import * as ContextUserEvents from '../Core/ContextUserEvents';
import { ObjectEvents, TabEvents } from '../Context';
import { DeskproWindowEvents } from '../DeskproWindow';
import { SecurityEvents } from '../Security';
import { WebAPIEvents } from '../WebAPI';
import { WidgetEvents } from '../Widget';

import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event';

/**
 * @param {string} eventName
 * @return {{ channelType:String, invocationType: String }|null}
 */
function getEventDefinition(eventName) {
  const providers = [
    AppEvents,
    ContextUserEvents,
    ObjectEvents,
    TabEvents,
    DeskproWindowEvents,
    SecurityEvents,
    WebAPIEvents,
    WidgetEvents,
  ];

  for (const provider of providers) {
    const event = provider.getDefinition(eventName);
    if (event) {
      return event;
    }
  }

  return null;
}

const scenarioConfigurations = {};

let scenario = {
  name: null,
  request: 0,
  instanceProps: {},
  contextProps: {},
};

const defaultInstanceProps = {
  appId: '1',
  appTitle: 'Your title',
  appPackageName: 'app',
  instanceId: '1',
};

const defaultContextProps = {
  type: 'ticket',
  entityId: '1',
  locationId: '1',
  tabId: 'tab-1',
  tabUrl: 'https://127.0.0.1',
};

/**
 * Parses a query string and returns scenario initialization props
 *
 * @param {String} qs
 * @return {{name: null, instanceProps: {}, contextProps: {}}}
 */
export function parseScenarioInitQueryString(qs) {
  const qsProps = parse(qs);

  const props = {
    name: null,
    instanceProps: {},
    contextProps: {},
  };

  Object.keys(qsProps).forEach(qsProp => {
    if (qsProp.startsWith('instanceProps.')) {
      const name = qsProp.replace(/instanceProps\\./, '');
      props.instanceProps[name] = qsProps[qsProp];
    } else if (qsProp.startsWith('contextProps.')) {
      const name = qsProp.replace(/contextProps\\./, '');
      props.contextProps[name] = qsProps[qsProp];
    } else if (qsProp === 'scenario') {
      props.name = qsProps[qsProp];
    }
  });

  props.instanceProps = { ...defaultInstanceProps, ...props.instanceProps };
  props.contextProps = { ...defaultContextProps, ...props.contextProps };

  return props;
}

/**
 * @param {string} name the name of the scenario
 * @param {{}} instanceProps an object containing the instance props passed to the app at initialize time
 * @param {{}} contextProps an object containing the context props passed to the app at initialize time
 */
export function setActiveScenario({ name, instanceProps, contextProps }) {
  const steps = scenarioConfigurations[name];
  if (!steps) {
    throw new Error(`Scenario with name: ${name} is not configured`);
  }

  scenario.name = name;
  scenario.request = 0;
  scenario.instanceProps = { ...defaultInstanceProps, ...instanceProps };
  scenario.contextProps = { ...defaultContextProps, ...contextProps };
}

/**
 * @param {String} scenario the name of the scenario
 * @param {{}} handlers an object whose keys are event names and whose values are event handler
 */
export function addScenario(scenario, handlers) {
  scenarioConfigurations[scenario] = handlers;
}

/**
 * @param {{ data: {} }}  ev
 * @return {{}}
 */
function getHandlerPayload(ev) {
  const { eventName, body } = ev.data;

  if (
    -1 <
    [
      WebAPIEvents.EVENT_WEBAPI_REQUEST_DESKPRO,
      WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH,
    ].indexOf(eventName)
  ) {
    return { ...body.init, url: body.url };
  }
  return { ...body };
}

postRobot.on('urn:deskpro:apps.widget.onready?widgetId=dev', {}, function(ev) {
  return {
    instanceProps: { ...scenario.instanceProps },
    contextProps: { ...scenario.contextProps },
  };
});

postRobot.on('urn:deskpro:apps.widget.event?widgetId=dev', {}, function(ev) {
  const configuration = scenarioConfigurations[scenario.name];
  let response = null;

  const { eventName } = ev.data;
  if (configuration) {
    const handler = configuration[eventName];
    if (typeof handler === 'function') {
      const payload = getHandlerPayload(ev);
      response = handler(payload);
    } else if (handler && typeof handler === 'object') {
      response = { ...handler };
    }
  }

  // if we have a response we send it straight away
  if (response) {
    const { body, status } = response;
    const { correlationId, widgetId, id } = ev.data;
    postRobot.send(ev.source, eventName, {
      id,
      widgetId,
      correlationId,
      body: JSON.stringify(body),
      status: status || 'success',
    });
    return;
  }

  // let's check if we have to send an error response
  let error = null;
  const definition = getEventDefinition(eventName);

  const isRequestResponse =
    definition &&
    definition.channelType === CHANNEL_OUTGOING &&
    definition.invocationType === INVOCATION_REQUESTRESPONSE;

  if (!scenario) {
    error = {
      message: `scenario "${scenario.name}" is not configured `,
      data: scenario.name,
    };
    console.error(`scenario "${scenario.name}" is not configured `);
  }

  if (!response && isRequestResponse) {
    const { body } = ev.data;
    error = {
      message: `No handler defined for event "${eventName}"`,
      data: { eventName, body },
    };
    console.error(
      `No handler defined for event "${eventName}" with payload`,
      body,
    );
  }

  if (error && isRequestResponse) {
    const { correlationId, widgetId, id } = ev.data;
    postRobot.send(ev.source, eventName, {
      id,
      widgetId,
      correlationId,
      body: JSON.stringify(error),
      status: 'error',
    });
  }
});
