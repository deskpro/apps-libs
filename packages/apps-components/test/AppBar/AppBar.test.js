import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AppBar from '../../src/AppBar';

Enzyme.configure({ adapter: new Adapter() });

describe('AppBar', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<AppBar />).find('.dp-AppBar')).toHaveLength(1);
  });
});
