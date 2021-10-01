import React from 'react';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {getDate} from '../utils/getDate';

import {OrderComponent} from './Order';

import {fakeOrders} from '../data/fakeOrders';

configure({ adapter: new Adapter() });
jest.mock('../utils/getDate');

describe('Order.tsx', () => {
	test.each(fakeOrders)('test order\'s snapshots', (order) => {
		getDate.mockReturnValue('some date');

		shallow(<OrderComponent key={0}
			order={order}
		/>);
		expect(getDate).toBeCalled();

		jest.clearAllMocks();
	});

	it('Order not exists', () => {
		shallow(<OrderComponent
			key={0}
			order={undefined}
		/>);
		expect(getDate).not.toBeCalled();
	});
});
