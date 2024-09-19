import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Dash = () => {
  // Ask server if this session of dash is valid or not
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("Loading...");
  useEffect(()=>{
    if(!location.state) {
      navigate('/login');
    } else {
      setUsername(location.state.username);
    }
  }, [setUsername, location, navigate]);
  return (
    <>
    {username === 'Loading...' && <div className='Dash_Invalid'>
        <h1>This session of dash is invalid!</h1>
      </div>}
    {username !== 'Loading...' && <div className='Dash'>
      <header>
        <h1 className=''>Hello {username}!</h1>
      </header>
      <main>
        <div className='Dash__Profile'>
          <div className='Dash__View_Profile'>
            {/* Image of User, randomly assigned for now */}
            {/* Static link to edit profile */}
          </div>
          <div className='Dash__Comment_History'>
            {/* Last 5 comments by user */}
            {/* Preview of Post they left comment on */}
          </div>
          <div className='Dash__Post_History'>
            {/* Last 5 posts made by user */}
          </div>
          <div className='Dash__Project_History'>
            {/* Last 5 projects viewed by user */}
          </div>
        </div>
        <div className='Dash__Content'>
          <div className='Dash__Browse_Projects'>
            {/* Preview of Projects */}
          </div>
          <div className='Dash__Browse_Posts'>
            {/* Prewview of Posts */}
          </div>
        </div>
      </main>
      <footer>
        <Link to="/">Welcome page</Link>
        <Link to="/login">Log out</Link>
      </footer>
    </div>}
    </>
  )
}

export default Dash
