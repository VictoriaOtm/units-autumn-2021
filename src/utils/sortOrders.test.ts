import { type } from 'os';
import {getSortFunction, sortByDate, sortByItemCount, sortTypes, sortOrders} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders'

describe('sortByItemCount function', () => {
	it.each([
		{ 
			order1: { 
				items: fakeOrders[0].items
			},
			order2: { 
				items: fakeOrders[0].items
			},
			res: 0
		},
		{ 
			order1: { 
				items: fakeOrders[0].items
			}, 
			order2: {
				items: fakeOrders[1].items
			},
			res: -1
		},
		{ 
			order1: { 
				items: fakeOrders[1].items
			}, 
			order2: { 
				items: fakeOrders[0].items
			},
			res: 1
		},
		{	order1: { }, 
			order2: { },
			res: 0
		},
	])('same items count', (data) => {
		const result = sortByItemCount(data.order1, data.order2);
		expect(result).toBe(data.res);
	});
});

describe.each(
	[
		{
			type: sortTypes.COUNT, 
			res: sortByItemCount
		},
		{
			type: sortTypes.DATE, 
			res: sortByDate
		},
	]
)('getSortFunction function', (data) => {
	expect(data.res).toBe(getSortFunction(data.type));
});


describe('sortByDate function', () => {
	it.each([
		{ 
			order1: { 
				date: fakeOrders[0].date 
			}, 
			order2: { 
				date: fakeOrders[1].date 
			},
			res: -1
		},
		{ 
			order1: { 
				date: fakeOrders[1].date 
			}, 
			order2: { 
				date: fakeOrders[0].date 
			},
			res: 1
		},
		{ 
			order1: { 
				date: fakeOrders[0].date  
			}, 
			order2: { 
				date: fakeOrders[0].date 
			},
			res: 0
		},
	])('same date', (data) => {
		const result = sortByDate(data.order1, data.order2);
		expect(result).toBe(data.res);
	});
});


describe('sortOrders function', () => {
	it('Вызов с пустыми order', () => {
		const func = jest.fn();
		const res = sortOrders([], func);
		expect(res).toBeUndefined();
	});

	it('Вызов с пустой функцией', () => {
		const res = sortOrders([{}, {}], undefined);
		expect(res).toBeUndefined();
	});

	it('Вызов функции сортировки', () => {
		const func = jest.fn();
		sortOrders([{}, {}], func);
		expect(func).toHaveBeenCalledTimes(1);
	});
});

