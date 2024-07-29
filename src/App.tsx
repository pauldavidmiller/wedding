import "./App.css";

const App = () => {
  return (
    <div className="container">
      <div className="banner bg-pink-300">
        <div className="nav">
          <b>Paul and Margot</b>
          <div className="menu">
            <a href="#">Home</a>
            <a href="#us">Us</a>
            <a href="#venue">Venue</a>
            <a href="#party">Party</a>
          </div>
        </div>
        <div className="text">
          <h1>Paul & Margot</h1>
          <span className="date">Coming soon Summer 2025</span>
        </div>
      </div>
      <div className="container">
        <div className="section gap-8">
          <h2>Venue</h2>
          {/* Image Here */}
          <p>Where are we having our wedding?</p>
        </div>
        <div className="section gap-8">
          <h2>Party</h2>
          {/* Image Here */}
          <p>After Party?</p>
        </div>
        <footer>Yep Paul made this website by himself! ;)</footer>
      </div>
    </div>
  );
};

export default App;
