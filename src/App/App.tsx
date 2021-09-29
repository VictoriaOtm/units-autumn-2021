import React from 'react';
import './App.css';
import {fakeOrders} from '../data/fakeOrders';
import {OrderComponent} from '../Order/Order';
import {
  getSortFunction,
  sortOrders,
  sortTypes,
} from '../utils/sortOrders';

export default class App extends React.PureComponent {
  state = {
    sortType: sortTypes.DATE,
  };

  getOrders(orders) {
    if (!orders || !orders.length) {
      return null;
    }

    return orders.map((order, index) => (
      <Order
        key={index}
        order={order}
      />
    ))
  }

  render() {
    const {sortType} = this.state;

    sortOrders(fakeOrders, getSortFunction(sortType));

    return (
      <div className='App'>
        <header className='App-header'>
          <span className='App-header-title'>Сортировать заказы</span>

          <select
            value={sortType}
            onChange={(event) => this.setState({sortType: event.target.value})}
          >
            <option value={sortTypes.COUNT}>по количеству товаров</option>
            <option value={sortTypes.DATE}>по дате</option>
          </select>
        </header>

        <div className='App-container'>
          {this.getOrders(fakeOrders)}
        </div>
      </div>
      )
  }
}
