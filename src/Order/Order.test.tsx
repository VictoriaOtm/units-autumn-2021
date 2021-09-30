import React from 'react';
import {OrderComponent} from './Order';
import {shallow, configure, ReactWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';


configure({ adapter: new Adapter() });

describe('Order.tsx', () => {

	beforeEach(() => {
		getDate.mockReturnValue('Чт, 30 сент.');
	});

	afterAll(() => {
		jest.resetModules();
	});

	const data = {
		order: {
			id: 100,
			date: 1588359900000,				
			shop: 'Сбереги Мега Маркер',
			items: []
		}
	};

	const data2 = {
		order: {
			id: 100,
			date: 1588359900000,				
			shop: 'Сбереги Мега Маркер',
			items: [
				'Утиный пластмасса для показ новый год',
				'Курица из нержавеющей стали, утка, гусь, голубь, питьевой фонтан',
				'Новый стиль один розница яйцо для упаковки форма латекс',
			]
		}
	};

	const dataEmpty = { 
		order: {} 
	};

	it('Пустой список', () => {
		const wrapper = shallow(<OrderComponent {...data}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('Список товаров', () => {
		const wrapper = shallow(<OrderComponent {...data2}/>);
		expect(wrapper).toMatchSnapshot();
	});


	it('Пустой Order', () => {
		const wrapper = shallow(<OrderComponent {...dataEmpty}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
