import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Navbar = () => {
    const location=useLocation()
    const navigate=useNavigate()

    console.log(location.pathname)

  return (
    <div className='flex justify-end bg-gray-800 text-white gap-4 p-4'>
        <div className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${location.pathname==='/'&&'font-bold'}`} onClick={()=>navigate('/')}>
            Home
        </div>
        <div className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${location.pathname==='/candidate-dashboard'&&'font-bold'}`} onClick={()=>navigate('/candidate-dashboard')}>
            Dashboard
        </div>
        <div className={`transition-all duration-300 cursor-pointer border-b-2 border-transparent hover:border-white ${location.pathname==='/form'&&'font-bold'}`} onClick={()=>navigate('/form')}>
            Form
        </div>
    </div>
  )
}

export default Navbar