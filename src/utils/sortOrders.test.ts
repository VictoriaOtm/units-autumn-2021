import { getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes } from './sortOrders';
import {Order} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('1 has more than 2', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('2 has more than 1', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('no items', () => {
		const order1 = {
		};

		const order2 = {
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

});

describe('sortByDate', () => {
	it('same', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 1,
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});

	it('1 later than 2', () => {
		const order1 = {
			date: 2,
		};
		const order2 = {
			date: 1,
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(-1);
	});

	it('2 later than 1', () => {
		const order1 = {
			date: 1,
		};
		const order2 = {
			date: 2,
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(1);
	});
	it('no date', () => {
		const order1 = {
		};
		const order2 = {
		};
		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	});
});

describe('getSortFunction', () => {
	it('by count', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});
	it('by date', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});
});

describe('sort', () => {
	it('can_sort', () => {
		const orders = [{
			date: 1,
		},
		{
			date: 1,
		}];
		const oldOrders = [...orders];
		sortOrders(orders, sortByDate);
		expect(orders).toStrictEqual(oldOrders);
	});
	it('cant sort no function', () => {
		const orders = [{
			date: 1,
		},
		{
			date: 1,
		}];
		const oldOrders = [...orders];
		sortOrders(orders, undefined);
		expect(orders).toStrictEqual(oldOrders);
	});
	it('cant sort another function', () => {
		const orders = [{
			date: 1,
		},
		{
			date: 1,
		}];
		const oldOrders = [...orders];
		sortOrders(orders, () => {
			const x = 0;
		});
		expect(orders).toStrictEqual(oldOrders);
	});
	it('cant sort no orders', () => {
		const orders: Order[] = [];
		sortOrders(orders, sortByDate);
		expect(orders).toStrictEqual([]);
	});
});
