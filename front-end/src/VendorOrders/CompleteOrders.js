import React from 'react';
import Order from './Order';

class AllOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableDataisFetched: false, orderTotalisFetched: false };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/vendor/orders/complete/${this.props.cartID}`
    )
      .then((response) => {
        if (response.ok) {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ apiData: json.data, tableDataisFetched: true });
      });
  };

  renderOrders() {
    let output = (
      <tr>
        <th>'Loading...'</th>
      </tr>
    );
    if (this.state.tableDataisFetched) {
      output = this.state.apiData.map((item) => {
        return (
          <Order
            key={item.ORDER_ID + item.ITEM_NAME}
            orderID={item.ORDER_ID}
            name={item.FIRST_NAME + ' ' + item.LAST_NAME[0]}
            contact={item.CONTACT}
            item={item.ITEM_NAME}
            price={item.PRICE}
            quantity={item.QUANTITY}
          />
        );
      });
    }
    return output;
  }

  render() {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{this.renderOrders()}</tbody>
      </table>
    );
  }
}

export default AllOrders;
