import * as sortOrders from './sortOrders';
import {sortByItemCount} from "./sortOrders";

describe('sortByItemCount function', () => {
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

		const result = sortOrders.sortByItemCount(order1, order2);

		expect(result).toBe(expected);
	});

	test.each([
		[undefined, {items: ['1', '2']}, 0],
		[{items: ['item1', 'item2']}, undefined, 0],
	])('sortByItemCount for 2 orders where 1 doesn\'t exists', (order1, order2, expected) => {
		const result = sortOrders.sortByItemCount(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('sortByDate function', () => {
	test.each([
		[222, 222, 0],
		[111, 333, 1],
		[333, 111, -1],
		[0, 111, 0],
		[333, 0, 0],
		[undefined, 222, 0],
		[222, undefined, 0],
	])('sortByDate for 2 orders', (items1, items2, expected) => {
		const order1 = {
			date: items1,
		};

		const order2 = {
			date: items2,
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(expected);
	});

	test.each([
		[undefined, {date: 222}, 0],
		[{date: 222}, undefined, 0],
	])('sortByDate for 2 orders where 1 doesn\'t exists', (order1, order2, expected) => {
		const result = sortOrders.sortByDate(order1, order2);
		expect(result).toBe(expected);
	});
});

describe('sortOrders function', () => {
	it('function called', () => {
		const orders = [
			{ items: ['item1', 'item2'] },
			{ items: ['1', '2'] }
		];

		const fun = jest.fn();
		sortOrders.sortOrders(orders, fun);
		expect(fun).toHaveBeenCalled();
	});

	it('function not called', () => {
		const orders = [];

		const fun = jest.fn();
		sortOrders.sortOrders(orders, fun);
		expect(fun).not.toHaveBeenCalled();
	});

	it('function not exist', () => {
		const orders = [
			{ items: ['item1', 'item2'] },
			{ items: ['1', '2'] }
		];
		const expectedOrders = Object.assign(orders); // copy

		sortOrders.sortOrders(orders, undefined);
		expect(orders).toStrictEqual(expectedOrders);
	});

	it('changing orders', () => {
		const orders = [
			{ items: ['item1', 'item2', 'item3'] },
			{ items: ['1', '2'] }
		];
		const expectedOrders = [
			{ items: ['1', '2'] },
			{ items: ['item1', 'item2', 'item3'] }
		];

		sortOrders.sortOrders(orders, sortOrders.sortByItemCount);
		expect(orders).toStrictEqual(expectedOrders); // сравниваем не указатели, а внутренности массива
	});
});

describe('getSortFunction function', () => {
	it('function id sortByItemCount', () => {
		const sort = sortOrders.getSortFunction(sortOrders.sortTypes.COUNT);
		expect(sort).toBe(sortOrders.sortByItemCount);
	});

	it('function is sortByDate', () => {
		const sort = sortOrders.getSortFunction(sortOrders.sortTypes.DATE);
		expect(sort).toBe(sortOrders.sortByDate);
	});
});
