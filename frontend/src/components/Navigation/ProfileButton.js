import React from "react";

import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UserInfoModal from "../UserInfoModal";

function ProfileButton({ user }) {

  return (
    <>
        {user ? (
          <>
            <OpenModalButton
              buttonText= <i class="fa-solid fa-skull fa-3x"></i>
              modalComponent={<UserInfoModal user={user}/>}
            />
          </>
        ) : (
          <>
            <li >
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}

    </>
  );
}

export default ProfileButton;
