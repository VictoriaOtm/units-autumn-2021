import React from 'react';
import { OrderComponent } from './Order';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Order } from '../data/fakeOrders';

// jest.mock('../utils/getDate');
// import { getDate } from '../utils/__mocks__/getDate';

configure({ adapter: new Adapter() });

describe('Order.tsx', () => {
	const order: Order = {
		items: ['1', '2'],
		date: new Date().getMilliseconds()
	};

	// let wrapper = shallow(<OrderComponent order={order} />);

	// beforeAll(() => {
	// 	wrapper = shallow(<OrderComponent order={order} />);
	// });

	it('some test', () => {
		const wrapper = shallow(<OrderComponent order={order} />);
		expect(wrapper).toMatchSnapshot();
	});
});
