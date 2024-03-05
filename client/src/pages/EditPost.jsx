import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useNavigate, useParams } from 'react-router-dom'
import { URL } from '../url'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

const EditPost = () => {

    const postId = useParams().id;
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const addCategory = () => {
        let updatedCats = [...cats];
        updatedCats.push(cat);
        setCat("");
        setCats(updatedCats);
    }

    const deleteCategory = (i) => {
        let updatedCats = [...cats];
        updatedCats.splice(i);
        setCats(updatedCats);
    }

    const fetchPost = async () => {
          try {
            
            const response = await axios.get(URL + "/api/posts/" + postId);
            setTitle(response.data.title);
            setDesc(response.data.desc);
            setFile(response.data.img);
            setCats(response.data.categories);
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
      fetchPost()
    }, [postId])

    const handleUpdate = async (e) => {
            e.preventDefault();

          const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats
          }

          if(file) {
            // console.log(file);
            const data = new FormData();
            // console.log(data);
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.img = filename;

            try {
              
              const imgUpload = await axios.post(URL + "/api/upload", data);
              // console.log(imgUpload.data);
            } catch (error) {
              console.log(error);
            }
          }

          //post upload:

          try {
            
            const respond = await axios.put(URL + "/api/posts/" + postId, post, {withCredentials: true});
            // console.log(respond.data);
            navigate("/posts/post/" + respond.data._id)

          } catch (error) {
            console.log(error);
          }
    }
  return (
    <div>
        <Navbar />

        <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-2xl text-xl'> Update the post </h1>

        <form className='w-full flex flex-col space-y-4 mt-4 md:space-y-8'>
        <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Enter post title' className='px-4 py-2 outline-none' />

        <input onChange={(e) => setFile(e.target.files[0])} type='file' className='px-4' />
        <div className='flex flex-col'>
        <div className='flex items-center space-x-4 md:*:space-x-8'>

        <input value={cat} onChange={(e) => setCat(e.target.value)} type='text' className='px-4 py-2 outline-none' placeholder='Enter post category' />
        <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md'> Add </div>

        </div>

        {/* categories: */}

        <div className='flex px-4 mt-3'>
        {cats?.map((ct, i) =>(

        <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>

        <p> {ct} </p>
        <p onClick={deleteCategory} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>

        </div>
        ))}

        </div>

        </div>

        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description' />

         <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md'> Update </button>


        </form>

        </div>
        <Footer />
    </div>
  )
}

export default EditPost

// import React, { useContext, useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import {ImCross} from 'react-icons/im'
// import { useNavigate, useParams } from 'react-router-dom'
// import { URL } from '../url'
// import axios from 'axios'
// import { UserContext } from '../context/UserContext'

// const EditPost = () => {

//     const postId = useParams().id;
//     const navigate = useNavigate();
//     const {user} = useContext(UserContext);

//     const [cat, setCat] = useState("");
//     const [cats, setCats] = useState([]);

//     const [title, setTitle] = useState("");
//     const [desc, setDesc] = useState("");
//     const [file, setFile] = useState(null);

//     const addCategory = () => {
//         let updatedCats = [...cats];
//         updatedCats.push(cat);
//         setCat("");
//         setCats(updatedCats);
//     }

//     const deleteCategory = (i) => {
//         let updatedCats = [...cats];
//         updatedCats.splice(i);
//         setCats(updatedCats);
//     }

//     const fetchPost = async () => {
//           try {
            
//             const response = await axios.get(URL + "/api/posts/" + postId);
//             setTitle(response.data.title);
//             setDesc(response.data.desc);
//             setFile(response.data.img);
//             setCats(response.data.categories);
//           } catch (error) {
//             console.log(error);
//           }
//     }

//     useEffect(() => {
//       fetchPost()
//     }, [postId])

//     const handleUpdate = async (e) => {
//             e.preventDefault();

//           const post = {
//             title,
//             desc,
//             username: user.username,
//             userId: user._id,
//             categories: cats
//           }

//           if(file) {
//             // console.log(file);
//             const data = new FormData();
//             // console.log(data);
//             const filename = Date.now() + file.name;
//             data.append("img", filename);
//             data.append("file", file);
//             post.img = filename;

//             try {
              
//               const imgUpload = await axios.post(URL + "/api/upload", data);
//               // console.log(imgUpload.data);
//             } catch (error) {
//               console.log(error);
//             }
//           }

//           //post upload:

//           try {
            
//             const respond = await axios.put(URL + "/api/posts/" + postId, post, {withCredentials: true});
//             // console.log(respond.data);
//             navigate("/posts/post/" + respond.data._id)

//           } catch (error) {
//             console.log(error);
//           }
//     }
//   return (
//     <div>
//         <Navbar />

//         <div className='border-4 border-blue-500 px-6 md:px-[200px] mt-8'>
//         <h1 className='font-bold md:text-2xl text-xl'> Update the post </h1>

//         <form className='border-4 border-green-500 w-full flex flex-col space-y-4 mt-4 md:space-y-8'>
//         <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Enter post title' className='px-4 py-2 outline-none' />

//         <input onChange={(e) => setFile(e.target.files[0])} type='file' className='px-4' />
//         <div className='flex flex-col'>
//         <div className='flex items-center space-x-4 md:*:space-x-8'>

//         <input value={cat} onChange={(e) => setCat(e.target.value)} type='text' className='px-4 py-2 outline-none' placeholder='Enter post category' />
//         <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md'> Add </div>

//         </div>

//         {/* categories: */}

//         <div className='border-4 border-yellow-500 flex px-4 mt-3'>
//         {cats?.map((ct, i) =>(

//         <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>

//         <p> {ct} </p>
//         <p onClick={deleteCategory} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>

//         </div>
//         ))}

//         </div>

//         </div>

//         <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description' />

//          <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md'> Update </button>


//         </form>

//         </div>
//         <Footer />
//     </div>
//   )
// }

// export default EditPost