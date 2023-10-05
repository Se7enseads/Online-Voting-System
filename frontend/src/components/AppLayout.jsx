import React from 'react';
import NavBar from './NavBar'; // Import your NavBar component

function AppLayout({ children }) {
  return (
    <div>
      <NavBar /> {/* Render the NavBar component */}
      <section className="hero is-fullheight-with-navbar is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppLayout;
