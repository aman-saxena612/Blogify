import React, { useContext, useEffect, useState } from 'react'
import HomePosts from '../components/HomePosts'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { URL } from '../url'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'


const Home = () => {

  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const {search} = useLocation();
  const {user} = useContext(UserContext);
  // console.log(user);
  // console.log(search);

  const fetchPosts = async () => {

    setLoader(true);

    try {
      
      const response = await axios.get(URL + "/api/posts/" + search)
      // console.log(response.data);
      setPosts(response.data);
      // console.log(response.data.length);

      if(response.data.length == 0){
        setNoResults(true);
      }


      else{
        setNoResults(false);
      }

      setLoader(false);

    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  }

  useEffect(() => {
    fetchPosts()
    // console.log("Entered home")
    console.log(noResults)
  }, [])
  return (
    <>
    <Navbar />
    <div className='px-8 md:px-[200px] min-h-[80vh]'>
     {loader ? <div className='h-[40vh] flex justify-center items-center'> <Loader /> </div> : !noResults ? posts.map((post) => (

      <>
        <Link to={user ? `/posts/post/${post._id}` : "/login"}>
            <HomePosts key={post._id} post={post} />
        </Link>
      </>
     )) : <h2 className='text-center font-bold mt-16'> No Posts Found! </h2>}
    </div>
    </>
  )
}

export default Home
