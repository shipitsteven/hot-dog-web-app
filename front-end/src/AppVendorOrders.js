import React from 'react';
import AllOrders from './VendorOrders/AllOrders';
import SubTotal from './VendorOrders/SubTotal';
import BackButton from './VendorOrders/BackButton';
import CompleteOrdersButton from './VendorOrders/CompletedOrdersButton';
import Container from './components/Container';

class AppCustomerMenu extends React.Component {
  render() {
    return (
      <Container>
        <div className="App">
          <BackButton cartID={this.props.match.params.id} />
          <CompleteOrdersButton cartID={this.props.match.params.id} />
          <h1>Order Items</h1>
          <AllOrders cartID={this.props.match.params.id} />
          <h1>Order Totals</h1>
          <SubTotal cartID={this.props.match.params.id} />
        </div>
      </Container>
    );
  }
}

export default AppCustomerMenu;
