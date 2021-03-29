import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [serverStatus, setServerStatus] = React.useState(false);

  useEffect(() => {
    const serverWarmUp = async () => {
      fetch(`${process.env.REACT_APP_SERVER_URL}/`)
        .then((res) => res.text())
        .then((res) => {
          console.log(res);
          setServerStatus(true);
        })
        .catch((err) => console.log(err));
    };
    serverWarmUp();
  }, [serverStatus]);

  return (
    <div className="wrapper">
      <h1>Hot Dog Landing Page</h1>
      <Link to="/customer/map">
        <h1>Customer Site</h1>
      </Link>
      <Link to="/vendor/">
        <h1>Vendor Site</h1>
      </Link>
      <Link to="/admin">
        <h1>Admin Site</h1>
      </Link>
      <h4>{serverStatus ? 'Server is ready' : 'Server is warming up...'}</h4>
    </div>
  );
}

export default Home;
