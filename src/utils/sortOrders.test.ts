import {sortByDate, sortByItemCount} from './sortOrders';
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

	test.each([
		[fakeOrders[1], fakeOrders[0], 1],
		[{}, {}, 0],
		[fakeOrders[0],fakeOrders[1], -1],
		[{items:['1','2','3']},{items:['1','2','3']}, 0],
		[null, null, 0]
	])('test with different values', (first, second, expected) => {
		const result = sortByItemCount(first, second);
		expect(result).toBe(expected);
	});

	test.each([
		[{date:undefined}, {date:undefined}, 0],
		[fakeOrders[0], fakeOrders[1], -1],
		[fakeOrders[1], fakeOrders[0], 1],
		[fakeOrders[1], fakeOrders[1], 0],
		[fakeOrders[1], {}, 0],
	])('test with different values', (first, second, expected) => {
		const result = sortByDate(first, second);
		expect(result).toBe(expected);
	});
});

