import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

function UserInfoModal() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const ulRef = useRef(null);
  const history = useHistory();
  const { closeModal } = useModal();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeModal();
    history.push("/");
  };

  useEffect(() => {
    const closeMenuOutsideClick = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("click", closeMenuOutsideClick);

    return () => {
      document.removeEventListener("click", closeMenuOutsideClick);
    };
  }, [closeModal]);

  return (
<div className="userMenu" ref={ulRef}>

  <h2 className="userMenuItem">Hello {user.firstName}.</h2>

  <h3 className="userMenuItem">{user.email}</h3>


  <NavLink to="/spots/current" className="userMenuItem" id='manageSpotLink'>
    Manage Spots
  </NavLink>

  <button id='logOutButton' onClick={logout}>
    Log Out
  </button>
</div>
  );
}

export default UserInfoModal;
