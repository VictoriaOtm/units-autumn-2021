import {getSortFunction, sortByItemCount, sortByDate, sortTypes, sortOrders} from './sortOrders';

describe('sortOrders', () => {
	it('valid sort function', () => {
		const func = jest.fn();
		sortOrders([{}, {}], func);
		expect(func).toHaveBeenCalledTimes(1);
	});

	it('valid sort function', () => {
		const func = jest.fn();
		sortOrders([], func);
		expect(func).toHaveBeenCalledTimes(0);
	});

	test.each([
		undefined,
		null,
	])('invalid sort function', (sortFunction) => {
		const result = sortOrders([{}, {}], sortFunction);
		expect(result).toBeUndefined();
	});
});

describe('getSortFunction', () => {
	it('sortType = DATE', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});

	it('sortType = COUNT', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});
});

describe('sortByItemCount function', () => {
	test.each([
		[{}, { items: ['3', '2', '1'] }],
		[{ items: ['3', '2', '1'] }, {}],
	])('undefined orders', (order1, order2) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});

	test.each([
		[{ items: [] }, { items : [] }],
		[{ items: ['3', '2', '1'] }, { items : ['item1', 'item2', 'item3'] }],
	])('same items count', (order1, order2) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});

	test.each([
		[{ items: [] }, { items : ['3', '2', '4', '1'] }],
		[{ items: ['3', '2'] }, { items : ['item1', 'item2', 'item3'] }],
	])('first order less than second order', (order1, order2) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(-1);
	});

	test.each([
		[{ items: ['3', '2', '4', '1'] }, { items : [] }],
		[{ items: ['item1', 'item2', 'item3'] }, { items : ['3', '2'] }],
	])('second order less than first order', (order1, order2) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(1);
	});
});

describe('sortByDate function', () => {
	test.each([
		[{}, { date: 1 }],
		[{ date: 3 }, {}],
	])('undefined date', (order1, order2) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});

	test.each([
		[{}, { date: 0 }],
		[{ date: 0 }, {}],
	])('date = 0', (order1, order2) => {
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});

	it('same date', ()=> {
		const order1 = { date: 343 }, order2 = { date: 343 };
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});

	it('first date less than second date', ()=> {
		const order1 = { date: 1 }, order2 = { date: 2 };
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});

	it('second date less than first date', ()=> {
		const order1 = { date: 1 }, order2 = { date: 2 };
		const result = sortByItemCount(order1, order2);
		expect(result).toBe(0);
	});
});

