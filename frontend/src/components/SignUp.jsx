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
              <form action="/auth/register" method="POST">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="rollno"
                    placeholder="Roll Number"
                    type="integer"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password1"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password2"
                    placeholder="Confirm Password"
                    type="password"
                  />
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
