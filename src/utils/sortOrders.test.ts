import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	it('same orders items length ', () => {
		const order1 = {
			items: ['item1', 'item2']
		};

		const order2 = {
			items: ['1', '2']
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('order1.length > order2.length ', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3']
		};

		const order2 = {
			items: ['1', '2']
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('order1.length < order2.length ', () => {
		const order1 = {
			items: ['item1', 'item2']
		};

		const order2 = {
			items: ['1', '2', '3', '4']
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	test.each([
		{first: {item: undefined}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2', 'item3']}, second: {items: undefined}, expected: 0},	
		{first: {items: ['']}, second: {items: ['a']}, expected: 0},
		{first: {}, second: {}, expected: 0},	
		{first: {date: 1652481120000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2', 'item3']}, second: {date: 1652481120000}, expected: 0},	
	])('uncorrect orders item', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
	});
});

describe('sortByDate function', () => {
	it('date1 = date2 ', () => {
		const order1 = {
			date: 1652481120000
		};

		const order2 = {
			date: 1652481120000
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('date1 > date2 ', () => {
		const order1 = {
			date: 1652585550000
		};

		const order2 = {
			date: 1652481120000
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('order1.length < order2.length ', () => {
		const order1 = {
			date: 1544356800000
		};

		const order2 = {
			date: 1652585550000
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});

	test.each([
		{first: {}, second: {}, expected: 0},
		{first: {date: undefined}, second: {}, expected: 0},
		{first: {date: 1652481120000}, second: {date: undefined}, expected: 0},	
		{first: {date: -123}, second: {date: -67}, expected: 0},
		{first: {date: 1652481120000}, second: {items: ['1', '2']}, expected: 0},
		{first: {items: ['item1', 'item2', 'item3']}, second: {date: 1652481120000}, expected: 0},			
	])('uncorrect orders date', ({first, second, expected}) => {
		expect(sortByItemCount(first, second)).toBe(expected);
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
		{orders: [], sortFunction: sortByItemCount},
		{orders: [{date: 1652481120000}, {date: 1652481120000}], sortFunction: undefined},	
		{orders: [{date: 1652481120000}, {date: 1652481120000}], sortFunction: ['notFunction']},		
	])('uncorrect dates', ({orders, sortFunction}) => {
		expect(sortOrders(orders, sortFunction)).toBeUndefined();
	});


	it('valid dates', () => {
		const func = jest.fn();
		sortOrders([{}, {}], func);
		expect(func).toHaveBeenCalledTimes(1);
	});
	
});





