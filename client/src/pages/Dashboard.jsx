
import React, { useEffect, useState } from 'react'

import Layout from '../components/Layout';

const Dashboard = () => {
    
    
  return (
    <Layout children={
      
  <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <section className='flex min-w-full flex-col justify-center items-center min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
    <div className="min-w-full   bg-blue-950 px-2.5 py-4 backdrop-blur-md bg-opacity-50">
      <div className='typewriter  text-6xl font-bold'>Welcome to Jupiter Apparels</div>
    </div>


    </section>
   
    


    <style>
    {`
      .typewriter {
      background: rgb(27,172,243);
    background: linear-gradient(90deg, rgba(27,172,243,1) 0%, rgba(15,235,245,1) 52%, rgba(0,255,206,1) 100%);
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
        50% { border-color: rgba(0,255,206,1) }
      }
    `}
  </style>
  
    </div>
  


  


      
        
    }/>
  )
}

export default Dashboard