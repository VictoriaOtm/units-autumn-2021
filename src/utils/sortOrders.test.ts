import {sortByDate, sortByItemCount, sortOrders} from './sortOrders';
import {fakeOrders} from '../data/fakeOrders';

describe('sortByItemCount function', () => {
	test.each([
		{
			orders: [{}, {
				items: ['1', '2'],
			}],
		},
		{
			orders: [{items: ['item1', 'item2'],}, {}]
		},
	])('invalid item', ({orders}) => {
		const res = sortByItemCount(orders[0], orders[1]);

		expect(res).toBe(0);
	});

	test.each([
		{
			orders: [{items: ['item1', 'item2'],}, {items: ['1', '2'],}],
			expected: 0,
		},
		{
			orders: [{items: ['item1'],}, {items: ['1', '2'],}],
			expected: -1,
		},
		{
			orders: [{items: ['item1', 'item2'],}, {items: ['1'],}],
			expected: 1,
		},
	])('different items count', ({orders, expected}) => {
		const res = sortByItemCount(orders[0], orders[1]);

		expect(res).toBe(expected);
	});
});

describe('sortByDate function', () => {
	test.each([
		{
			orders: [{}, {date: 123,}],
		},
		{
			orders: [{date: 123,}, {}]
		},
	])('invalid data', ({orders}) => {
		const res = sortByDate(orders[0], orders[1]);

		expect(res).toBe(0);
	});

	test.each([
		{
			orders: [{date: 123,}, {date: 123,}],
			expected: 0,
		},
		{
			orders: [{date: 321,}, {date: 123,}],
			expected: -1,
		},
		{
			orders: [{date: 123,}, {date: 321,}],
			expected: 1,
		},
	])('different data', ({orders, expected}) => {
		const res = sortByDate(orders[0], orders[1]);

		expect(res).toBe(expected);
	});
});

describe('sortOrders function', () => {
	it('invalid orders', () => {
		const sortFunction = () => {
			console.log('i am sort!');
		};

		const res = sortOrders([], sortFunction);

		expect(res).toBeUndefined();
	});

	test.each([
		{
			order: [fakeOrders[0],fakeOrders[1]],
			sort: null,
		},
		{
			order: [fakeOrders[0],fakeOrders[1]],
			sort: 'asd',
		},
	])('invalid sort function', ({order, sort}) => {
		const res = sortOrders(order, sort);

		expect(res).toBeUndefined();
	});

	it('test call sortFunction', () => {
		const sortFunction = jest.fn(orders => orders);

		sortOrders([fakeOrders[0],fakeOrders[1]], sortFunction);

		expect(sortFunction.mock.calls.length).toBe(1);
	});
});

