import React from 'react';
import Container from './Container';
import CustomerMap from './CustomerMap';
import 'cirrus-ui';

class CustomerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/customer/map`)
      .then((res) => res.json())
      .then((res) =>
        this.setState(
          {
            apiResponse: res,
            center: {
              lat: res.cart[0].lat,
              lng: res.cart[0].lng,
            },
          },
          () => console.log(this.state.apiResponse)
        )
      );
  }

  render() {
    return (
      <div>
        <Container>
          <div
            style={{ marginTop: '2vh', marginBottom: '2vh' }}
            className="u-center"
          >
            <h1>
              Welcome, there are{' '}
              <span style={{ color: 'brown' }}>
                {this.state.apiResponse.cart?.length} carts
              </span>{' '}
              near you
            </h1>
          </div>
        </Container>
        <CustomerMap
          apiResponse={this.state.apiResponse}
          center={this.state.center}
        />
      </div>
    );
  }
}

export default CustomerMain;
