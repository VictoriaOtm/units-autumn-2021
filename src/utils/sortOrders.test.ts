import {sortOrders, sortByItemCount, sortByDate, getSortFunction, sortTypes} from './sortOrders';

describe.each([
	[undefined, ['1', '2'], 0],
	[['1', '2'], undefined, 0],
	[['item1', 'item2'], ['100', '200'], 0],
	[['1', '2'], ['1', '2', '3'], -1],
	[['1', '2', '3'], ['1', '2'], 1],
])('sortByItemCount function', (itemsFirstOrder, itemsSecondOrder, expected) => {
	it('first order\'s items: %i, second order\'s items: %i', () => {
		const order1 = {
			items: itemsFirstOrder,
		};
		const order2 = {
			items: itemsSecondOrder,
		};

		expect(sortByItemCount(order1, order2)).toBe(expected);
	});
});

describe('getSortFunction tests', () => {
	it('sortType: COUNT', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});

	it('sortType: DATE', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});
});

describe.each([
	[undefined, 1, 0],
	[1, undefined, 0],
	[1, 1, 0],
	[1, 2, 1],
	[2, 1, -1],
])('sortByDate function', (dateFirstOrder, dateSecondOrder, expected) => {
	it('first order\'s date: %i, second order\'s date: %i', () => {
		const order1 = {
			date: dateFirstOrder,
		};
		const order2 = {
			date: dateSecondOrder,
		};

		expect(sortByDate(order1, order2)).toBe(expected);
	});
});

describe('making sure .sort() is called', () => {
	it('parameter sortFunction is not of type \'function\'', () => {
		const order1 = {
			items: ['3', '4', '5'],
			date: 2,
		};
		const order2 = {
			items: ['1', '2'],
			date: 1,
		};
		const orders = [order1, order2];
		const ordersCopy = [...orders];

		sortOrders(orders, undefined);

		expect(orders).toEqual(ordersCopy);
	});

	it('correct sorting by count', () => {
		const order1 = {
			items: ['3', '4', '5'],
			date: 2,
		};
		const order2 = {
			items: ['1', '2'],
			date: 1,
		};
		const orders = [order1, order2];
		const ordersExpected = [order2, order1];

		sortOrders(orders, sortByItemCount);

		expect(orders).toEqual(ordersExpected);
	});

	it('correct sorting by date', () => {
		const order1 = {
			items: ['1', '2'],
			date: 1,
		};
		const order2 = {
			items: ['3', '4', '5'],
			date: 2,
		};
		const orders = [order1, order2];
		const ordersExpected = [order2, order1];

		sortOrders(orders, sortByDate);

		expect(orders).toEqual(ordersExpected);
	});
});
