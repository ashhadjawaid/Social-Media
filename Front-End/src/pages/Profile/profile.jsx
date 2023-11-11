import './profile.css'
import Topbar from '../../components/TopBar/Topbar'
import Sidebar from '../../components/Sidebar/sidebar'
import Feed from '../../components/Feed/feed'
import Rightbar from '../../components/Rightbar/rightbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({})
  const username = useParams().username;

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8000/api/users?username=${username}`);
      setUser(res.data);
    }
    fetchUser()
  },[username])

  return (
    <>
    <Topbar/>
    <div className="profile">
    <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img src={user.coverPicture || PF+"Person/nocover (2).png"} alt="" className="profileCoverImg" />
            <img src={user.profilePicture || PF+"Person/nocover.png"} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <h4 className='profileInfoName'>{user.username}</h4>
                <span className='profileInfoDesc'>{user.desc}</span>
            </div>
        </div>
            <div className="profileRightBottom">
                <Feed username = {username}/>
                <Rightbar user = {user}/>
            </div>
        </div>
    </div>
    </>
  )
}
