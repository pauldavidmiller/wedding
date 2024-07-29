import "./App.css";

const App = () => {
  return (
    <div className="container">
      <div className="banner">
        <div className="nav">
          <b>Jake and Sasha</b>
          <div className="menu">
            <a href="#">Home</a>
            <a href="#us">Us</a>
            <a href="#venue">Venue</a>
            <a href="#party">Party</a>
          </div>
        </div>
        <div className="text">
          <h1>Jake & Sasha</h1>
          <span className="date">On 7th November, 2019</span>
        </div>
      </div>
      <div className="section">
        <div className="us">
          <h2>
            <a className="us">Us</a>
          </h2>
          <div className="us1">
            {/* <image src="https://i.ibb.co/FWR7gw6/wed-man.jpg"> */}
            <span>Sasha is mine!</span>
          </div>
          <div className="us1">
            {/* <img src="https://i.ibb.co/WNhDWh0/wed-woman.jpg"> */}
            <span>Jake is mine!</span>
          </div>
        </div>
        <div className="venue">
          <h2>
            <a className="venue">Venue</a>
          </h2>
          {/* <img src="https://i.ibb.co/wZk2sTj/wed-venue.jpg"> */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.....
          </p>
        </div>
        <div className="party">
          <h2>
            <a className="party">Party</a>
          </h2>
          {/* <img src="https://i.ibb.co/dMb2T7P/wed-party.jpg"> */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.....
          </p>
        </div>
        <footer>
          &copy; Copyright 2019 U Can Code Follow me @{" "}
          <i className="fab fa-youtube"></i> <i className="fab fa-twitter"></i>{" "}
          <i className="fab fa-github"></i> <i className="fab fa-codepen"></i>
        </footer>
      </div>
    </div>
  );
};

export default App;
