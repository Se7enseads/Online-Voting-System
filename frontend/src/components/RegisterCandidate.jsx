import React from 'react';

function RegisterCandidate() {
  const errors = ['Error message 1', 'Error message 2']; // Replace with actual error messages
  const success = ['Success message 1', 'Success message 2']; // Replace with actual success messages

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3 className="title">Register a new candidate</h3>
          <div className="card">
            <div className="card-body">
              {errors.length > 0 && (
                <div className="alert alert-danger">
                  <ul>
                    {errors.map((msg, index) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}

              {success.length > 0 && (
                <div className="alert alert-success">
                  <ul>
                    {success.map((msg, index) => (
                      <li key={index}>
                        {msg}. Go to <a href="/candidate">Candidate Info</a> to
                        view details.
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <form method="POST" action="/candidate_register">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="integer"
                    name="roll_num"
                    placeholder="Roll Number"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="agenda"
                    placeholder="Candidate Agenda"
                    autoFocus
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="batch"
                    placeholder="Batch"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="course"
                    placeholder="Course"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="department"
                    placeholder="Department"
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <select className="form-control" name="post">
                    <option value="President">President</option>
                    <option value="Vice-President">Vice-President</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="pic_path"
                    placeholder="Add path to candidate's picture eg. /static/images/img.jpg"
                    autoFocus
                  />
                </div>

                <button className="btn btn-info btn-block">
                  Register Candidate
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCandidate;
