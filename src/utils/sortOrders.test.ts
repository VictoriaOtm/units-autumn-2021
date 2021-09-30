import {sortByDate, sortByItemCount } from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('test sortByItemCount', () => {
	it('test with not order items', () => {
		const order1: Order = {};
		const order2: Order = {};

		order1.items = [];
		order2.items = [];

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(0);
	});

	it('test with not order items', () => {
		const order1: Order = {};
		const order2: Order = {};

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(0);
	});

	it('test orders1.length > orders2.length', () => {
		const order1: Order = {};
		const order2: Order = {};

		order1.items = ['a', 'b', 'a'];
		order2.items = ['a', 'b'];

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(1);
	});

	it('test order1.items.length < order2.items.length', () => {
		const order1: Order = {};
		const order2: Order = {};

		order1.items = ['a', 'b'];
		order2.items = ['a', 'b', 'a'];

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(-1);
	});

	it('test orders1.length = orders2.length', () => {
		const order1: Order = {};
		const order2: Order = {};

		order1.items = ['a', 'a'];
		order2.items = ['a', 'a', 'a'];

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(-1);
	});
});

describe('test sortByDate', () => {
	it.each([
		{
			order1: {},
			order2: {},
		},
		{
			order1: {
				date: 0,
			},
			order2: {
				date: 0,
			},
		}
	])('test empty order date №%#', (data) => {
		const result = sortByDate(data.order1, data.order2);
		expect(result).toEqual(0);
	});

	it('test date1 > date2', () => {
		const order1: Order = {};
		const order2: Order = {};

		order1.date = 2;
		order2.date = 1;

		const result = sortByDate(order1, order2);
		expect(result).toEqual(-1);
	});

	it('test date1 < date2', () => {
		const order1: Order = {};
		const order2: Order = {};

		order1.date = 1;
		order2.date = 2;

		const result = sortByDate(order1, order2);
		expect(result).toEqual(1);
	});

	it('test date1 = date2', () => {
		const order1: Order = {};
		const order2: Order = {};

		order1.date = 2;
		order2.date = 2;

		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});
});

