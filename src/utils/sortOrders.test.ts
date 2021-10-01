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

	test.each([
		{first: {item: undefined}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2', 'item3']}, second: {items: undefined}, expected: 0},	
		{first: {items: ['']}, second: {items: ['a']}, expected: 0},	
	])('uncorrect orders item', ({first, second, expected}) => {
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

	test.each([
		{first: {date: undefined}, second: {}, expected: 0},
		{first: {date: 1652481120000}, second: {date: undefined}, expected: 0},	
		{first: {date: -123}, second: {date: -67}, expected: 0},		
	])('uncorrect orders date', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
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
	])('uncorrect dates', ({orders, sortFunction, expected}) => {
		expect(sortOrders(orders, sortFunction)).toBe(expected);
	});

	it('sortOrders by date', () => {
		const order = [{date: 1652481120000, shop: 'shop1'}, {date: 1652585550000, item: ['item1', 'item2']}];
		const result = [{date: 1652585550000, item: ['item1', 'item2']}, {date: 1652481120000, shop: 'shop1'}];

		sortOrders(order, sortByDate);

		expect(order).toStrictEqual(result);
	});

	it('sortOrders by count', () => {
		const order = [{items: ['item1'], shop: 'shop1'}, {date: 1652585550000, item: ['item1', 'item2']}];
		const result = [{items: ['item1'], shop: 'shop1'}, {date: 1652585550000, item: ['item1', 'item2']}];

		sortOrders(order, sortByItemCount);

		expect(order).toStrictEqual(result);
	});
});





