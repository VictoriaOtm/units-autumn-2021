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
		{ order: { date: 0, }, },
		{ order: { shop: '', }, },
		{ order: {}, }
	])('test render with null', (data) => {
		const wrapper = shallow(<OrderComponent {...data}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('test empty array of items', () => {
		const props = { order: [] };

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('test not empty array of items', () => {
		const props = { order: fakeOrders[1] };
		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
