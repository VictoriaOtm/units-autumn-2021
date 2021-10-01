jest.mock('../utils/getDate');

import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent} from './Order';
import { fakeOrders } from '../data/fakeOrders';
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('ura');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	afterAll(() => {
		jest.resetModules();
	});

	it('test with order with zero items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);

		expect(wrapper).toMatchSnapshot();
	});


	it('test with not zero items ', () => {
		const wrapper = shallow(<OrderComponent
			order={fakeOrders[1]}
		/>);
		expect(wrapper).toMatchSnapshot();
	});
	
	it('test several items', () => {
		const order = {shop: 'magazin', date: 15, items: ['item1', 'item2']};
		const wrapper = shallow(<OrderComponent
			order={order}
		/>);
		expect(wrapper).toMatchSnapshot();
	});
});
