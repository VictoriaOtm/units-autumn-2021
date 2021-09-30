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

	it('empty items', () => {
		const result = sortByItemCount(fakeOrders[0],fakeOrders[1]);

		expect(result).toBe(-1);
	});

	it('empty items', () => {
		const result = sortByItemCount({}, {});

		expect(result).toBe(0);
	});

	it('sortByDate negative', () => {
		const result = sortByDate(fakeOrders[0],fakeOrders[1]);

		expect(result).toBe(-1);
	});

	it('sortByDate positive', () => {
		const result = sortByDate(fakeOrders[1],fakeOrders[0]);

		expect(result).toBe(1);
	});

	it('sortByDate empty element', () => {
		const result = sortByDate(fakeOrders[1], {});

		expect(result).toBe(0);
	});

	it('sortByDate empty element', () => {
		const result = sortByDate(fakeOrders[1], fakeOrders[1]);

		expect(result).toBe(0);
	});
});

