import { type } from 'os';
import {getSortFunction, sortByDate, sortByItemCount, sortTypes, sortOrders} from './sortOrders';

describe('sortByItemCount function', () => {
	it.each([
		{ 
			order1: { 
				items: ['item1', 'item2'] 
			},
			order2: { 
				items: ['1', '2'] 
			},
			res: 0
		},
		{ 
			order1: { 
				items: ['item1', 'item2'] 
			}, 
			order2: {
				items: ['1']
			},
			res: 1
		},
		{ 
			order1: { 
				items: ['item1', 'item2']  
			}, 
			order2: { 
				items: ['item1', 'item2','item3']  
			},
			res: -1
		},
		{	order1: { }, 
			order2: {  },
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
				date: 1588359900000 
			}, 
			order2: { 
				date: 1544356800000 
			},
			res: -1
		},
		{ 
			order1: { 
				date: 1544356800000 
			}, 
			order2: { 
				date: 1588359900000
			},
			res: 1
		},
		{ 
			order1: { 
				date: 1588359900000 
			}, 
			order2: { 
				date: 1588359900000
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

