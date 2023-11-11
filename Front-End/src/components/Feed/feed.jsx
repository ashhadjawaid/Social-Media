import { useContext, useEffect, useState } from 'react'
import Post from '../Post/post'
import Share from '../Share/share'
import './feed.css'
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";


export default function Feed({username}) {
  const [Posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = username
      ? await axios.get("http://localhost:8000/api/posts/profile/" + username)
       :await axios.get("http://localhost:8000/api/posts/timeline/" + user._id);
       setPosts(res?.data?.data?.sort((p1, p2) => (
        new Date(p2.createdAt) - new Date(p1.createdAt)
    )));
    }
    fetchPosts()
  },[username, user._id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share/>}
          {Posts.map((p) => (
            <Post key={p._id} post={p}/>
          ))}       
      </div>
    </div>
  )
}
