import React from 'react';
import {OrderComponent} from './Order';
import {fakeOrders} from '../data/fakeOrders';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

describe('Order.ts', () => {
	beforeEach(() => {
		jest.resetModules();
  
		getDate.mockReturnValue('16.02.2001');
	});
  
	afterAll(() => {
		jest.resetModules();
	});
  
	it('empty order', () => {
		const props = {
			order: []
		};
		const order = OrderComponent(props);
		expect(order).toBeNull();
	});

	it('render with empty items', () => {
		const props = {
			order: fakeOrders[0]
		};
  
		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
  
	it('render with items', () => {
		const props = {
			order: fakeOrders[1]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
  
	it('render with null fields in order', () => {
		const props = {
			order: {
				shop: null,
				date: null,
			}
		};
		const result = shallow(<OrderComponent {...props}/>);
		expect(result.getElement()).toBeNull();
	});
});
