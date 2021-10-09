import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent, OrderComponentProps} from './Order';
import {fakeOrders} from '../data/fakeOrders';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({adapter: new Adapter()});

describe('Check OrderComponent', () => {
	beforeEach(() => {
		getDate.mockReturnValue('date');
	});
	afterAll(() => {
		jest.clearAllMocks();
	});
	it('getDate should be called', () => {
		const data: OrderComponentProps = {
			order: fakeOrders[0],
		};

		shallow(<OrderComponent {...data}/>);
		expect(getDate).toBeCalled();
	});

	it('Empty order', () => {
		const data: OrderComponentProps = {
			order: {},
		};

		const wrapper = shallow(<OrderComponent {...data}/>);
		expect(wrapper.children().length).toBe(0);
	});

	it('Empty items provided with order', () => {
		const props = {
			order: fakeOrders[0]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Not empty items provided with order', () => {
		const props = {
			order: fakeOrders[1]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
});