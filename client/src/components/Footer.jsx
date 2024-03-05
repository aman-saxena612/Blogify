import React from 'react'
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <>

    <div className='border-4 border-indigo-500 mt-8 w-full bg-black px-8 md:px-[500px] flex md:flex-row flex-col space-y-4 md:space-y-0 justify-between text-sm md:text-md py-8'>

        <div className='border-4 border-blue-500 flex flex-col text-white'>
            <p> Featured Blogs </p>
            <p> Most Viewed </p>
            <p> Weekly adored </p>
            <p> Reader's Choice </p>

        </div>

        <div className='border-4 border-green-500 flex flex-col text-white'>
            <p> Forum </p>
            <p> Support </p>
            <p> Recent Posts </p>
            <p> About the Founders </p>

        </div>

        <div className='border-4 border-yellow-500 flex flex-col text-white'>
            <p> Privacy and Policy </p>
            <p> About Us </p>
            <p> Terms & Conditions </p>
            <p> Terms of Service </p>

        </div>
    </div>
    <p className='py-2 pb-2 text-center text-white bg-black'> All Rights Reserved <FaRegCopyright className='inline-block'/> 2024 Aman Saxena </p>
    </>
  )
}

export default Footer