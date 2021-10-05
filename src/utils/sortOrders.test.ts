import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders';


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

	it('null items in objects', () => {
		const order1 = {
			items: null
		};
		const order2 = {
			items: null
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(0);
	});

	it('items in order1 > items in order2', () => {
		const order1 = {
			items: [1, 2, 3]
		};
		const order2 = {
			items: [1, 2]
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(1);
	});

	it('items in order1 < items in order2', () => {
		const order1 = {
			items: [1, 2]
		};
		const order2 = {
			items: [1, 2, 3]
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(-1);
	});

	it('items in order1 = items in order2', () => {
		const order1 = {
			items: [1]
		};
		const order2 = {
			items: [1]
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(0);
	});
});

describe('sortByDate function', () => {
	it('null date in orders', () => {
		const order1 = {
			date: null
		};
		const order2 = {
			date: null
		};
		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});

	it('date in order1 < date in order2', () => {
		const order1 = {
			date: 2
		};
		const order2 = {
			date: 3
		};
		const result = sortByDate(order1, order2);
		expect(result).toEqual(1);
	});


	it('date in order1 > date in order2', () => {
		const order1 = {
			date: 3
		};
		const order2 = {
			date: 2
		};
		const result = sortByDate(order1, order2);
		expect(result).toEqual(-1);
	});

	it('date in order1 = date in order2', () => {
		const order1 = {
			date: 3
		};
		const order2 = {
			date: 3
		};
		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});
});

describe('sortOrders function', () => {
	test.each([
		[null, ()=>{return '';}],
		[[1, 2, 3, 4], null],
	])('not valid case', (orders, sort) => {
		const result = sortOrders(orders, sort);
		expect(result).toBeUndefined();
	});

	it('sort in orders', () => {
		const func = jest.fn();
		sortOrders([{}, {}], func);
		expect(func).toHaveBeenCalledTimes(1);
	});
});

describe('getSortFunction function', () => {
	it('sortType = count', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toBe(sortByItemCount);
	});

	it('sortType = date', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toBe(sortByDate);
	});
	
	
	it('sortType invalid', () => {
		const result = getSortFunction('');
		expect(result).toBeUndefined();
	});
});
