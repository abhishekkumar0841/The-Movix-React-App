import React from 'react'
import './home.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'

const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <div style={{height: '1000px'}}></div>
    </div>
  )
}

export default Home
