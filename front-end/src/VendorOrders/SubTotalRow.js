// import fetch from 'node-fetch';
import React from 'react';
import ReactModal from 'react-modal';

class SubTotalRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  completeOrder = () => {
    if (this.props.order !== undefined) {
      let url =
        `${process.env.REACT_APP_SERVER_URL}/vendor/orders/complete/` +
        this.props.order;
      fetch(url, {
        method: 'POST',
      })
        .then((res) => res.text())
        .catch((err) => console.err(err));
    }
  };

  render() {
    return (
      <tr>
        <td>{this.props.order}</td>
        <td>{this.props.total}</td>
        <td>
          <button onClick={this.handleOpenModal}>Paid</button>
          <ReactModal
            isOpen={this.state.showModal}
            order={this.props.order}
            appElement={document.getElementById('root')}
          >
            <button onClick={this.handleCloseModal}>Close</button>
            <button onClick={this.completeOrder}>Confirm</button>
          </ReactModal>
        </td>
      </tr>
    );
  }
}

export default SubTotalRow;
