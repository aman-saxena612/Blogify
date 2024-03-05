import React, { useContext } from 'react'
import {BiEdit, BiEditAlt} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'

const Comment = ({c, post}) => {

    const {user} = useContext(UserContext);

    const handleDeleteComment = async () => {
          try {
            
            const response = await axios.delete(URL + "/api/comments/" + c._id, {withCredentials: true});
            console.log(response);
            window.location.reload(true);
        } catch (error) {
            console.log( "Error while deleting comment" + error);
          }
    }
    return (
        <div className='px-2 py-2 bg-gray-200 rounded-lg'>
            <div className='flex items-center justify-between'>

                <h3 className='font-bold text-gray-600'> @{c.author} </h3>

                <div className='flex justify-center items-center space-x-4'>
                    <p className='text-gray-500 text-sm'> {new Date(c.updatedAt).toString().slice(0, 15)} </p>
                    <p className='text-gray-500 text-sm'> {new Date(c.updatedAt).toString().slice(16, 24)} </p>

                   {user?._id == c?.userId && <div className='border-4 border-blue-500 flex items-center justify-center space-x-2'>
                       <p className='cursor-pointer'>  <BiEdit /> </p>
                       <p className='cursor-pointer' onClick={handleDeleteComment}> <MdDelete /> </p>

                    </div>}

                </div>

            </div>

            <p className='px-4 mt-2'> {c.comment} </p>

        </div>
    )
}

export default Comment

// import React, { useContext } from 'react'
// import {BiEdit, BiEditAlt} from 'react-icons/bi'
// import {MdDelete} from 'react-icons/md'
// import { UserContext } from '../context/UserContext'
// import axios from 'axios'
// import { URL } from '../url'

// const Comment = ({c, post}) => {

//     const {user} = useContext(UserContext);

//     const handleDeleteComment = async () => {
//           try {
            
//             const response = await axios.delete(URL + "/api/comments/" + c._id, {withCredentials: true});
//             console.log(response);
//             window.location.reload(true);
//         } catch (error) {
//             console.log( "Error while deleting comment" + error);
//           }
//     }
//     return (
//         <div className='border-4 border-purple-500 px-2 py-2 bg-gray-200 rounded-lg'>
//             <div className='border-4 border-yellow-500 flex items-center justify-between'>

//                 <h3 className='font-bold text-gray-600'> @{c.author} </h3>

//                 <div className='border-4 border-black flex justify-center items-center space-x-4'>
//                     <p className='text-gray-500 text-sm'> {new Date(c.updatedAt).toString().slice(0, 15)} </p>
//                     <p className='text-gray-500 text-sm'> {new Date(c.updatedAt).toString().slice(16, 24)} </p>

//                    {user?._id == c?.userId && <div className='border-4 border-blue-500 flex items-center justify-center space-x-2'>
//                        <p className='cursor-pointer'>  <BiEdit /> </p>
//                        <p className='cursor-pointer' onClick={handleDeleteComment}> <MdDelete /> </p>

//                     </div>}

//                 </div>

//             </div>

//             <p className='px-4 mt-2'> {c.comment} </p>

//         </div>
//     )
// }

// export default Comment