import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/home";
import OurStory from "./components/our-story";
import Venue from "./components/venue";
import Rsvp from "./components/rsvp";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="banner bg-pink-300">
        <Router>
          <div className="nav w-5/6 mt-4">
            <b className="text-3xl font-serif w-1/2">Paul & Margot</b>
            <nav className="tab-list w-1/2 shadow drop-shadow-lg">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "tab-list-item-active" : "tab-list-item"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/our-story"
                className={({ isActive }) =>
                  isActive ? "tab-list-item-active" : "tab-list-item"
                }
              >
                Our Story
              </NavLink>
              <NavLink
                to="/venue"
                className={({ isActive }) =>
                  isActive ? "tab-list-item-active" : "tab-list-item"
                }
              >
                Venue
              </NavLink>
              <NavLink
                to="/rsvp"
                className={({ isActive }) =>
                  isActive ? "tab-list-item-active" : "tab-list-item"
                }
              >
                RSVP
              </NavLink>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/rsvp" element={<Rsvp />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
