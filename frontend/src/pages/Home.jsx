import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'

const Home = () => {
  return (
    <div className='w-full h-auto'>
      <Navbar/>

      <div className='w-[80%] h-auto'>
         <HeroSection/>
      </div>
    </div>
  )
}

export default Home
