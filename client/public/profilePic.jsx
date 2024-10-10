import React from 'react'

const profilePic = ({path}) => {
    const fullImagePath = `${path}`;

  return <img className="rounded-circle w-3/4 h-3/4 mt-3" src='images/emp2.jpg' alt="profilepic" />;
  
}

export default profilePic