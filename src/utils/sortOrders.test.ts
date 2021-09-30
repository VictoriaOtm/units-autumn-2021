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

	it('count items in first order is more than in second order', () => {
		const order1 = {
			items: [1, 2, 3]
		};
		const order2 = {
			items: [1, 2]
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(1);
	});

	it('count items in first order is less than in second order', () => {
		const order1 = {
			items: [1, 2]
		};
		const order2 = {
			items: [1, 2, 3]
		};
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(-1);
	});

	it('count items in first order is equal than in second order', () => {
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

	it('date in first order is less than in second', () => {
		const order1 = {
			date: 2
		};
		const order2 = {
			date: 3
		};
		const result = sortByDate(order1, order2);
		expect(result).toEqual(1);
	});


	it('date in first order is more than in second', () => {
		const order1 = {
			date: 3
		};
		const order2 = {
			date: 2
		};
		const result = sortByDate(order1, order2);
		expect(result).toEqual(-1);
	});

	it('date in first order is equal than in second', () => {
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
		[null, null],
		[[1, 2, 3, 4], null],
	])('not valid case', (orders, sort) => {
		const result = sortOrders(orders, sort);
		expect(result).toBeUndefined();
	});

	it('sort in orders', () => {
		const orders = fakeOrders;
		const func = sortByItemCount;
		const result = sortOrders(orders, func);
		expect(orders).toEqual([
			{
				id: 100,
				date: 1588359900000,
				shop: 'Сбереги Мега Маркер',
				items: [],
			},
			{
				id: 126,
				date: 1652585550000,
				shop: 'Эльдоградо',
				items: [
					'Ноутбук Apple MacBook Air 13.3" (MQD32RU/A)',
					'Игровая приставка Sony PlayStation 4 Pro 1TB Black (CUH-7208B)',
				]
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
			},
			{
				id: 124,
				date: 1652481120000,
				shop: 'Lamodник.ru',
				items: [
					'Жакет - BOREAL5',
					'Miss Gabby Костюм',
					'Ostin перчатки мужские',
					'Zara худи роз.',
				]
			},
		]);
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
});
