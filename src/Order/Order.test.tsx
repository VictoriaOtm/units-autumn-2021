import React from 'react';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

import {OrderComponent} from './Order';

import {fakeOrders} from '../data/fakeOrders';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	beforeEach(() => {
		getDate.mockReturnValue('some date');
	});
	afterAll(() => {
		jest.resetModules();
	});

	it('test orders getDate called', () => {
		shallow(<OrderComponent
			key={0}
			order={fakeOrders[0]}
		/>);
		expect(getDate).toBeCalled();
	});

	test.each([fakeOrders[0], fakeOrders[1]])('test order\'s snapshots', (order) => {
		const wrapper = shallow(<OrderComponent
			key={0}
			order={order}
		/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Order not exists', () => {
		shallow(<OrderComponent
			key={0}
			order={undefined}
		/>);
		expect(getDate).not.toBeCalled();
	});
});
