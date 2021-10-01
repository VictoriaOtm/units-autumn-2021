import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OrderComponent} from './Order';
import {fakeOrders} from '../data/fakeOrders';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

configure({adapter: new Adapter()});

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('300');
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('right render', () => {
		const wrapper = shallow(<OrderComponent order={fakeOrders[0]}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('render without items', () => {
		const wrapper = shallow(<OrderComponent order={
			{
				id: 123,
				date: 300,
				shop: 'Bizarro',
			}
		}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('render without shop', () => {
		const wrapper = shallow(<OrderComponent order={
			{
				id: 1,
				date: 300,
				items: [
					'item1',
					'item2'
				]
			}
		}/>);
		expect(wrapper.isEmptyRender()).toBeTruthy();
	});

	it('render with shop and items', () => {
		const wrapper = shallow(<OrderComponent order={
			{
				id: 1,
				date: 300,
				shop: 'Bizarro',
				items: [
					'item1',
					'item2'
				]
			}
		}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('render without order', () => {
		const wrapper = shallow(<OrderComponent order={{}}/>);
		expect(wrapper.isEmptyRender()).toBeTruthy();
	});

	it('check if getDate is called', () => {
		const testData = {shop: 'shop', date: 1};
		shallow(<OrderComponent order={testData}/>);

		expect(getDate).toHaveBeenCalledWith(testData.date);
	});
});
