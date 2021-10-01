import { getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes } from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		{
			order1: {
				items: ['item1', 'item2']
			},
			order2: { items: ['1', '2'] },
			expected: 0
		},
		{
			order1: {
				items: ['item1', 'item2']
			},
			order2: { items: ['1'] },
			expected: 1
		},
		{
			order1: {
				items: ['item1', 'item2']
			},
			order2: { items: ['1', '2', '3'] },
			expected: -1
		}
	])('Корректные заказы', ({ order1, order2, expected }) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});

	test.each([
		{ order1: null, order2: null, expected: 0 },
		{ order1: null, order2: {}, expected: 0 },
		{ order1: {}, order2: null, expected: 0 },
		{ order1: {}, order2: {}, expected: 0 },
		{ order1: { items: [] }, order2: {}, expected: 0 },
		{ order1: {}, order2: { items: [] }, expected: 0 },
		{ order1: { items: [] }, order2: { items: [] }, expected: 0 }
	])('Пустой заказ(ы)', ({ order1, order2, expected }) => {
		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
	it('Некорректный items', () => {
		expect(sortByItemCount({ items: {} }, { items: {} })).toBe(0);
	});
});

describe('sortByDate function', () => {
	const nowDate = new Date();
	const bigDate = new Date();
	bigDate.setFullYear(3000);

	it('same date', () => {
		const order1 = {
			date: nowDate
		};
		const order2 = {
			date: nowDate
		};
		expect(sortByDate(order1, order2)).toBe(0);
	});
	it('Order1 > oreder 2', () => {
		const order1 = {
			date: bigDate
		};
		const order2 = {
			date: nowDate
		};
		expect(sortByDate(order1, order2)).toBe(-1);
	});
	it('Order1 < oreder 2', () => {
		const order1 = {
			date: nowDate
		};
		const order2 = {
			date: bigDate
		};
		expect(sortByDate(order1, order2)).toBe(1);
	});
	test.each([
		{ order1: null, order2: null, expected: 0 },
		{ order1: null, order2: {}, expected: 0 },
		{ order1: {}, order2: null, expected: 0 },
		{ order1: {}, order2: {}, expected: 0 },
		{ order1: { date: {} }, order2: {}, expected: 0 },
		{ order1: {}, order2: { date: {} }, expected: 0 }
	])('Пустой заказ(ы)', ({ order1, order2, expected }) => {
		expect(sortByDate(order1, order2)).toBe(expected);
	});
	it('Некорректный dates', () => {
		expect(sortByDate({ date: {} }, { date: {} })).toBe(0);
	});
});

describe('getSortFunction function', () => {
	test.each([
		{ sortType: sortTypes.DATE, expected: sortByDate },
		{ sortType: sortTypes.COUNT, expected: sortByItemCount }
	])('Тест корректных выборов', ({ sortType, expected }) => {
		expect(getSortFunction(sortType)).toBe(expected);
	});
	test.each([
		{ sortType: '', expected: undefined },
		{ sortType: null, expected: undefined },
		{ sortType: {}, expected: undefined }
	])('Тест некорректных выборов', ({ sortType, expected }) => {
		expect(getSortFunction(sortType)).toBe(expected);
	});
});

describe('sortOrders function', () => {
	const nowDate = new Date();
	const bigDate = new Date();
	bigDate.setFullYear(3000);
	const smallDate = new Date();
	smallDate.setFullYear(1000);

	it('sortFunction not func', () => {
		const order = [{}];
		const sortType = sortTypes.COUNT;
		sortOrders(order, sortType);
		expect(order).toStrictEqual([{}]);
	});
	test.each([
		{ order: '', sortFunction: '', expected: '' },
		{ order: null, sortFunction: null, expected: null },
		{ order: [], sortFunction: null, expected: [] },
		{ order: [], sortFunction: sortByDate, expected: [] },
		{ order: null, sortFunction: sortByDate, expected: null }
	])('Тест некорректных варивантов', ({ order, sortFunction, expected }) => {
		sortOrders(order, sortFunction);
		expect(order).toStrictEqual(expected);
	});
	it('ort by count', () => {
		const orders = [
			{
				items: ['1', '2'],
				date: nowDate
			},
			{
				items: ['1'],
				date: bigDate
			},
			{
				items: [],
				date: smallDate
			}
		];
		const sortFunction = getSortFunction(sortTypes.COUNT);
		sortOrders(orders, sortFunction);
		expect(orders).toStrictEqual([
			{
				items: [],
				date: smallDate
			},
			{
				items: ['1'],
				date: bigDate
			},
			{
				items: ['1', '2'],
				date: nowDate
			}
		]);
	});

	it('sort by date', () => {
		const orders = [
			{
				items: ['1', '2'],
				date: nowDate
			},
			{
				items: ['1'],
				date: bigDate
			},
			{
				items: [],
				date: smallDate
			}
		];
		const sortFunction = getSortFunction(sortTypes.DATE);
		sortOrders(orders, sortFunction);
		expect(orders).toStrictEqual([
			{
				items: ['1'],
				date: bigDate
			},
			{
				items: ['1', '2'],
				date: nowDate
			},
			{
				items: [],
				date: smallDate
			}
		]);
	});
});
