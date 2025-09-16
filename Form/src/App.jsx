import { Button } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import Quiz from './components/Quiz'
import LandingDashboard from './components/Dashboard'

const App = () => {
  return (
    <>
   <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/Login' element={<Login/>}/>


    <Route path='/LandingDashboard' element={<LandingDashboard/>}/>
    <Route path='/quiz' element={<Quiz/>}/>
    
   </Routes> 
    </>
  )
}

export default App
