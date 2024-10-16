
import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout';

const Dashboard = () => {
    
    
  return (
    <Layout children={
        <>
  <div className="relative h-full w-full rounded-lg shadow-2xl shadow-black">
    <img src="/dashboard.jpg" className="h-full w-full rounded-lg" alt="Dashboard" />
    <div className="w-fit h-fit absolute top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-950 px-2.5 py-4 backdrop-blur-md bg-opacity-30">
      <div className='typewriter  text-6xl font-bold'>Welcome to Jupiter Apparels</div>
    </div>
  </div>

  {/* Inline CSS for Typewriter Effect */}
  <style>
    {`
      .typewriter {
      background: rgb(244,28,28);
        background: linear-gradient(90deg, rgba(243,172,27,1) 0%, rgba(239,245,15,1) 99%, rgba(244,255,0,1) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
        font-family: monospace;
        overflow: hidden; /* Ensures the content is not revealed until the animation */
        border-right: .15em solid orange; /* The typewriter cursor */
        white-space: nowrap; /* Keeps the content on a single line */
        margin: 0 auto; /* Gives that scrolling effect as the typing happens */
        letter-spacing: .15em; /* Adjust as needed */
        animation: 
          typing 3.5s steps(30, end),
          blink-caret .5s step-end infinite;
      }

      /* The typing effect */
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }

      /* The typewriter cursor effect */
      @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: orange }
      }
    `}
  </style>
</>

      
        
    }/>
  )
}

export default Dashboard