import {sortOrders, sortByItemCount, sortByDate, getSortFunction, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		[undefined, ['1', '2'], 0],
		[['1', '2'], undefined, 0],
		[['item1', 'item2'], ['100', '200'], 0],
		[['1', '2'], ['1', '2', '3'], -1],
		[['1', '2', '3'], ['1', '2'], 1],
	])('first order\'s items: %i, second order\'s items: %i', (itemsFirstOrder, itemsSecondOrder, expected) => {
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

describe('sortByDate function', () => {
	test.each([
		[undefined, 1, 0],
		[1, undefined, 0],
		[1, 1, 0],
		[1, 2, 1],
		[2, 1, -1],
	])('first order\'s date: %i, second order\'s date: %i', (dateFirstOrder, dateSecondOrder, expected) => {
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

		const sortFunc = jest.fn();

		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});
});
