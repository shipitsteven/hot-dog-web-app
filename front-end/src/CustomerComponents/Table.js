import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableDataisFetched: false };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/customer/1`)
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

  renderItems() {
    let output = 'Loading...';
    if (this.state.tableDataisFetched) {
      output = this.state.apiData.map((item) => {
        return (
          <TableRow
            key={item.ITEM_NAME}
            item={item.ITEM_NAME}
            description={item.DESCRIPTION_ITEM}
            price={item.PRICE}
          />
        );
      });
    }
    return <tbody>{output}</tbody>;
  }

  render() {
    return (
      <div className="ui container">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          {this.renderItems()}
        </table>
      </div>
    );
  }
}
export default Table;
