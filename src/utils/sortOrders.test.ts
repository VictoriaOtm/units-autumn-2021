import * as sortOrders from './sortOrders';
import {sortByItemCount} from './sortOrders';

describe('sortByItemCount function', () => {
	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortOrders.sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('first least', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortOrders.sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('second least', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortOrders.sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('first no items', () => {
		const order1 = {
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortOrders.sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('second no items', () => {
		const order2 = {
		};

		const order1 = {
			items: ['1', '2'],
		};

		const result = sortOrders.sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});


describe('sortByDate function', () => {
	it('same date count', () => {
		const order1 = {
			date: 11
		};

		const order2 = {
			date: 11
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('first least', () => {
		const order1 = {
			date: 1
		};

		const order2 = {
			date: 11
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(1);
	});

	it('second least', () => {
		const order1 = {
			date: 11
		};

		const order2 = {
			date: 1
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(-1);
	});

	it('zero date first', () => {
		const order1 = {
			date: 0
		};

		const order2 = {
			date: 1
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('zero date second', () => {
		const order1 = {
			date: 1
		};

		const order2 = {
			date: 0
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('order1 date does not exist', () => {
		const order1 = {};

		const order2 = {
			date: 1
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(0);
	});

	it('order2 date does not exist', () => {
		const order2 = {};

		const order1 = {
			date: 1
		};

		const result = sortOrders.sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortOrders function', () => {
	it('function called', () => {
		const orders = [
			{
				items: ['item1', 'item2'],
			},
			{
				items: ['1', '2'],
			}
		];


		const fun = jest.fn();
		sortOrders.sortOrders(orders, fun);
		expect(fun).toHaveBeenCalled();
	});

	it('function not called', () => {
		const orders = [];

		const fun = jest.fn();
		sortOrders.sortOrders(orders, fun);
		expect(fun).not.toHaveBeenCalled();
	});
});
