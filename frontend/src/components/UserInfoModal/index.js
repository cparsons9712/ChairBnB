import { useModal  } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { useEffect,useRef } from "react";
import { useHistory } from "react-router-dom";



function UserInfoModal(){
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch()
  const ulRef = useRef()
  const history = useHistory()
  const {closeModal} = useModal()

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeModal();
    history.push('/')
  };





  return (
    <div className="userMenu" ref={ulRef}>
      <button className = 'close' onClick={closeModal}>X</button>
      <h2> Hello {user.firstName}!</h2>
      <h3>Username: {user.username}</h3>
      <h3>Email: {user.email}</h3>
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}

export default UserInfoModal
