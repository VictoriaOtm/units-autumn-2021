import React from 'react';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';

import {OrderComponent} from './Order';

describe('Order.tsx', () => {
	it('getDate called', () => {
		getDate.mockReturnValue('date');

		shallow(<OrderComponent {...{
			order: {
				id: 100,
				date: 1588359900000,
				shop: 'Сбереги Мега Маркер',
				items: [],
			},
		}}/>);
		expect(getDate).toHaveBeenCalled();
	});

	it('test null elements 1', () => {
		const wrapper = shallow(<OrderComponent {...{
			order: {
				date: 1,
			}
		}}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('test null elements 2', () => {
		const wrapper = shallow(<OrderComponent {...{
			order: {
				items: ['item1', 'item2'],
			}
		}}/>);
		expect(wrapper.getElement()).toBeNull();
	});

	it('empty items test', () => {
		const wrapper = shallow(<OrderComponent {...{
			order: {
				date: 130
			}
		}}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('some empty items test', () => {
		const wrapper = shallow(<OrderComponent {...{
			order: {
				id: 100,
				date: 1588359900000,
				shop: 'Сбереги Мега Маркер',
				items: [],
			}
		}}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('some items test', () => {
		const wrapper = shallow(<OrderComponent {...{
			order: 	{
				id: 124,
				date: 1652481120000,
				shop: 'Lamodник.ru',
				items: [
					'Жакет - BOREAL5',
					'Miss Gabby Костюм',
					'Ostin перчатки мужские',
					'Zara худи роз.',
				]
			}
		}}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
