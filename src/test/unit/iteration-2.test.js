import React from 'react'; 
import { shallow } from 'enzyme';
import Card from '../../Card';
import {uid} from 'react-uid';


describe('Card', () => { 
  it('should match the snapshot with all data passed in correctly', () => { 
    const location = 'ASD 20';
    const stats = {'2004': 0.12, '2005': 0.23}

    const wrapper = shallow( <Card 
      location={location}
      stats={stats}
      id={uid(1)}
      key={uid(2)}
    />);

    expect(wrapper).toMatchSnapshot(); 
  }); 
}); 