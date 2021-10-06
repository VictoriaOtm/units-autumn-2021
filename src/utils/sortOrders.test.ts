import {sortByDate, sortByItemCount, getSortFunction, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('test sortByItemCount', () => {
	it('test with not order items', () => {
		const order1: Order = { items: [] };
		const order2: Order = { items: [] };

		expect(sortByItemCount(order1, order2)).toEqual(0);
	});

	it('test with not order items', () => {
		const order1: Order = {};
		const order2: Order = {};

		expect(sortByItemCount(order1, order2)).toEqual(0);
	});

	it('test orders1.length > orders2.length', () => {
		const order1: Order = { items: ['a', 'b', 'a'] };
		const order2: Order = { items: ['a', 'b'] };

		expect(sortByItemCount(order1, order2)).toEqual(1);
	});

	it('test order1.items.length < order2.items.length', () => {
		const order1: Order = { items: ['a', 'b'] };
		const order2: Order = { items: ['a', 'b', 'a'] };

		expect(sortByItemCount(order1, order2)).toEqual(-1);
	});

	it('test orders1.length = orders2.length', () => {
		const order1: Order = { items: ['a', 'a'] };
		const order2: Order = { items: ['a', 'a'] };

		expect(sortByItemCount(order1, order2)).toEqual(0);
	});
});

describe('test sortByDate', () => {
	it.each([
		{ order1: {}, order2: {} },
		{ order1: { date: 0 }, order2: { date: 0 } }
	])('test empty order date', (data) => {
		expect(sortByDate(data.order1, data.order2)).toEqual(0);
	});

	it('test date1 > date2', () => {
		const order1: Order = { date: 2 };
		const order2: Order = { date: 1 };

		expect(sortByDate(order1, order2)).toEqual(-1);
	});

	it('test date1 < date2', () => {
		const order1: Order = { date: 1 };
		const order2: Order = { date: 2 };

		expect(sortByDate(order1, order2)).toEqual(1);
	});

	it('test date1 = date2', () => {
		const order1: Order = { date: 2 };
		const order2: Order = { date: 2 };

		expect(sortByDate(order1, order2)).toEqual(0);
	});
});

describe('test getSortFunction', () => {
	it('test sortType: DATE', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});

	it('test sortType: COUNT', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
});

describe('test sortOrders', () => {
	it('test sortOrders not empty list of orders', () => {
		const func = jest.fn();
		sortOrders([{}, {}], func);
		expect(func).toHaveBeenCalledTimes(1);
	});

	it('test sortOrders empty list of orders', () => {
		const func = jest.fn();
		sortOrders([], func);
		expect(func).toHaveBeenCalledTimes(0);
	});
});
