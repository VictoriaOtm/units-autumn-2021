jest.mock('../utils/getDate');

import { ShallowWrapper, shallow, configure } from 'enzyme';
import React from 'react';

import {getDate} from '../utils/getDate';
import { OrderComponent } from './Order';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	let wrapper: ShallowWrapper;

	beforeEach(() => {
		getDate.mockReturnValue('mocked date');
	});
	
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('order does not have a shop', () => {
		const order = {
			items: ['3', '4', '5'],
			date: 2,
		};
		wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper.getElement()).toBeNull();
	});

	it('order does not have date', () => {
		const order = {
			items: ['3', '4', '5'],
			shop: 'Ozon',
		};
		wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper.getElement()).toBeNull();
	});

	it('order does not have items', () => {
		const order = {
			date: 2,
			shop: 'Ozon',
		};
		wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('component renders with all required fields', () => {
		const order = {
			items: ['3', '4', '5'],
			date: 2,
			shop: 'Ozon',
		};
		wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('component renders with the mocked getData called', () => {
		const order = {
			items: ['3', '4', '5'],
			date: 2,
			shop: 'Ozon',
		};
		wrapper = shallow(<OrderComponent order={order} />);
		expect(getDate).toHaveBeenCalledTimes(1);
	});
});
