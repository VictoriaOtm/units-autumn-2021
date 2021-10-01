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
		(getDate as jest.Mock).mockReturnValue('some string');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('test getDate call', () => {
		const data: OrderComponentProps = {
			order: fakeOrders[0],
		};

		shallow(<OrderComponent {...data}/>);
		expect(getDate).toHaveBeenCalledTimes(1);
	});

	it('test return null', () => {
		const data = {
			order: {
				data: 1,
			},
		};

		const wrapper = shallow(<OrderComponent {...data}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('test order with not items', () => {
		const props = {
			order: fakeOrders[0]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('test order with items', () => {
		const props = {
			order: fakeOrders[1]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
