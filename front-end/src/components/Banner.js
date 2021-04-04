import React from 'react';
import Container from './Container';
import 'cirrus-ui';

class Banner extends React.Component {
  render() {
    return (
      <Container>
        <div className="ui message u-center" style={{ marginTop: '1em' }}>
          <h1>Hello, {this.props.vendorName}</h1>
        </div>
      </Container>
    );
  }
}

export default Banner;
