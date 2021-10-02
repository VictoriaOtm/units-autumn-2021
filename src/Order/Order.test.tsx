import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow, ShallowWrapper} from 'enzyme';
import {OrderComponent} from './Order';
import {Order} from '../data/fakeOrders';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeAll(() => {
		(getDate as jest.Mock).mockReturnValue('01.01.01');
	});

	afterAll(() => {
		jest.resetModules();
	});

	test.each([
		{
			id: 100,
			date: 1588359900000,
			items: [],
		},
		{
			id: 100,
			shop: 'Сбереги Мега Маркер',
			items: [],
		},
	])('test zero call getData', (order) => {
		shallow(<OrderComponent order={order}/>);

		expect(getDate).toBeCalledTimes(0);
	});

	it('check snapshot', () => {
		const order: Order = {
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: ['Мороженное'],
		};

		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order}/>);

		expect(getDate).toBeCalledTimes(1);
		expect(wrapper).toMatchSnapshot();
	});

	test.each([
		{
			id: 100,
			date: 1588359900000,
			items: [],
		},
		{
			id: 100,
			shop: 'Сбереги Мега Маркер',
			items: [],
		},
	])('invalid order', (order: Order) => {
		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order}/>);

		expect(wrapper.getElement()).toBeNull();
	});

	test.each([
		{
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: undefined,
		},
		{
			id: 100,
			date: 1588359900000,
			shop: 'Сбереги Мега Маркер',
			items: [],
		},
	])('order has invalid items', (order: Order) => {
		const wrapper: ShallowWrapper = shallow(<OrderComponent order={order}/>);

		expect(wrapper).toMatchSnapshot();
	});
});
