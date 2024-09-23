import React from 'react'
import DashCommentHistory from './DashCommentHistory'
import DashViewProfile from './DashViewProfile'
import DashProjectHistory from './DashProjectHistory'
import DashBrowseProjects from './DashBrowseProjects'
import DashBrowsePosts from './DashBrowsePosts'

const DashMain = () => {
  return (
    <main>
        <div className='Dash__Profile--container'>
          <div className='Dash__Profile'>
            <DashViewProfile />
            <DashCommentHistory />
            <DashProjectHistory />
          </div>
        </div>
        <div className='Dash__Content--container'>
          <div className='Dash__Content'>
            <DashBrowseProjects />
            <DashBrowsePosts />
          </div>
        </div>
      </main>
  )
}

export default DashMain
