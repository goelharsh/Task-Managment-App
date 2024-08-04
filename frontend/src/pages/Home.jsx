import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import TaskList from '../components/TaskList'

const Home = () => {
  
  return (
    <div className='w-full h-auto'>
      <Navbar/>

      <div className='w-[80%] h-auto mx-auto'>
         <HeroSection/>
      </div>

      <div className='w-[80%] h-auto mx-auto'>
         <TaskList/>
      </div>
    </div>
  )
}

export default Home
