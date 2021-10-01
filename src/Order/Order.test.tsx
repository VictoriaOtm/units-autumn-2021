jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

import React from 'react';

import {OrderComponent} from './Order';

import {fakeOrders} from '../data/fakeOrders';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('wolf');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('default render', () => {
		const fakeOrder = fakeOrders[1];

		const wrapper = shallow(<OrderComponent
			key={0}
			order={fakeOrder}
		/>);

		expect(wrapper).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});

	it('empty render', () => {
		const fakeEmptyOrder = fakeOrders[0];

		const wrapperEmpty = shallow(<OrderComponent
			key={0}
			order={fakeEmptyOrder}
		/>);

		expect(wrapperEmpty).toMatchSnapshot();
		expect(getDate).toBeCalled();
	});

	test.each([
		null,
		{ id: 0, date: 1, items: [] },
		{ id: 0, shop: 'wolf', items: [] },
	])('OrderComponent({ order: %s }) should be null', (order) => {
		const result = OrderComponent({ order: order });
		expect(result).toBeNull();
	});
});
