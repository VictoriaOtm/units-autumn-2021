import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		{first: {items: ['item1', 'item2']}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2', 'item3']}, second: {items: ['1', '2']}, expected: 1},
		{first: {items: ['item1', 'item2']}, second: {items: ['1', '2', '3', '4']}, expected: -1},		
	])('sort items with orders', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});

	test.each([
		{first: {date: 1652481120000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2', 'item3']}, second: {date: 1652481120000}, expected: 0},
		{first: {date: 1652481120000}, second: {date: 1652481120000}, expected: 0},		
	])('sort items without orders', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});

	it('empty orders', () => {
		const order1 = {};

		const order2 = {};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	test.each([
		{first: {date: 1652481120000}, second: {date: 1652481120000}, expected: 0},
		{first: {date: 1652585550000}, second: {date: 1652481120000}, expected: -1},
		{first: {date: 1544356800000}, second: {date: 1652585550000}, expected: 1},
	])('sort items date', ({first, second, expected}) => {
		expect(sortByDate(first, second)).toBe(expected);
	});

	test.each([
		{first: {date: 1652481120000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2', 'item3']}, second: {date: 1652481120000}, expected: 0},
		{first: {date: 1652481120000}, second: {date: 1652481120000}, expected: 0},		
	])('sort items without date', ({first, second, expected}) => {
		expect(sortByDate(first, second)).toBe(expected);
	});

	it('empty orders', () => {
		const order1 = {};

		const order2 = {};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('getSortFunction function', () => {
	test.each([
		{order: sortTypes.COUNT, expected: 'sortByItemCount'},
		{order: sortTypes.DATE, expected: 'sortByDate'},
	])('function types', ({order, expected}) => {
		expect(getSortFunction(order)?.name).toBe(expected);
	});
});

describe('sortOrders function', () => {

	test.each([
		{orders: [], sortFunction: sortByItemCount, expected: undefined},
		{orders: [{date: 1652481120000}, {date: 1652481120000}], sortFunction: undefined, expected: undefined},	
		{orders: [{date: 1652481120000}, {date: 1652481120000}], sortFunction: ['notFunction'], expected: undefined},		
	])('correct dates', ({orders, sortFunction, expected}) => {
		expect(sortOrders(orders, sortFunction)).toBe(expected);
	});
});





