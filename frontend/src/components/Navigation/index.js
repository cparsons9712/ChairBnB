import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import logo from '../../img/LOGOGH.png'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='bar'>
      <div id='homeLogo'>
        <NavLink exact to="/"><img src={logo} alt='Home' id='logo'/></NavLink>
      </div>

      <h2 id='title'>Creepy Hauntings At Incredible Rates</h2>

      {isLoaded && (
        <div className='userButton'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
