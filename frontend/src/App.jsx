import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import Signin from './Pages/Signin'
import Dashboard from './Pages/Dashboard'
import Sendmoney from './Pages/Sendmoney'
import Signup from './Pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/send' element={<Sendmoney></Sendmoney>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
