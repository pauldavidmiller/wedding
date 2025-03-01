import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear().toString()} Margot & Paul's Wedding.
        All rights reserved. Yep, Paul made this website!
      </p>
    </footer>
  );
}

export default Footer;
