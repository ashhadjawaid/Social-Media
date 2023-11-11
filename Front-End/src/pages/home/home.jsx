import React from 'react'
import './home.css'
import Topbar from '../../components/TopBar/Topbar'
import Sidebar from '../../components/Sidebar/sidebar'
import Feed from '../../components/Feed/feed'
import Rightbar from '../../components/Rightbar/rightbar'

const Home = () => {
  return (
    <>
      <Topbar/>
      <div className="homeContainer">
      <Sidebar/>
      <Feed/>
      <Rightbar />
      </div>
    </>
  )
}

export default Home
