// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const loginDemo= () =>{
    setCredential('demoUser')
    setPassword('password')
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

  }

  useEffect(()=>{
    if(credential.length >=4 && password.length >=6){
    setDisable(false)
  }}, [credential, password])

  return (
    <>

      <form onSubmit={handleSubmit} id='logInModal'>
        <div className="logInSection">
          <button className = 'close' onClick={closeModal}>X</button>
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
