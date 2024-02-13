import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from './pages/Reg/Registration';
import AppContext from './context/app.context';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';

function App() {
  const [user, setUser]= useState('')

  return (
    <AppContext.Provider value ={{user , setUser}}>
        <BrowserRouter>
      <Routes>
        <Route path = '/' element = {user ==''?<Registration/>:<Navigate to ='/admin'/>}></Route>
        <Route path = '/login' element = {user ==''?<Login/>:<Navigate to ='/admin'/>}></Route>
        <Route path = '/admin' element = {user !==''?<Admin/>:<Navigate to ='/'/>}></Route>
      </Routes>
      </BrowserRouter>
      </AppContext.Provider>
  )
}

export default App
