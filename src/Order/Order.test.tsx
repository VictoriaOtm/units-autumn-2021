import React from 'react';
import {shallow, configure} from 'enzyme';
import {OrderComponent} from './Order';
import {fakeOrders} from '../data/fakeOrders';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../utils/getDate');
import { getDate } from '../utils/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		getDate.mockReturnValue('time');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('no itesm', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('no shop', () => {
		const wrapper = shallow(<OrderComponent order={{...fakeOrders[1], shop: ''}}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('full order', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[1]}/>);

		expect(wrapper).toMatchSnapshot();
	});
});
