import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'

function App() {


  return (
    <div className='min-h-screen overflow-auto bg-richblack-900 text-white font-inter'>
      

      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
