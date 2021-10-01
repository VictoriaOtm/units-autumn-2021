import React from 'react';
import {OrderComponent, OrderComponentProps} from './Order';
import {fakeOrders} from '../data/fakeOrders';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('date');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('using mock getDate called', () => {
		const data = { order: fakeOrders[0], };
		shallow(<OrderComponent {...data}/>);
		expect(getDate).toHaveBeenCalledTimes(1);
	});

	it.each([
		{date: 0},
		{shop: ''},
		{}
	])('test render with null', (data) => {
		const wrapper = shallow(<OrderComponent order={data}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('test empty array of items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('test not empty array of items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[1]}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
