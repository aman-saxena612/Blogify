import React from 'react'
import Navbar from './components/Navbar'
import HomePosts from './components/HomePosts'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserContext, UserContextProvider } from './context/UserContext'
import MyBlogs from './pages/MyBlogs'

// border-4 border-blue-500

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}

      <UserContextProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/write' element={<CreatePost />} />
        <Route exact path='/posts/post/:id' element={<PostDetails />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/myblogs/:id' element={<MyBlogs />} />
      </Routes>
      </UserContextProvider>
      {/* <HomePosts /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default App