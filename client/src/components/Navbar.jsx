import React from 'react'
import { useState } from 'react';
import {Link, NavLink} from 'react-router-dom'
import Auth from './Auth';

const Navbar = () => {
    const [authMode, setAuthMode] = useState(null)

  return (
    <>
        <div className='mx-auto max-w-6xl flex items-center justify-between py-4'>
            <div>
                <h1 className='text-3xl font-serif font-semibold'>Medium</h1>
            </div>
            <div className='flex items-center justify-between gap-7'>
                <ul className='flex items-center gap-7'>
                    <li><NavLink to='/'>Our story</NavLink></li>
                    <li><NavLink to='/'>Membership</NavLink></li>
                    <li><NavLink to='/'>Write</NavLink></li>
                    <button onClick={()=>setAuthMode('signin')}>Sign In</button>
                </ul>
                <div className='bg-black text-white py-2 px-4 rounded-full'>
                    <button onClick={()=>setAuthMode('signup')}>Get Started</button>
                </div>
            </div>
        </div>
        {
            authMode &&
            <Auth mode={authMode} setMode={setAuthMode} onClose={()=>setAuthMode(null)} />
        }
    </>
  )
}

export default Navbar