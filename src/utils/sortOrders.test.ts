import {sortByItemCount} from './sortOrders';
import {sortOrders} from './sortOrders';
import {Order} from '../data/fakeOrders';
import {sortByDate} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortTypes} from './sortOrders';


describe('sortByItemCount function', () => {
	test.each([
		{	
			order1: {items: ['item1', 'item2']}, 
			order2: {items: ['1', '2']}, 
			expected: 0,
		},
		{
			order1: {}, 
			order2: {}, 
			expected: 0,
		},
		
	])('sort by item count tests', ({order1, order2, expected}) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});

describe('sortOrders function', () => {
	it('empty orders', () => {
		const result = sortOrders([], null);
		expect(result).toBe(undefined);
	});

	it('sortFunction !== function', () => {
		const order: Order[] = [];
		order.push( {
			id: 1,
			date: 228,
			shop: 'kek',
			items: ['pochemu', 'ts', 'daite', 'go']
		});
		const result = sortOrders(order, 228);
		expect(result).toBeUndefined;
	});
});

describe('sortByDate function', () => {
	test.each([
		{
			orders: [
				{id: 1, shop: 'kek', items: ['pochemu', 'ts', 'daite', 'go']},
				{id: 1, shop: 'kek', items: ['pochemu', 'ts', 'daite', 'go']},
			],
			expected: 0,
		},
		{
			orders: [
				{id: 1, shop: 'kek', items: ['pochemu', 'ts', 'daite', 'go'], date: 2},
				{id: 1, shop: 'kek', items: ['pochemu', 'ts', 'daite', 'go'], date: 1},
			],
			expected: -1,
		},
		{
			orders: [
				{id: 1, shop: 'kek', items: ['pochemu', 'ts', 'daite', 'go'], date: 228},
				{id: 1, shop: 'kek', items: ['pochemu', 'ts', 'daite', 'go'], date: 228},
			],
			expected: 0,
		},
	])('bad order and bad item', ({orders, expected}) => {
		const result = sortByDate(orders[0], orders[1]);
		expect(result).toBe(expected);
	});
});

describe('getSortFunction test', () => {
	test.each([
		{
			result: getSortFunction(sortTypes.DATE), 
			expected: sortByDate},
		{
			result: getSortFunction(sortTypes.COUNT), 
			expected: sortByItemCount
		},
	])('return $expected', ({result, expected}) => {
		expect(result).toBe(expected);
	});
});
