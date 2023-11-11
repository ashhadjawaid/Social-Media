import './online.css'
const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

export default function Online({user}) {
  return (
    <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className='rightbarProfileImg' src={PF+user.profilePicture} alt="" />
                <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>{user.username}</span>
          </li>
  )
}
