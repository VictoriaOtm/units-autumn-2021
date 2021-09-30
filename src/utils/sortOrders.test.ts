import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it.each([
		{
			orders1: {},
			orders2: {},
		},
		{
			orders1: {
				items: []
			},
			orders2: {
				items: []
			},
		}
	])('empty order items №%#', (data) => {
		const result = sortByItemCount(data.orders1, data.orders2);
		expect(result).toEqual(0);
	});

	it('orders1.length < orders2.length', () => {
		const orders1: Order = {
			items: ['1', '2'],
		};

		const orders2: Order = {
			items: ['1', '2', '3'],
		};

		const result = sortByItemCount(orders1, orders2);
		expect(result).toEqual(-1);
	});

	it('orders1.length = orders2.length', () => {
		const orders1: Order = {
			items: ['1', '2'],
		};

		const orders2: Order = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(orders1, orders2);
		expect(result).toEqual(0);
	});

	it('orders1.length > orders2.length', () => {
		const orders1: Order = {
			items: ['1', '2', '3'],
		};

		const orders2: Order = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(orders1, orders2);
		expect(result).toEqual(1);
	});
});

describe('sortByDate function', () => {
	it.each([
		{
			orders1: {},
			orders2: {},
		},
		{
			orders1: {
				date: 0,
			},
			orders2: {
				date: 0,
			},
		}
	])('empty order date №%#', (data) => {
		const result = sortByDate(data.orders1, data.orders2);
		expect(result).toEqual(0);
	});

	it('date1 < date2', () => {
		const orders1: Order = {
			date: 1
		};

		const orders2: Order = {
			date: 2
		};

		const result = sortByDate(orders1, orders2);
		expect(result).toEqual(1);
	});

	it('date1 = date2', () => {
		const orders1: Order = {
			date: 1
		};

		const orders2: Order = {
			date: 1
		};

		const result = sortByDate(orders1, orders2);
		expect(result).toEqual(0);
	});

	it('date1 > date2', () => {
		const orders1: Order = {
			date: 2
		};

		const orders2: Order = {
			date: 1
		};

		const result = sortByDate(orders1, orders2);
		expect(result).toEqual(-1);
	});
});

describe('getSortFunction function', () => {
	it('invalid function', () => {
		const result = getSortFunction('');
		expect(result).toBeUndefined();
	});

	it.each([
		'count',
		sortTypes.COUNT,
	])('get sortByDate №%#', (date) => {
		const result = getSortFunction(date);
		expect(result).toEqual(sortByItemCount);
	});

	it.each([
		'date',
		sortTypes.DATE,
	])('get sortByDate №%#', (date) => {
		const result = getSortFunction(date);
		expect(result).toEqual(sortByDate);
	});
});

describe('sortOrders function', () => {
	it('empty orders', () => {
		const result = sortOrders([], undefined);
		expect(result).toBeUndefined();
	});

	test.each([
		undefined,
		null,
		{},
		[],
	])('not valid sort function №%#', (data) => {
		const result = sortOrders([{}, {}], data);
		expect(result).toBeUndefined();
	});

	it('valid sort function', () => {
		const func = jest.fn();
		sortOrders([{}, {}], func);
		expect(func).toHaveBeenCalledTimes(1);
	});
});
