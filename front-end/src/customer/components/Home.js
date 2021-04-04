import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'cirrus-ui';

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
    <div>
      <div className="hero fullscreen bg-orange-300">
        <div className="hero-body">
          <div className="mx-auto">
            <h1 className="title uppercase headline-4">
              Welcome to <mark>Dog Haus</mark>
            </h1>

            <Link to="/customer/map">
              <button className="btn-info btn-large mr-2 my-1">
                Customer Site
              </button>
            </Link>
            <Link to="/vendor/">
              <button className="btn-link btn-large mx-2 my-1">
                Vendor Site
              </button>
            </Link>
            <Link to="/admin">
              <button className="btn-success btn-large mx-2 my-1">
                Admin Site
              </button>
            </Link>
            <h5>
              Server is{' '}
              <span style={{ color: `${serverStatus ? 'green' : 'red'}` }}>
                {serverStatus ? 'ready' : 'warming up...'}
              </span>
            </h5>
            <p>
              Please be patient as Heroku may have a long cold start time, this
              might take 1-2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
