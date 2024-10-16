import React from 'react'
import {Link} from "react-router-dom"
import "./styles/home.css"
const Home = () => {
  return (
    <div className='home'>
      
      <h1 className="landing-gt">Generate Transcript</h1>
       <Link to="/generate-transcript"> <button>Proceed</button></Link>
    </div>
  )
}

export default Home
