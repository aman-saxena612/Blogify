import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from "axios"
import { URL } from '../url'

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // console.log(username);
  // console.log(email);
  // console.log(password);

  const handleRegister = async () => {
        try {
          
          const response = await axios.post(URL + '/api/auth/register', {username, email, password});
          // console.log(response);
          // console.log(response.data);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setError(false);
          navigate("/login");

        } catch (error) {
          setError(true);
          console.log(error);
        }
  }
  return (

    <>

    <div className='flex items-center justify-between px-6 md:px-[200px] py-4 border-4 border-indigo-500'>
             <h1 className='text-lg md:text-xl font-extrabold border-4 border-sky-500'><Link to="/"> Blogify </Link></h1>
             <h3><Link to="/login"> Log In </Link></h3>
        </div>
    <div className='border-4 border-green-500 w-full flex justify-center items-center h-[80vh]'>

        <div className='border-4 border-yellow-500 flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]'>

            <h1 className='text-xl font-bold text-left'> Create an account! </h1>

            <input onChange={(e) => setUsername(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type='text' placeholder='Enter Your Username' />
            <input onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type='email' placeholder='Enter Your Email' />
            <input onChange={(e) => setPassword(e.target.value)} className='w-full px-4 py-2 border-2 border-black outline-0' type='password' placeholder='Enter Your Password' />

            <button onClick={handleRegister} className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'> Sign Up </button>

            {error && <p className='text-red-500 text-sm'> Something Went Wrong! Please try again </p>}

            <div className='border-4 border-green-500 flex justify-center items-center space-x-3'>
                <p> Already Registered? </p>
                <p className='text-gray-500 hover:text-black'><Link to="/login"> Log In </Link></p>

            </div>

        </div>

    </div>

    <Footer />
    </>
  )
}

export default Register