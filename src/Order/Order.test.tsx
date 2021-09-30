import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent, OrderComponentProps} from './Order';
import {fakeOrders} from '../data/fakeOrders';
import {getDate} from '../utils/getDate';

jest.mock('../utils/getDate');

configure({adapter: new Adapter()});

describe('Check Order', () => {
	beforeEach(() => {
		getDate.mockReturnValue('date');
	});

	it('getDate should be called', () => {
		const data: OrderComponentProps = {
			order: fakeOrders[0],
		};

		shallow(<OrderComponent {...data}/>);
		expect(getDate).toBeCalled();
	});

	it('Empty items', () => {
		const props = {
			order: fakeOrders[0]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Not empty items', () => {
		const props = {
			order: fakeOrders[1]
		};

		const wrapper = shallow(<OrderComponent {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
});