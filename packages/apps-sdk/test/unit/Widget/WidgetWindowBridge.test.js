import querystring from 'querystring';

import { WidgetWindowBridge } from '../../../src/Widget';
import InitPropertiesBag from '../../../src/Widget/InitPropertiesBag';
import {fromInitProps} from '../../../src/Widget/propLoaders';


test('connect reads application properties from init properties when pre-rendering', done => {

  const dpQuery = querystring.stringify({
    'dp.widgetId':                'STATIC',
    'dp.render':                  'static',
    'dp.instance.appId' :         'STATIC',
    'dp.instance.appTitle':       'title',
    'dp.instance.appPackageName': 'app.name',
    'dp.instance.instanceId':     'STATIC',
    'dp.context.type':            'ticket',
    'dp.context.entityId':        'STATIC',
    'dp.context.locationId':      'STATIC',
    'dp.context.tabId':           'tab-1',
    'dp.context.tabUrl':          'https://127.0.0.1'
  });


  const fromParentWindow = jest.fn(function() {
    throw new Error("should not be called");
  });

  const dpapp = {};
  const createApp = () => dpapp;
  const fromInitPropsMock = jest.fn(fromInitProps);
  const fromParentWindowMock = jest.fn(() => { throw new Error("should not be called"); });

  const loaders = { fromInitProps: fromInitPropsMock, fromParentWindow: fromParentWindowMock };
  const windowObject = {
    location: {
      search: `?${dpQuery}`,
      hash: ``,
    },
    document: { readyState: 'complete' },
    addEventListener: (event, listener) => listener()
  };
  const initProps = InitPropertiesBag.fromWindow(windowObject);

  const widgeWindow = new WidgetWindowBridge(windowObject, initProps, loaders);

  widgeWindow.connect(createApp).then(app => {
    expect(app === dpapp).toBe(true);
    expect(fromInitPropsMock.mock.calls.length).toBe(1);
    expect(fromParentWindowMock.mock.calls.length).toBe(0);
    done();

  });
});
