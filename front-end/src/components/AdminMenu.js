import React from 'react';
import AdminMain from './AdminMain';
import Box from './Box';
import MenuTable from './AdminMenuTable';

class AdminMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: {} };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu`)
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <AdminMain>
        <Box>
          <h1 className="ui header">
            <img src="/images/menu.svg" alt="menu icon"></img>
            Menus
          </h1>
          <MenuTable apiResponse={this.state.apiResponse}></MenuTable>
        </Box>
      </AdminMain>
    );
  }
}

export default AdminMenu;
