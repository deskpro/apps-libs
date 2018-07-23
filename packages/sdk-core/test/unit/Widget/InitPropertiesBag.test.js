import InitPropertiesBag from '../../../src/Widget/InitPropertiesBag';

test('fromQueryString returns null when called with an empty string', done => {
  const props = InitPropertiesBag.fromQueryString('');
  expect(props).toBe(null);
  done();
});

test('fromQueryString parses a valid query string', done => {
  const props = InitPropertiesBag.fromQueryString(
    `${InitPropertiesBag.PROP_NAMES.dpWidgetId}=${encodeURIComponent(
      'something&something',
    )}&dp.otherNotYetUsed=entirely_other`,
  );
  expect(props instanceof InitPropertiesBag).toBe(true);
  expect(props.dpWidgetId).toBe('something&something');

  done();
});

test('fromWindow favors the hash property over the query string', done => {
  const expectedValue = 'expected&value';
  const windowObject = {
    location: {
      search: `?${InitPropertiesBag.PROP_NAMES.dpWidgetId}=${encodeURIComponent(
        'unexpected.value',
      )}&dp.otherNotYetUsed=entirely_other`,
      hash: `#${InitPropertiesBag.PROP_NAMES.dpWidgetId}=${encodeURIComponent(
        expectedValue,
      )}&dp.otherNotYetUsed=entirely_other`,
    },
    document: { readyState: 'notReady' },
  };
  const initProps = InitPropertiesBag.fromWindow(windowObject);

  expect(initProps instanceof InitPropertiesBag).toBe(true);
  expect(initProps.dpWidgetId).toBe(expectedValue);

  done();
});

test('fromWindow uses the query string if hash is missing ', done => {
  const expectedValue = 'expected&value';

  const windowObject = {
    location: {
      hash: `#`,
      search: `?${InitPropertiesBag.PROP_NAMES.dpWidgetId}=${encodeURIComponent(
        expectedValue,
      )}&dp.otherNotYetUsed=entirely_other`,
    },
    document: { readyState: 'notReady' },
  };
  const initProps = InitPropertiesBag.fromWindow(windowObject);

  expect(initProps instanceof InitPropertiesBag).toBe(true);
  expect(initProps.dpWidgetId).toBe(expectedValue);

  done();
});

test('fromWindow returns null when init params parsing returns an invalid object ', done => {
  const initProps = [
    {
      location: {
        hash: `#`,
        search: `?`,
      },
      document: { readyState: 'notReady' },
    },
    {
      location: {
        hash: `#`,
        search: `?&otherNotYetUsed=entirely_other`,
      },
      document: { readyState: 'notReady' },
    },
  ].map(InitPropertiesBag.fromWindow);

  initProps.forEach(props => expect(props).toBeNull());
  done();
});
