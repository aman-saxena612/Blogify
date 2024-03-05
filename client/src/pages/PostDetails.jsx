import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { BiEdit, BiEditAlt } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Footer from '../components/Footer'
import Comment from '../components/Comment'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { URL, imgFolder } from '../url'
import { UserContext } from '../context/UserContext'
import Loader from '../components/Loader'

const PostDetails = () => {

  const postId = useParams().id;
  // console.log(postId);

  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const {user} = useContext(UserContext);

  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {

      const response = await axios.get(URL + "/api/posts/" + postId);
      // console.log(response.data);
      setPost(response.data);
      setLoader(false);

    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const handleDeletePost = async () => {
        try {
          
          const response = await axios.delete(URL + "/api/posts/" + postId, {withCredentials: true});
          console.log(response.data);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
  }

  const fetchComments = async () => {
        try {
          
          const response = await axios.get(URL + "/api/comments/post/" + postId);
          // console.log(response.data);
          setComments(response.data);
        } catch (error) {
          console.log(error);
        }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handlePostComment = async (e) => {
    e.preventDefault();

    try {
      
     const response = await axios.post(URL + "/api/comments/create" , {comment: comment, author: user.username, postId: postId, userId: user._id}, {withCredentials: true});
      // console.log(response.data);

      // fetchComments();  
      window.location.reload(true);
      // navigate("/posts/post/" + postId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />

      {loader? <div className='h-[80vh] flex justify-center items-center w-full'> <Loader /> </div> : <div className='border-4 border-green-500 px-8 md:px-[200px] mt-8'>
        <div className=' border-4 border-yellow-500 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-black md:text-3xl'> {post.title} </h1>

          {user?._id == post?.userId && 
          <div className='border-4 border-pink-500 flex justify-center items-center space-x-2'>

            <p className='cursor-pointer' onClick={() => navigate("/edit/" + postId)}>  <BiEdit /> </p>
            <p className='cursor-pointer' onClick={handleDeletePost}> <MdDelete /> </p>

          </div>
          }

        </div>

        <div className='border-4 border-blue-500 flex items-center justify-between mt-2 md:mt-4'>
          <p> @{post.username} </p>
          <div className='border-4 border-black flex space-x-2'>
            <p> {new Date(post.updatedAt).toString().slice(0, 15)} </p>
            <p> {new Date(post.updatedAt).toString().slice(16, 24)} </p>

          </div>

        </div>

        <img src={ imgFolder + post.img} className='w-auto  mx-auto mt-8' />

        <p className='mx-auto mt-8'> {post.desc} </p>

        <div className='border-4 border-blue-500 flex items-center mt-8 font-semibold space-x-4'>
          <p> Categories: </p>
          <div className='border-4 border-yellow-500 flex justify-center items-center space-x-2'>

            {post.categories?.map((cat, i) => (
              <>
              <div key={i} className='bg-gray-300 rounded-lg px-3 py-1'> {cat} </div>
              </>
            ))}
          </div>

        </div>

        <div className='border-4 border-orange-500 flex flex-col mt-4'>
          <h3 className='mt-6 mb-4 font-semibold'> Comments </h3>

          {/* comments: */}

          {comments?.map((c) => (
            <>
              <Comment key={c.id} c={c} post={post}/>
            </>
          ))}

        </div>
        {/* write a comment: */}
        <div className='border-4 border-green-500 w-full flex flex-col mt-4 md:flex-row'>
          <input onChange={(e) => setComment(e.target.value)} type='text' placeholder='Write Your Comment' className='md:w-[80%] outline-none px-4 py-2 mt-4 md:mt-0' />

          <button onClick={handlePostComment} className='bg-black text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0'> Add Comment </button>

        </div>

      </div>}
      {/* <Footer /> */}
    </div>
  )
}

export default PostDetails