import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
// border-4 border-red-500

const Navbar = () => {
    // const user = false;

    const [menu, setMenu] = useState(false);
    const [prompt, setPrompt] = useState("");

    const path = useLocation().pathname;
    // console.log(param);

    const navigate = useNavigate();

    const showMenu = () => {
      setMenu(!menu);
    }

    const {user} = useContext(UserContext);
  return (
    <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-xl font-extrabold'><Link to="/"> Blogify </Link></h1>
        {path == "/" && <div className='flex justify-center items-center space-x-0' >
          <p onClick={() => navigate(prompt ? "?search=" + prompt : "/")} className='cursor-pointer'> <CiSearch /> </p>
        <input onChange={(e) => setPrompt(e.target.value)} type='text' placeholder='Search...' className='outline-none px-3' />
        </div>}

        <div className='hidden md:flex items-center justify-center space-x-3 md:space-x-4'>

      { user?<h3><Link to="/write"> Write Blog </Link></h3>:<h3><Link to="/login"> Login </Link></h3>}
      { user? <div onClick={showMenu}> 
            <p className='cursor-pointer'> <FaBars /> </p>
            {menu && <Menu />}
       </div> :<h3><Link to="/register"> Register </Link></h3>}

        </div>

        <div onClick={showMenu} className='md:hidden text-lg'>
          <p className='cursor-pointer relative'> <FaBars /> </p>
          {menu && <Menu />}
        </div>
    </div>
  )
}

export default Navbar

// import React, { useContext, useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { CiSearch } from "react-icons/ci";
// import { FaBars } from "react-icons/fa6";
// import Menu from './Menu';
// import { UserContext } from '../context/UserContext';
// // border-4 border-red-500

// const Navbar = () => {
//     // const user = false;

//     const [menu, setMenu] = useState(false);
//     const [prompt, setPrompt] = useState("");

//     const path = useLocation().pathname;
//     // console.log(param);

//     const navigate = useNavigate();

//     const showMenu = () => {
//       setMenu(!menu);
//     }

//     const {user} = useContext(UserContext);
//   return (
//     <div className='flex items-center justify-between px-6 md:px-[200px] py-4 border-4 border-indigo-500'>
//         <h1 className='text-lg md:text-xl font-extrabold border-4 border-sky-500'><Link to="/"> Blogify </Link></h1>
//         {path == "/" && <div className='border-4 border-red-500 flex justify-center items-center space-x-0' >
//           <p onClick={() => navigate(prompt ? "?search=" + prompt : "/")} className='cursor-pointer'> <CiSearch /> </p>
//         <input onChange={(e) => setPrompt(e.target.value)} type='text' placeholder='Search...' className='outline-none px-3' />
//         </div>}

//         <div className='border-yellow-500 hidden md:flex items-center justify-center space-x-3 md:space-x-4'>

//       { user?<h3><Link to="/write"> Write Blog </Link></h3>:<h3><Link to="/login"> Login </Link></h3>}
//       { user? <div onClick={showMenu}> 
//             <p className='cursor-pointer'> <FaBars /> </p>
//             {menu && <Menu />}
//        </div> :<h3><Link to="/register"> Register </Link></h3>}

//         </div>

//         <div onClick={showMenu} className='md:hidden text-lg'>
//           <p className='cursor-pointer relative'> <FaBars /> </p>
//           {menu && <Menu />}
//         </div>
//     </div>
//   )
// }

// export default Navbar