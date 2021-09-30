import {sortTypes, sortOrders, getSortFunction, sortByItemCount, sortByDate} from './sortOrders';

describe('sortOrders function', () => {
	it('changes array', () => {
		const orders = [
			{ items: ['1', '2', '3'] },
			{ items: ['1', '2'] }
		];
		const sortFunc = jest.fn();

		sortOrders(orders, sortFunc);

		expect(sortFunc).toBeCalled();
	});
});

describe('getSortFunction function', () => {
	it('returns sortByDate', () => {
		const sort = getSortFunction(sortTypes.DATE);
		expect(sort).toBe(sortByDate);
	});

	it('returns sortByItemCount', () => {
		const sort = getSortFunction(sortTypes.COUNT);
		expect(sort).toBe(sortByItemCount);
	});
});

describe('sortByItemCount function', () => {
	test.each([
		[['i11', 'i12'], undefined, 0],
		[['i11', 'i12'], ['i21', 'i22'], 0],
		[['i11', 'i12'], ['i21', 'i22', 'i23'], -1],
		[['i11', 'i12', 'i13'], ['i21', 'i22'], 1],
	])('.sortByItemCount(%s, %s)', (items1, items2, expected) => {
		const order1 = {
			items: items1,
		};
		const order2 = {
			items: items2,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(expected);
	});
});

describe('sortByDate function', () => {
	test.each([
		[31, undefined, 0],
		[31, 31, 0],
		[31, 30, -1],
		[30, 31, 1]
	])('.sortByDate(%i, %i)', (date1, date2, expected) => {
		const order1 = {
			date: date1,
		};
		const order2 = {
			date: date2,
		};

		const result = sortByDate(order1, order2);

		expect(result).toBe(expected);
	});
});
