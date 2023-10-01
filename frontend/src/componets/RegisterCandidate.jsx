import React from 'react';

function RegisterCandidate() {
  const errors = ["Error message 1", "Error message 2"]; // Replace with actual error messages
  const success = ["Success message 1", "Success message 2"]; // Replace with actual success messages

  return (
    <div className="column is-8 is-offset-2">
      <h3 className="title">Register a new candidate</h3>
      <div className="box">
        {errors.length > 0 && (
          <div className="notification is-danger">
            <ul>
              {errors.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {success.length > 0 && (
          <div className="notification is-success">
            <ul>
              {success.map((msg, index) => (
                <li key={index}>
                  {msg}. Go to <a href="/candidate">Candidate Info</a> to view details.
                </li>
              ))}
            </ul>
          </div>
        )}

        <form method="POST" action="/candidate_register">
          <div className="field">
            <div className="control">
              <input className="input is-small" type="integer" name="roll_num" placeholder="Roll Number" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" name="first_name" placeholder="First Name" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" name="last_name" placeholder="Last Name" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <textarea className="textarea is-small" name="agenda" placeholder="Candidate Agenda" autoFocus></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" name="batch" placeholder="Batch" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" name="course" placeholder="Course" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" name="department" placeholder="Department" autoFocus />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <div className="select is-rounded is-small">
                <select name="post">
                  <option value="President">President</option>
                  <option value="Vice-President">Vice-President</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input is-small" type="text" name="pic_path" placeholder="Add path to candidate's picture eg. /static/images/img.jpg" autoFocus />
            </div>
          </div>

          <button className="button is-block is-info is-small is-fullwidth">Register Candidate</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterCandidate;
