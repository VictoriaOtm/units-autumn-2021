import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure, ReactWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import {fakeOrders} from '../data/fakeOrders';



configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		getDate.mockReturnValue('Чт, 30 сент.');
	});

	afterAll(() => {
		jest.resetModules();
	});

	const data = {
		order: fakeOrders[0]
	};

	const data2 = {
		order: fakeOrders[1]
	};

	const dataEmpty = { 
		order: {} 
	};

	it('Пустой список', () => {
		const wrapper = shallow(<OrderComponent {...data}/>);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('.Order-item').exists()).toBe(false);
	});

	it('Список товаров', () => {
		const wrapper = shallow(<OrderComponent {...data2}/>);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('.Order-item').length).toBe(3);
	});
});
