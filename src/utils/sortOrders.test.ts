import {getSortFunction, sortByDate, sortByItemCount, sortOrders} from './sortOrders';
import {sortTypes} from './sortOrders';
import {fakeOrders, Order} from '../data/fakeOrders';

describe('Check sortByItemCount function', () => {
	test.each([
		[['item1', 'item2'], ['1', '2'], 0],
		[['item1'], ['1', '2'], -1],
		[['item1', 'item2'], ['1'], 1],
		[undefined, ['1', '2'], 0],
		[['item1', 'item2'], undefined, 0],
	])('sortByItemCount for 2 orders', (items1, items2, expected) => {
		const order1 = {
			items: items1,
		};

		const order2 = {
			items: items2,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(expected);
	});

	test.each([
		[undefined, {items: ['1', '2']}, 0],
		[{items: ['item1', 'item2']}, undefined, 0],
	])('sortByItemCount for 2 orders where 1 doesn\'t exists', (order1, order2, expected) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('Check sortByDate function', () => {
	test.each([
		[1, 1, 0],
		[1, 2, 1],
		[2, 1, -1],
		[undefined, 1, 0],
		[1, undefined, 0],
		[0, 1, 0],
		[1, 0, 0]
	])('sortByDate all cases with two orders', (items1, items2, expected) => {
		const order1 = {
			date: items1,
		};

		const order2 = {
			date: items2,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(expected);
	});

	test.each([
		[undefined, {date: 1}, 0],
		[{date: 1}, undefined, 0],
	])('sortByDate one order does not exist', (order1, order2, expected) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('Check sortOrders function', () => {
	it('sortFunc should be called', () => {
		const sortFunc = jest.fn();
		sortOrders(fakeOrders, sortFunc);
		expect(sortFunc).toBeCalled();
	});

	it('sortFunc is not a func', () => {
		const sortFunc = 'not func';
		const res = sortOrders(fakeOrders, sortFunc);
		expect(res).toBe(undefined);
	});

	it('0 orders provided', () => {
		const orders: Order[] = [
		];
		const sortFunc = jest.fn();
		const res = sortOrders(orders, sortFunc);
		expect(res).toBe(undefined);
	});

	it('sortFunc shouldn`t be called', () => {
		const sortFunc = jest.fn();
		const emptyOrders: Order[] = [{}];
		sortOrders(emptyOrders, sortFunc);
		expect(sortFunc).not.toBeCalled();
	});
});

describe('Check getSortFunction function', () => {
	it('undefined provided', () => {
		const res = getSortFunction('');
		expect(res).toBeUndefined();
	});

	it.each([
		'count',
		sortTypes.COUNT,
	])('sortByItemCount case provided', (date) => {
		const result = getSortFunction(date);
		expect(result).toEqual(sortByItemCount);
	});

	it.each([
		'date',
		sortTypes.DATE,
	])('sortByDate case provided', (date) => {
		const result = getSortFunction(date);
		expect(result).toEqual(sortByDate);
	});
});
