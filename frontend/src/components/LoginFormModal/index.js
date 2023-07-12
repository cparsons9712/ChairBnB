import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Dispatch the login action with the provided credential and password
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal) // Close the modal after successful login
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const loginDemo = () => {
    // Set credential and password for demo user login
    setCredential('FakeUser5');
    setPassword('password5');

    // Dispatch the login action with the demo user's credential and password
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal) // Close the modal after successful login
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  useEffect(() => {
    // Enable or disable the submit button based on the credential and password length
    if (credential.length >= 4 && password.length >= 6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [credential, password]);

  return (
    <>
      <form onSubmit={handleSubmit} id='logInModal'>
        <div className="logInSection">
          <button className='close' onClick={closeModal}>X</button>
          <h1>Log In</h1>
        </div>

        {errors.credential && (
          <p>{errors.credential}</p>
        )}

        <div className="LogInSection">
          <label id='logInUserName'>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder="Username or Email"
            />
          </label>
        </div>

        <div className="LogInSection">
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
        </div>

        <button type="submit" disabled={disable} className="submit">Log In</button>
        <button className="demo" onClick={loginDemo}>DEMO USER</button>
      </form>
    </>
  );
}

export default LoginFormModal;
