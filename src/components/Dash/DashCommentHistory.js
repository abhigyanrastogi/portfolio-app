import React from 'react'

const Comments = ({ Comment, PostPreview }) => {
    return(
        <div className='Comments'>
            <p>{Comment}</p>
            <div className='PostPreview'>
                <p>{PostPreview}</p>
            </div>
        </div>
    );
}

const DashCommentHistory = () => {
  return (
    <div className='Dash__Comment_History'>
        <Comments Comment="Comment" PostPreview="Post Preview"/>
        <Comments Comment="Comment" PostPreview="Post Preview"/>
        <Comments Comment="Comment" PostPreview="Post Preview"/>
        <Comments Comment="Comment" PostPreview="Post Preview"/>
        <Comments Comment="Comment" PostPreview="Post Preview"/>
    </div>
  )
}

export default DashCommentHistory
