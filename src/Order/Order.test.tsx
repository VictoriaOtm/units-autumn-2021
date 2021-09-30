import React from 'react';
import {OrderComponent, OrderComponentProps} from './Order';
import {fakeOrders} from '../data/fakeOrders';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		getDate.mockReturnValue('date');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('getDate called', () => {
		const data: OrderComponentProps = {
			order: fakeOrders[0],
		};

		shallow(<OrderComponent {...data}/>);
		expect(getDate).toHaveBeenCalledTimes(1);
	});

	it.each([
		{
			order: {
				date: 1,
			},
		},
		{
			order: {
				shop: '',
			},
		}
	])('test return null №%#', (data) => {
		const wrapper = shallow(<OrderComponent {...data}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('test empty items', () => {
		const props = {
			order: fakeOrders[0]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('test not empty items', () => {
		const props = {
			order: fakeOrders[1]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
