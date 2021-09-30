jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

import React from 'react';

import {OrderComponent} from './Order';

import {fakeOrders} from '../data/fakeOrders';
import {fakeOrder} from '../data/fakeOrder';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('wolf');
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

	it('null if no order supplied', () => {
		const result = OrderComponent({ order: null });
		expect(result).toBe(null);
	});
});
