import './rightbar.css'
import {Users} from "../../../dummyData"
import Online from '../Online/online'
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function Rightbar({user}) {
  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const {user:currentUser, dispatch} = useContext(AuthContext)
  const [followed, setFollowed] = useState(currentUser.following.includes(user?.id))

  // useEffect(()=>{
  //   setFollowed(currentUser.following.includes(user?.id))
  // },[currentUser, user.id])
  useEffect(()=>{
    const getFriends = async()=>{
      try {
        const friendList = await axios.get("http://localhost:8000/api/users/friends/"+ user._id);
        setFriends(friendList.data)
      } catch (err) {
        console.log(err)
      }
    }
    getFriends()
  },[user])

  const handleClick = async()=>{
    try {
      if(followed){
        await axios.put("http://localhost:8000/api/users/"+user._id+"/unfollow", {userId:currentUser._id})
        dispatch({type:UNFOLLOW, payload:user._id})
      }else{
        await axios.put("http://localhost:8000/api/users/"+user._id+"/follow", {userId:currentUser._id})
        dispatch({type:FOLLOW, payload:user._id})
      }
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  }

  const HomeRightBar = () =>{
    return(
      <>
      <div className="birthdayContainer">
          <img src="/src/assets/gift.png" alt="" className="birthdayImg" />
          <span className='birthdayText'> <b>Ali</b> and <b>5 other friends</b> have birthday today</span>
        </div>
        <img className='rightbarAd' src="/src/assets/ad.png" alt="" />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
            <Online key={u.id} user={u}/>
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () =>{
    return(
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed? "Unfollow" : "Follow"}
          {followed? <RemoveIcon/> : <AddIcon/>}
        </button>
      )}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{user.relationships === 1 ? "Single" : user.relationships === 2 ? "In a relationship" : "-"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {friends.map(friend =>(
          <Link to={"/profile/"+ friend.username} style={{textDecoration:"none"}}>
          <div className="rightbarFollowing">
          <img src={friend.profilePicture? PF+friend.profilePicture: PF+"Person/nocover.png"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{friend.username}</span>
        </div>
          </Link>
          ))}
      </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar/>: <HomeRightBar/>}
      </div>
    </div>
  )
}
