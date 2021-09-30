import React from 'react';


import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {fakeOrders} from '../data/fakeOrders';
import {OrderComponent} from './Order';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';


configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('some string');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it ('no shop in order', () => {
		const wrapper = shallow(<OrderComponent order={{date: 1}}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it ('no date in order', () => {
		const wrapper = shallow(<OrderComponent order={{shop: 'some shop'}}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('at least 1 items in order', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[1]}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('no items', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);
		expect(wrapper).toMatchSnapshot();
	});

});
