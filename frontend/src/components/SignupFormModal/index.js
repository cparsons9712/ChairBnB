import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { useModal } from "../../context/Modal";


function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(true)
  const {closeModal} = useModal()

  useEffect(()=>{
    if( firstName && lastName && email &&
      username.length >3 &&
      password.length > 5 &&
      password === confirmPassword
      ) setDisabled(false)
    else{ setDisabled(true) }


  },[username, firstName,lastName,email,password,confirmPassword,])



  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = (e) => {
        e.preventDefault();
        if( password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.signup({ username, firstName, lastName, email, password }))
            .then(closeModal)
            .catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        };
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    }


  return (
    <>

      <form onSubmit={handleSubmit} id="signUpModal">
      <button className = 'close' onClick={closeModal}>X</button>
        <h1>Sign Up</h1>

        <label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        
        <label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}


        <button type="submit" disabled={disabled} className="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
