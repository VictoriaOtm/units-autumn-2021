import React from 'react';
import { OrderComponent } from './Order';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Order } from '../data/fakeOrders';

jest.mock('../utils/getDate');
import { getDate } from '../utils/__mocks__/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	const date = new Date('2021-09-30').getTime();
	const order: Order = {
		items: ['Заказ 1', 'Заказ 2'],
		date: date,
		shop: 'shop'
	};

	afterAll(() => {
		jest.resetModules();
	});

	it('some test', () => {
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	test.each([
		{
			order: null
		},
		{
			order: {
				items: ['1', '2'],
				date: date
			}
		},
		{
			order: {
				items: ['1', '2'],
				shop: 'shop'
			}
		}
	])('Пустой заказ', ({ order }) => {
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toEqual({});
	});

	test.each([
		{
			order: {
				items: [],
				date: date,
				shop: 'shop'
			}
		},
		{
			order: {
				items: null,
				date: date,
				shop: 'shop'
			}
		},
		{
			order: {
				date: date,
				shop: 'shop'
			}
		}
	])('not items', ({ order }) => {
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});
});
