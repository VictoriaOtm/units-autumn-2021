import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure, ReactWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import {fakeOrders} from '../data/fakeOrders';



configure({ adapter: new Adapter() });

const data = {
	order: fakeOrders[0]
};

const data2 = {
	order: fakeOrders[1]
};

const data3 = {
	order: {}
};

describe('Order.tsx', () => {

	beforeEach(() => {
		getDate.mockReturnValue('Чт, 30 сент.');
	});

	afterAll(() => {
		jest.resetModules();
	});

	it('вызов getDate', () => {
		shallow(<OrderComponent {...data}/>);
		expect(getDate).toHaveBeenCalledTimes(1);
	});

	it('Пустой список', () => {
		const wrapper = shallow(<OrderComponent {...data}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Список товаров', () => {
		const wrapper = shallow(<OrderComponent {...data2}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Cписок равен null', () => {
		const wrapper = shallow(<OrderComponent {...data3}/>);
		expect(wrapper.getElement()).toBeNull();
	});
});
