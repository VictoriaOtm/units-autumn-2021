import React from 'react';
import { OrderComponent } from './Order';
import { Order } from '../data/fakeOrders';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../utils/getDate')
import { getDate } from '../utils/getDate';

describe('Order.tsx', () => {
	afterAll(() => {
		jest.resetAllMocks();
	});

	it('empty', () => {
		const testOrder: Order = {};
		var wrapper = shallow(<OrderComponent order={testOrder} />);
		expect(wrapper).toMatchSnapshot()
	});

	it('no items', () => {
		const testOrder: Order = {
			date: 1,
			shop: 'shop'
		};
		var wrapper = shallow(<OrderComponent order={testOrder} />);
		expect(wrapper).toMatchSnapshot()
	});

	it('usual order', () => {
		getDate.mockReturnValue('Today');
		const testOrder: Order = {
			items: ['abc'],
			date: 1,
			shop: 'shop'
		};


		var wrapper = shallow(<OrderComponent order={testOrder} />);
		expect(wrapper).toMatchSnapshot()
		expect(getDate).toHaveBeenCalled()
		jest.clearAllMocks()
	});
});

