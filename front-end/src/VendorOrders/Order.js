import React from 'react';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <tr>
        <td>{this.props.orderID}</td>
        <td>{this.props.name}</td>
        <td>{this.props.contact}</td>
        <td>{this.props.item}</td>
        <td>{`$${this.props.price / 100}`}</td>
        <td>{this.props.quantity}</td>
      </tr>
    );
  }
}

export default Order;
