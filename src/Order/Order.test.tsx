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

	it('mocked function is callable', () => {
		shallow(<OrderComponent order={fakeOrders[0]}/>);
		expect(getDate).toHaveBeenCalledTimes(1);
	});


	it.each([{date: 1}, {shop: 'some shop'}])('null return', (data) => {
		const wrapper = shallow(<OrderComponent order={data}/>);
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
