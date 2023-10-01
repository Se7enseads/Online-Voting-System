import React from 'react';

function SignUp() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="title">Sign Up</h3>
          <div className="card">
            <div className="card-body">
              {/* Render error messages here */}
              <form method="POST" action="/auth/register">
                <div className="form-group">
                  <input className="form-control" type="integer" name="rollno" placeholder="Roll Number" autoFocus />
                </div>
                <div className="form-group">
                  <input className="form-control" type="email" name="email" placeholder="Email" />
                </div>
                <div className="form-group">
                  <input className="form-control" type="text" name="name" placeholder="Name" />
                </div>
                <div className="form-group">
                  <input className="form-control" type="password" name="password1" placeholder="Password" />
                </div>
                <div className="form-group">
                  <input className="form-control" type="password" name="password2" placeholder="Confirm Password" />
                </div>
                <button className="btn btn-info btn-block">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
