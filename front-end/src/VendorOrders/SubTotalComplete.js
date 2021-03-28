import React from 'react';
import SubTotalComplete from './SubTotalRowComplete';

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
      `${process.env.REACT_APP_SERVER_URL}/vendor/orders/${this.props.cartID}/subtotal/complete`
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
          <SubTotalComplete
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
      <table className="ui celled green table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>TOTAL ($)</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

export default SubTotal;
