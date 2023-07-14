import React from "react";

import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UserInfoModal from "../UserInfoModal";
import NewSpotModal from "../CreateSpotForm";

function ProfileButton({ user }) {

  return (
    <>
        {user ? (
          <div id="rightNav" >
            <OpenModalButton
            buttonText='Create a New Spot'
            modalComponent={<NewSpotModal />}
            />


            <OpenModalButton
              buttonText= <i className="fa-solid fa-skull fa-3x"></i>
              modalComponent={<UserInfoModal user={user}/>}
            />
          </div>
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
