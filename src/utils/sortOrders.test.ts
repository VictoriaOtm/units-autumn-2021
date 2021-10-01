import {sortByItemCount, sortByDate, getSortFunction, sortOrders, sortTypes} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders';



describe('sortByDate function', () => {
	it('same date', () => {
		const firstOrder = {
			date: 1,
		};

		const secondOrder = {
			date: 1,
		};

		expect(sortByDate(firstOrder, secondOrder)).toBe(0);
	});

	it('first orders date is bigger, than second one', () => {
		const firstOrder = {
			date: 2,
		};

		const secondOrder = {
			date: firstOrder.date - 1,
		};

		expect(sortByDate(firstOrder, secondOrder)).toBe(-1);
	});

	it('first orders date is less, than second one', () => {
		const secondOrder = {
			date: 2,
		};

		const firstOrder = {
			date: secondOrder.date - 1,
		};

		expect(sortByDate(firstOrder, secondOrder)).toBe(1);
	});

	it('no "date" field in one of orders', () => {
		const secondOrder = {
			date: 2,
		};

		const firstOrder = {
			items: ['firstItem'],
		};

		expect(sortByDate(firstOrder, secondOrder)).toBe(0);
	});
});

describe('sortByItemCount function', () => {
	it('same amount of items', () => {
		const firstOrder = {
			items: ['firstItem', 'secondItem', 'thirdItem'],
		};

		const secondOrder = {
			items: [...firstOrder.items]
		};

		expect(sortByItemCount(firstOrder, secondOrder)).toBe(0);
	});

	it('first order has more items, than second', () => {
		const firstOrder = {
			items: ['firstItem', 'secondItem', 'thirdItem'],
		};

		const secondOrder = {
			items: firstOrder.items.slice(0, firstOrder.items.length - 1),
		};
		expect(sortByItemCount(firstOrder, secondOrder)).toBe(1);
	});

	it('second order has more items, than first', () => {
		const secondOrder = {
			items: ['firstItem', 'secondItem', 'thirdItem'],
		};

		const firstOrder = {
			items: secondOrder.items.slice(0, secondOrder.items.length - 1),
		};

		expect(sortByItemCount(firstOrder, secondOrder)).toBe(-1);
	});

	it('no "items" field in one of orders', () => {
		const secondOrder = {
			items: ['firstItem', 'secondItem', 'thirdItem'],
		};

		const firstOrder = {
			date: 1,
		};

		expect(sortByItemCount(firstOrder, secondOrder)).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it('DATE sort type', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});

	it('COUNT sort type', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
});

describe('sortOrders function', () => {
	it('empty orders array', () => {
		expect(sortOrders([], jest.fn())).toBe(undefined);
	});

	it('null instead of function', () => {
		expect(sortOrders([{date: 1}], null)).toBe(undefined);
	});
});
