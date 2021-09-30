import {getSortFunction, sortByDate, sortByItemCount, sortOrders} from './sortOrders';
import {sortTypes} from './sortOrders';
import {fakeOrders, Order} from '../data/fakeOrders';

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
	it('not same items count case 1', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});
	it('not same items count case -1', () => {
		const order1 = {
			items: ['item1'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('undefined items', () => {
		const order1 = {
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	it('same date count', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
	it('not same date case 1', () => {
		const order1 = {
			date: 2,
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(-1);
	});
	it('not same date case -1', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 2,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(1);
	});

	it('undefined items', () => {
		const order1 = {
		};

		const order2 = {
			date: 1,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(0);
	});
});


describe('sortOrders function', () => {
	it('sortFunc should be called', () => {
		const sortFunc = jest.fn();
		sortOrders(fakeOrders, sortFunc);
		expect(sortFunc).toBeCalled();
	});

	it('sortFunc shouldn`t be called', () => {
		const sortFunc = jest.fn();
		const emptyOrders: Order[] = [{}];
		sortOrders(emptyOrders, sortFunc);
		expect(sortFunc).not.toBeCalled();
	});
});

describe('sortByOrder function', () => {
	it('undefined', () => {
		const res = getSortFunction('');
		expect(res).toBeUndefined();
	});

	it.each([
		'count',
		sortTypes.COUNT,
	])('sortByItemCount case', (date) => {
		const result = getSortFunction(date);
		expect(result).toEqual(sortByItemCount);
	});

	it.each([
		'date',
		sortTypes.DATE,
	])('sortByDate case', (date) => {
		const result = getSortFunction(date);
		expect(result).toEqual(sortByDate);
	});
});
