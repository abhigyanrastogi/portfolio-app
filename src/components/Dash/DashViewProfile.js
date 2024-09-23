import React from 'react'

const DashViewProfile = () => {
  return (
    <div className='Dash__View_Profile'>
        {/* Image of User, randomly assigned for now */}
        <div className='ProfilePicture'>
          <img 
          src='/img/random-img'
          alt='Random-image'/>
        </div>
        {/* Static link to edit profile */}
        <div className='EditProfile'>
          <p>Link to profile editor (not implemented yet ...)</p>
        </div>
    </div>
  )
}

export default DashViewProfile
