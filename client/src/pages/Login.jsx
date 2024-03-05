import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      
      const response = await axios.post(URL + "/api/auth/login", {email, password}, {withCredentials: true});
      // console.log(response.data);
      setUser(response.data);
      console.log("Login Successful!");
      // console.log(setUser);
      setError(false);
      navigate("/");

    } catch (error) {
      setError(true);
      console.log(error);
    }
  }


  return (

    <>
        <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
             <h1 className='text-lg md:text-xl font-extrabold'><Link to="/"> Blogify </Link></h1>
             <h3><Link to="/register"> Register </Link></h3>
        </div>

    <div className='w-full flex justify-center items-center h-[80vh]'>

        <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>

            <h1 className='text-xl font-bold text-left'> Welcome! Log In </h1>

            <input onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type='text' placeholder='Enter Your Email' />
            <input onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type='password' placeholder='Enter Your Password' />

            <button onClick={handleLogin} className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'> Log In </button>

            {error && <p className='text-red-500 text-sm'> Something Went Wrong! Please try again </p>}

            <div className='flex justify-center items-center space-x-3'>
                <p> New here? </p>
                <p className='text-gray-500 hover:text-black'><Link to="/register"> Register </Link></p>

            </div>

        </div>

    </div>

    <Footer />
    </>
  )
}

export default Login

// import React, { useState, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Footer from '../components/Footer'
// import axios from 'axios';
// import { URL } from '../url';
// import { UserContext } from '../context/UserContext';

// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(false);
//   const {setUser} = useContext(UserContext);

//   const navigate = useNavigate();

//   const handleLogin = async () => {

//     try {
      
//       const response = await axios.post(URL + "/api/auth/login", {email, password}, {withCredentials: true});
//       // console.log(response.data);
//       setUser(response.data);
//       console.log("Login Successful!");
//       // console.log(setUser);
//       setError(false);
//       navigate("/");

//     } catch (error) {
//       setError(true);
//       console.log(error);
//     }
//   }


//   return (

//     <>
//         <div className='flex items-center justify-between px-6 md:px-[200px] py-4 border-4 border-indigo-500'>
//              <h1 className='text-lg md:text-xl font-extrabold border-4 border-sky-500'><Link to="/"> Blogify </Link></h1>
//              <h3><Link to="/register"> Register </Link></h3>
//         </div>

//     <div className='border-4 border-green-500 w-full flex justify-center items-center h-[80vh]'>

//         <div className='border-4 border-yellow-500 flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>

//             <h1 className='text-xl font-bold text-left'> Welcome! Log In </h1>

//             <input onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type='text' placeholder='Enter Your Email' />
//             <input onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type='password' placeholder='Enter Your Password' />

//             <button onClick={handleLogin} className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'> Log In </button>

//             {error && <p className='text-red-500 text-sm'> Something Went Wrong! Please try again </p>}

//             <div className='border-4 border-green-500 flex justify-center items-center space-x-3'>
//                 <p> New here? </p>
//                 <p className='text-gray-500 hover:text-black'><Link to="/register"> Register </Link></p>

//             </div>

//         </div>

//     </div>

//     <Footer />
//     </>
//   )
// }

// export default Login