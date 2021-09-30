import React from 'react';

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import resetModules = jest.resetModules;
import {OrderComponent} from './Order';

describe('Order.tsx', () => {
	beforeEach(() => {
		(getDate as jest.Mock).mockReturnValue('1707');
	});

	afterAll(() => {
		resetModules();
	});

	test.each([
		[
			{
				order : null
			}
		],
		[
			{
				order : {
					shop: 'Kekland'
				}
			}
		],
		[
			{
				order : {
					date: 1
				}
			}
		],
	])('wrong order', (wrongOrder) => {
		expect(OrderComponent(wrongOrder)).toBeNull();
	});

	test.each([
		[
			{
				order : {
					date: 1,
					items: [],
					shop: 'Kekland'
				}
			}
		],
		[
			{
				order : {
					date: 1,
					items: undefined,
					shop: 'Loland'
				}
			}
		]
	])('empty order', (emptyOrder) => {
		expect(OrderComponent(emptyOrder)).toMatchSnapshot();
	});

	it('not empty order', () => {
		const notEmptyOrder = {
			order : {
				date: 1,
				items: ['kek', 'lol'],
				shop: 'Kekland'
			}
		};

		expect(OrderComponent(notEmptyOrder)).toMatchSnapshot();
	});
});
