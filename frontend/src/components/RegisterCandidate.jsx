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

              <form action="/candidate_register" method="POST">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="roll_num"
                    placeholder="Roll Number"
                    type="integer"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="first_name"
                    placeholder="First Name"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="last_name"
                    placeholder="Last Name"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="agenda"
                    placeholder="Candidate Agenda"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="batch"
                    placeholder="Batch"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="course"
                    placeholder="Course"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="department"
                    placeholder="Department"
                    type="text"
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
                    name="pic_path"
                    placeholder="Add path to candidate's picture eg. /static/images/img.jpg"
                    type="text"
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
