import React from 'react';
import NavBar from './NavBar'; // Import your NavBar component

function AppLayout({ children }) {
  return (
    <div>
      <NavBar /> {/* Render the NavBar component */}
      <section className="hero is-dark is-fullheight">
        <div className="hero-head">{/* Navbar */}</div>
        <div className="hero-body">
          <div className="has-text-centered container">{children}</div>
        </div>
      </section>
    </div>
  );
}

export default AppLayout;
