import { Order } from '../data/fakeOrders';
import {sortByItemCount} from './sortOrders';
import {sortByDate, getSortFunction, sortOrders} from './sortOrders';
import {sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('orders with undefined items', () => {
		const order1 = {
			items: undefined,
		};

		const order2 = {
			items: undefined,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});


	test.each([
		[{items:['1', '2']}, {items:['1', '2', '3']}, -1],
		[{}, {}, 0],
		[{items:['1','2','3']},{items:['1','2']}, 1],
		[{items:['1','2','3']},{items:['1','2', '3']}, 0],
		[null, null, 0]
	])('test with different values', (first, second, expected) => {
		const result = sortByItemCount(first, second);
		expect(result).toBe(expected);
	});
});


describe('sortByDate function', () => {
	

	test.each([
		[{date:undefined}, {date:undefined}, 0],
		[{date:1}, {date:2}, 1],
		[{date:2}, {date:2}, 0],
		[{date:2}, {date:1}, -1],
		[{}, {}, 0],
	])('test with different values', (first, second, expected) => {
		const result = sortByDate(first, second);
		expect(result).toBe(expected);
	});

});

describe('getSortFunction function', () => {
	
	it('sortByDate', () => {
		
		const result = getSortFunction(sortTypes.DATE);

		expect(result).toBe(sortByDate);
	});

	it('sortByItemCount', () => {
		
		const result = getSortFunction(sortTypes.COUNT);

		expect(result).toBe(sortByItemCount);
	});

});

describe('sortOrders function', () => {
	it('correct sortOrders', () => {
		
		const orders: Order[] = [{'date':2}, {'date':1}];

		sortOrders(orders, sortByDate);

		expect(orders).toStrictEqual([{'date':2}, {'date':1}]);
	});


	test.each([
		{orders: [], func: sortByItemCount, expected: undefined},
	])('test with different values', ({orders, func, expected}) => {
		const result = sortOrders(orders, func);
		expect(result).toBe(expected);
	});

});

