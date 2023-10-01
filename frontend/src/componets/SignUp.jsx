import React from 'react';

function SignUp() {
  return (
    <div className="column is-4 is-offset-4">
      <h3 className="title">Sign Up</h3>
      <div className="box">
        {/* Render error messages here */}
        <form method="POST" action="/auth/register">
          <div className="field">
            <div className="control">
              <input className="input is-small" type="integer" name="rollno" placeholder="Roll Number" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="email" name="email" placeholder="Email" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" name="name" placeholder="Name" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="password" name="password1" placeholder="Password" />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="password" name="password2" placeholder="Confirm Password" />
            </div>
          </div>
          <button className="button is-block is-info is-small is-fullwidth">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
