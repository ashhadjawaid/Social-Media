import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import PlaceIcon from '@mui/icons-material/Place';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Share() {

    const {user} = useContext(AuthContext)
    const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) =>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.img = fileName
            try {
                await axios.post("http://localhost:8000/upload", data)
                console.log(data);
                console.log(newPost);
            } catch (error) {
                console.log(error)
            }
        }

        try {
            await axios.post("http://localhost:8000/api/posts/", newPost)
            window.location.reload()
        } catch (error) {
            
        }
    }

  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg' src={user.profilePicture ? PF+user.profilePicture: PF+"Person/nocover.png"} alt="" />
                <input placeholder={"What's in your mind "+user.username+"?"} className='shareInput' ref={desc}/>
            </div>
            <hr className='shareHr'/>
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className='shareImg' />
                    <CancelIcon className='shareCancelImg'onClick = {()=>setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMediaIcon htmlColor='red' className='shareIcon'/>
                        <span className='shareOptionText'>Photo or Video</span>
                        <input style={{display: "none"}} name = 'file' type="file" id='file' accept='.png,.jpeg,jpg' onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <LabelIcon htmlColor='blue' className='shareIcon'/>
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                        <PlaceIcon htmlColor='green' className='shareIcon'/>
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon'/>
                        <span className='shareOptionText'>Feelings</span>
                    </div>
                </div>
                <button className='shareButton' type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}
