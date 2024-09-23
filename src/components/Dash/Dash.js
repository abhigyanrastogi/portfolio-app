import React, { useEffect, useState } from 'react'
import '../../styles/Dash.css'
import { useLocation, useNavigate } from 'react-router-dom'
import DashMain from './DashMain';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const Dash = () => {
  // TODO: Ask server if this session of dash is valid or not
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username:"Invalid User", roles:["Unauthorized"] });
  useEffect(()=>{
    console.log(state);
    if(!state) {      
      navigate('/login');
    } else {
      setUser({ username: state.username, roles: state.roles });
    }
  }, [setUser, state, navigate]);

  return (
    <>
    {user.username === 'Invalid User' && <div className='Dash_Invalid'>
        <h1>This session of dash is invalid!</h1>
      </div>}
    {user.username !== 'Invalid User' && 
    <div className='Dash'>
      <DashHeader username={user.username} roles={user.roles} />
      <DashMain />
      <DashFooter />
    </div>}
    </>
  )
}

export default Dash
