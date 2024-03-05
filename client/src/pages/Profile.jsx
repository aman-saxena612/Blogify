import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfilePosts from '../components/ProfilePosts'
import axios from 'axios'
import { URL } from '../url'
import { UserContext } from '../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
// border-4 border-blue-500

const Profile = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState([]);

  const {user, setUser} = useContext(UserContext);
  const param = useParams().id;
  const navigate = useNavigate();

  // console.log(user);

const fetchProfile = async () => {
  try {
    if (user && user._id) {
      const response = await axios.get(URL + "/api/user/" + user._id);
      // console.log(response.data);

      setUsername(response.data.username);
      setEmail(response.data.email);
      setPassword(response.data.password);
    }
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  fetchProfile();
}, [user?._id]);


// console.log(user._id);
const handleUserUpdate = async () => {
  setUpdated(false);
      try {
        
        const response = await axios.put(URL + "/api/user/" + user?._id, {username, email, password}, {withCredentials: true});
        console.log(response);

        setUpdated(true);
        // console.log("here updating ")

      } catch (error) {
        console.log(error);
        setUpdated(false);
      }
}

const handleUserDelete = async () => {
      try {
        
        const response = await axios.delete(URL + "/api/user/" + user._id, {withCredentials: true});
        console.log(response);
        // console.log("User deleted!");
        setUser(null);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
}

const fetchUserPosts = async () => {
      try {
        
        const response = await axios.get(URL + "/api/posts/user/" + user._id);
        console.log("here in fetching user posts ");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
}

useEffect(() => {
  fetchUserPosts()
}, [user._id])

  return (
    <div>
        <Navbar />
        <div className='px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start'>

        <div className='flex flex-col md:w-[70%] w-full mt-8 md:mt-0'>
        <h1 className='text-xl font-bold mb-4'> Your Posts </h1>

            {posts?.map((post) => (
              <>
              <ProfilePosts key={post._id} post={post} />
              </>
            ))}
        </div>

        <div className='md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end'>

        <div className='flex flex-col space-y-4 items-start'>

        <h1 className='text-xl font-bold mb-4'> Profile </h1>
        <input onChange={(e) => setUsername(e.target.value)} value={username} className='outline-none px-4 py-2 text-gray-500' placeholder='Your username' type='text' />

        <input onChange={(e) => setEmail(e.target.value)} value={email} className='outline-none px-4 py-2 text-gray-500' placeholder='Your email' type='email' />
 
{/*        <input onChange={(e) => setPassword(e.target.value)} value={password} className='outline-none px-4   py-2 text-gray-500' placeholder='Your password' type='password' /> */}

        <div className='flex items-center space-x-4 mt-8'>

        <button onClick={handleUserUpdate} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'> Update </button>

        <button onClick={handleUserDelete} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'> Delete </button>

        </div>

        {updated && <h3 className='text-green-500 text-sm text-center'> User Updated successfully! </h3>}

        </div>

        </div>

        </div>
        <Footer />
    </div>
  )
}

export default Profile

// import React, { useContext, useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import ProfilePosts from '../components/ProfilePosts'
// import axios from 'axios'
// import { URL } from '../url'
// import { UserContext } from '../context/UserContext'
// import { useNavigate, useParams } from 'react-router-dom'
// // border-4 border-blue-500

// const Profile = () => {

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [updated, setUpdated] = useState(false);
//   const [posts, setPosts] = useState([]);

//   const {user, setUser} = useContext(UserContext);
//   const param = useParams().id;
//   const navigate = useNavigate();

//   // console.log(user);

// const fetchProfile = async () => {
//   try {
//     if (user && user._id) {
//       const response = await axios.get(URL + "/api/user/" + user._id);
//       // console.log(response.data);

//       setUsername(response.data.username);
//       setEmail(response.data.email);
//       setPassword(response.data.password);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// useEffect(() => {
//   fetchProfile();
// }, [user?._id]);


// // console.log(user._id);
// const handleUserUpdate = async () => {
//   setUpdated(false);
//       try {
        
//         const response = await axios.put(URL + "/api/user/" + user?._id, {username, email, password}, {withCredentials: true});
//         console.log(response);

//         setUpdated(true);
//         // console.log("here updating ")

//       } catch (error) {
//         console.log(error);
//         setUpdated(false);
//       }
// }

// const handleUserDelete = async () => {
//       try {
        
//         const response = await axios.delete(URL + "/api/user/" + user._id, {withCredentials: true});
//         console.log(response);
//         // console.log("User deleted!");
//         setUser(null);
//         navigate("/");
//       } catch (error) {
//         console.log(error);
//       }
// }

// const fetchUserPosts = async () => {
//       try {
        
//         const response = await axios.get(URL + "/api/posts/user/" + user._id);
//         console.log("here in fetching user posts ");
//         setPosts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
// }

// useEffect(() => {
//   fetchUserPosts()
// }, [user._id])

//   return (
//     <div>
//         <Navbar />
//         <div className='border-4 border-blue-500 px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start'>

//         <div className='border-4 border-green-500 flex flex-col md:w-[70%] w-full mt-8 md:mt-0'>
//         <h1 className='text-xl font-bold mb-4'> Your Posts </h1>

//             {posts?.map((post) => (
//               <>
//               <ProfilePosts key={post._id} post={post} />
//               </>
//             ))}
//         </div>

//         <div className='border-4 border-indigo-500 md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end'>

//         <div className='border-4 border-yellow-500 flex flex-col space-y-4 items-start'>

//         <h1 className='text-xl font-bold mb-4'> Profile </h1>
//         <input onChange={(e) => setUsername(e.target.value)} value={username} className='outline-none px-4 py-2 text-gray-500' placeholder='Your username' type='text' />

//         <input onChange={(e) => setEmail(e.target.value)} value={email} className='outline-none px-4 py-2 text-gray-500' placeholder='Your email' type='email' />
 
// {/*        <input onChange={(e) => setPassword(e.target.value)} value={password} className='outline-none px-4   py-2 text-gray-500' placeholder='Your password' type='password' /> */}

//         <div className='border-4 border-pink-500 flex items-center space-x-4 mt-8'>

//         <button onClick={handleUserUpdate} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'> Update </button>

//         <button onClick={handleUserDelete} className='text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400'> Delete </button>

//         </div>

//         {updated && <h3 className='text-green-500 text-sm text-center'> User Updated successfully! </h3>}

//         </div>

//         </div>

//         </div>
//         <Footer />
//     </div>
//   )
// }

// export default Profile