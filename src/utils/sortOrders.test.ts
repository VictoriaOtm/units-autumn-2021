import { getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes } from './sortOrders';

describe('sortByItemCount function', () => {
	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2']
		};
		const order2 = {
			items: ['1', '2']
		};
		expect(sortByItemCount(order1, order2)).toBe(0);
	});
	it('Order1 > oreder 2', () => {
		const order1 = {
			items: ['item1', 'item2']
		};
		const order2 = {
			items: ['1']
		};
		expect(sortByItemCount(order1, order2)).toBe(1);
	});
	it('Order1 < oreder 2', () => {
		const order1 = {
			items: ['item1', 'item2']
		};
		const order2 = {
			items: ['1', '2', '3']
		};
		expect(sortByItemCount(order1, order2)).toBe(-1);
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
	test.each([{ order1: { items: {} }, order2: { items: {} }, expected: 0 }])(
		'Некорректный items',
		({ order1, order2, expected }) => {
			expect(sortByItemCount(order1, order2)).toBe(expected);
		}
	);
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
	test.each([{ order1: { date: {} }, order2: { date: {} }, expected: 0 }])(
		'Некорректный dates',
		({ order1, order2, expected }) => {
			expect(sortByDate(order1, order2)).toBe(expected);
		}
	);
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
		{ sortType: 'asdasd', expected: undefined },
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
		{ order: null, sortFunction: {}, expected: null },
		{ order: {}, sortFunction: {}, expected: {} },
		{ order: [], sortFunction: sortByDate, expected: [] },
		{ order: null, sortFunction: sortByDate, expected: null }
	])('Тест некорректных варивантов', ({ order, sortFunction, expected }) => {
		sortOrders(order, sortFunction);
		expect(order).toStrictEqual(expected);
	});
	describe('sort by count', () => {
		const sort = [
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
		];
		test.each([
			{
				orders: [
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
				],
				sortType: sortTypes.COUNT,
				expected: sort
			},
			{
				orders: [
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
				],
				sortType: sortTypes.COUNT,
				expected: sort
			},
			{
				orders: [
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
				],
				sortType: sortTypes.COUNT,
				expected: sort
			}
		])('Тест сортировки', ({ orders, sortType, expected }) => {
			const sortFunction = getSortFunction(sortType);
			sortOrders(orders, sortFunction);
			expect(orders).toStrictEqual(expected);
		});
	});
	describe('sort by date', () => {
		const sort = [
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
		];
		test.each([
			{
				orders: [
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
				],
				sortType: sortTypes.DATE,
				expected: sort
			},
			{
				orders: [
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
				],
				sortType: sortTypes.DATE,
				expected: sort
			},
			{
				orders: [
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
				],
				sortType: sortTypes.DATE,
				expected: sort
			}
		])('Тест сортировки', ({ orders, sortType, expected }) => {
			const sortFunction = getSortFunction(sortType);
			sortOrders(orders, sortFunction);
			expect(orders).toStrictEqual(expected);
		});
	});
});
