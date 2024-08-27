import React from "react";

const Header = () => {
  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-logo">
          Paul & Margot's Wedding <span className="heart-symbol">❤️</span>
        </div>
        <ul className="header-menu">
          <li>
            <button
              className="header-button"
              onClick={() => scrollToSection("hero")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className="header-button"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
          </li>
          <li>
            <button
              className="header-button"
              onClick={() => scrollToSection("gallery")}
            >
              Gallery
            </button>
          </li>
          <li>
            <button
              className="header-button"
              onClick={() => scrollToSection("venue")}
            >
              Venue
            </button>
          </li>
          <li>
            <button
              className="header-button"
              onClick={() => scrollToSection("hotels")}
            >
              Hotels
            </button>
          </li>
          <li>
            <button
              className="header-button"
              onClick={() => scrollToSection("faqs")}
            >
              FAQ
            </button>
          </li>
          <li>
            <button
              className="header-button"
              onClick={() => scrollToSection("rsvp")}
            >
              RSVP
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
