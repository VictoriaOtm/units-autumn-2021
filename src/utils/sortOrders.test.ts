import {getSortFunction, sortByDate, sortByItemCount, sortOrders} from './sortOrders';
import {sortTypes} from './sortOrders';
import {fakeOrders, Order} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	it('No order', () => {
		const orders: Order[] = [
			{
			},
			{
				id: 123,
				date: 1544356800000,
				shop: 'Alihandro Express',
				items: [
					'Утиный пластмасса для показ новый год',
					'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
					'Новый стиль один розница яйцо для упаковки форма латекс',
				]
			}
		];

		const result = sortByItemCount(orders[0], orders[1]);

		expect(result).toBe(0);
	});
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
	it('No order', () => {
		const orders: Order[] = [
			{
			},
			{
				id: 123,
				date: 1544356800000,
				shop: 'Alihandro Express',
				items: [
					'Утиный пластмасса для показ новый год',
					'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
					'Новый стиль один розница яйцо для упаковки форма латекс',
				]
			}
		];

		const result = sortByDate(orders[0], orders[1]);

		expect(result).toBe(0);
	});
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

	it('sortFunc not func', () => {
		const sortFunc = 'not func';
		const res = sortOrders(fakeOrders, sortFunc);
		expect(res).toBe(undefined);
	});

	it('0 orders', () => {
		const orders: Order[] = [
		];
		const sortFunc = jest.fn();
		const res = sortOrders(orders, sortFunc);
		expect(res).toBe(undefined);
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
