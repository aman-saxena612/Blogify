import React from 'react'
import {imgFolder} from "../url"

const ProfilePosts = ({post}) => {
  return (
    <div className='w-full flex mt-8 space-x-4'>

    {/* left div */}

    <div className='w-[35%] h-[200px] flex justify-center items-center m-1'>

    <img src={imgFolder + post.img} className='h-full w-full object-cover'/>
    </div>

    {/* right div */}
    <div className='flex flex-col w-[65%]'>

    <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'> {post.title} </h1>

    <div className='flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
    <p> @{post.username} </p>

    <div className='flex space-x-2'>
    <p> {new Date(post.updatedAt).toString().slice(0, 15)} </p>
    <p> {new Date(post.updatedAt).toString().slice(16, 24)} </p>

    </div>
    </div>

    <p className='text-sm md:text-lg'> {post.desc} </p>

    </div>

    </div>
  )
}

export default ProfilePosts

// import React from 'react'
// import {imgFolder} from "../url"

// const ProfilePosts = ({post}) => {
//   return (
//     <div className='border-4 border-green-500 w-full flex mt-8 space-x-4'>

//     {/* left div */}

//     <div className='border-4 border-blue-500 w-[35%] h-[200px] flex justify-center items-center m-1'>

//     <img src={imgFolder + post.img} className='h-full w-full object-cover'/>
//     </div>

//     {/* right div */}
//     <div className='border-4 border-pink-500 flex flex-col w-[65%]'>

//     <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'> {post.title} </h1>

//     <div className='border-4 border-yellow-500 flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4'>
//     <p> @{post.username} </p>

//     <div className='border-4 border-black-500 flex space-x-2'>
//     <p> {new Date(post.updatedAt).toString().slice(0, 15)} </p>
//     <p> {new Date(post.updatedAt).toString().slice(16, 24)} </p>

//     </div>
//     </div>

//     <p className='text-sm md:text-lg'> {post.desc} </p>

//     </div>

//     </div>
//   )
// }

// export default ProfilePosts