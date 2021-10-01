import React from 'react';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import {OrderComponent} from './Order';
import {shallow, configure} from 'enzyme';
import {Order} from '../data/fakeOrders';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('228');
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	test.each([
		{
				
		},
		{
			id: 228,
			shop: 'pochemy ne go',
			date: 228,	
		},
		{
			id: 228,
			shop: 'pochemy ne go',
			date: 228,
			items: ['go', 'luchshe'],
		},
	])('bad order and bad item', (order: Order) => {
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
