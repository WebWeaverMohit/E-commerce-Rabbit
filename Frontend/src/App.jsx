import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <UserLayout /> }  >{/* user layout */}</Route>
      <Route>{/* admin layout */}</Route>
    </Routes>
  )
}

export default App