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

	it('bad order', () => {
		const order: Order = {};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('bad item', () => {
		const order: Order = {
			id: 228,
			shop: 'front duratskiy',
			date: 228,
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('bad item', () => {
		const order: Order = {
			id: 228,
			shop: 'front duratskiy',
			date: 228,
			items: ['go', 'luchshe'],
		};
		const wrapper = shallow(<OrderComponent order={order}/>);
		expect(wrapper).toMatchSnapshot();
	});

});
