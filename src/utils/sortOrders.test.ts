import {sortByItemCount, sortByDate, sortTypes, getSortFunction, sortOrders} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	test.each([
		[
			{
				items: ['item1', 'item2'],
			},
			{
				items: ['1', '2'],
			}
		],
		[
			{
				items: [],
			},
			{
				items: [],
			}
		],
	])('same items count', (order1, order2) => {
		expect(sortByItemCount(order1, order2)).toBe(0);
	});

	test.each([
		[
			{
				items: ['item1', 'item2', 'item3'],
			},
			{
				items: ['1', '2'],
			}
		],
		[
			{
				items: ['item1', 'item2',],
			},
			{
				items: [],
			}
		],
	])('more items in first order', (order1, order2) => {
		expect(sortByItemCount(order1, order2)).toBe(1);
	});

	test.each([
		[
			{
				items: ['item1', 'item2', 'item3'],
			},
			{
				items: ['1', '2', '3', '4'],
			}
		],
		[
			{
				items: [],
			},
			{
				items: ['1', '2', '3', '4'],
			}
		],
	])('more items in second order', (order1, order2) => {
		expect(sortByItemCount(order1, order2)).toBe(-1);
	});

	it('without orders', () => {
		const order1 = undefined;

		const order2 = undefined;

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('without items in orders', () => {
		const order1 = {
			withoutItems: 0,
		};

		const order2 = {
			withoutItems: 0,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

});

describe('sortByDate function', () => {
	test.each([
		[
			{
				date: 1652585550000,
			},
			{
				date: 1652585550000,
			}
		],
		[
			{
				date: 1544356800000,
			},
			{
				date: 1544356800000,
			}
		],
	])('same date', (order1, order2) => {
		expect(sortByDate(order1, order2)).toBe(0);
	});

	test.each([
		[
			{
				date: 1652585550000,
			},
			{
				date: 1544356800000,
			}
		],
		[
			{
				date: 1544356800001,
			},
			{
				date: 1544356800000,
			}
		],
	])('first date later', (order1, order2) => {
		expect(sortByDate(order1, order2)).toBe(-1);
	});

	test.each([
		[
			{
				date: 1652585550000,
			},
			{
				date: 2652585550000,
			}
		],
		[
			{
				date: 1544356800000,
			},
			{
				date: 1652585550000,
			}
		],
	])('second date later', (order1, order2) => {
		expect(sortByDate(order1, order2)).toBe(1);
	});

	it('without orders', () => {
		const order1 = undefined;

		const order2 = undefined;

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('without data in orders', () => {
		const order1 = {
			withoutDate: 0,
		};

		const order2 = {
			withoutDate: 0,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	it('called sort func', () => {
		const sortFunc = jest.fn();

		sortOrders(fakeOrders, sortFunc);

		expect(sortFunc).toBeCalled();
	});

	it('without orders func', () => {
		const sortFunc = jest.fn();

		sortOrders([], sortFunc);

		expect(sortFunc).toBeCalledTimes(0);
	});

	it('without order func', () => {

		const firstOrders = [...fakeOrders];
		const secondOrders = [...fakeOrders];

		sortOrders(firstOrders, {});

		expect(firstOrders).toStrictEqual(secondOrders);
	});
});

