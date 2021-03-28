import React from 'react';
import SubTotalRow from './SubTotalRow';

class SubTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderTotalisFetched: false };
  }

  componentDidMount() {
    this.getSubTotalData();
  }

  getSubTotalData() {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/vendor/orders/${this.props.cartID}/subtotal`
    )
      .then((response) => {
        if (response.ok) {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          apiDataSubTotal: json.data,
          orderTotalisFetched: true,
        });
      });
  }

  renderRows() {
    let output = (
      <tr>
        <td>'Loading content...'</td>
      </tr>
    );
    if (this.state.apiDataSubTotal) {
      output = this.state.apiDataSubTotal.map((item) => {
        return (
          <SubTotalRow
            key={item.ORDER_ID}
            order={item.ORDER_ID}
            total={`$${item.TOTAL / 100}`}
          />
        );
      });
    }
    return output;
  }

  render() {
    return (
      <table className="ui green celled table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>TOTAL ($)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

export default SubTotal;
