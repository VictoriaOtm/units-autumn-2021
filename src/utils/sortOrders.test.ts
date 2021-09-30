import {sortByItemCount} from './sortOrders';
import {sortOrders} from './sortOrders';
import {Order} from '../data/fakeOrders';
import {sortByDate} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortTypes} from './sortOrders';


describe('sortByItemCount function', () => {
	test.each([
		{order1: {items: ['item1', 'item2']}, order2: {items: ['1', '2']}, expected: 0},
		{order1: {}, order2: {}, expected: 0},
		
	])('.add($order1, $order2)', ({order1, order2, expected}) => {
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
		expect(result).toBe(undefined);
	});
});

describe('sortByDate function', () => {
	it('empty date', () => {
		const order1: Order = {
			id: 1,
			shop: 'kek',
			items: ['pochemu', 'ts', 'daite', 'go']
		};

		const order2: Order = {
			id: 1,
			shop: 'kek',
			items: ['pochemu', 'ts', 'daite', 'go']
		};
		
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});

	it('date1 > date2', () => {
		const order1: Order = {
			id: 1,
			shop: 'kek',
			date: 2,
			items: ['pochemu', 'ts', 'daite', 'go']
		};

		const order2: Order = {
			id: 1,
			shop: 'kek',
			date: 1,
			items: ['pochemu', 'ts', 'daite', 'go']
		};
		
		const result = sortByDate(order1, order2);
		expect(result).toBe(-1);
	});

	it('date1 = date2', () => {
		const order1: Order = {
			id: 1,
			shop: 'kek',
			date: 2,
			items: ['pochemu', 'ts', 'daite', 'go']
		};

		const order2: Order = {
			id: 1,
			shop: 'kek',
			date: 2,
			items: ['pochemu', 'ts', 'daite', 'go']
		};
		
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});
});

describe('getSortFunction test', () => {
	test.each([
		{result: getSortFunction(sortTypes.DATE), expected: sortByDate},
		{result: getSortFunction(sortTypes.COUNT), expected: sortByItemCount},
	])('return $expected', ({result, expected}) => {
		expect(result).toBe(expected);
	});
});
