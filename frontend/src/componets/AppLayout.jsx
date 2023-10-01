import React from 'react';
import { Link } from 'react-router-dom';

function AppLayout({ children }) {
  return (
   
        
        <section className="hero is-dark is-fullheight">
          <div className="hero-head">
          
          </div>
          <div className="hero-body">
            <div className="container has-text-centered">
              {children}
            </div>
          </div>
        </section>
    
  );
}

export default AppLayout;
