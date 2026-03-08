import React, { useEffect, useState } from 'react'
import { useMedia } from '../../contextProviders/MediaProvider'
import supabase from '../../supabase/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contextProviders/UserProvider';
import { useTheme } from '../../contextProviders/ThemeProvider';

export default function Login() {
  const isMobile = useMedia();
  const navigate = useNavigate();
  const {signedIn} = useUser();
  const {theme} = useTheme();

  // Create necessary states
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {loading} = useUser();

  // Function to login
  const login = async() => {
    if((email !== null && email !== '') && (password !== null && password !== '')){
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if(error){
        toast.error(error.message);
      }
      else if(data){
        console.log(data);
        if(!loading){
          navigate('/dashboard/orders');
        }
      };
    };
  };

  // Form input handler
  const inputHandler = (e) => {
    const {value, name} = e.target;

    switch(name){
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  // Go back to welcome page function
  const goBackToWelcome = () => {
    navigate('/');
  };

  // Form submit function
  const submitForm = (e) => {
    e.preventDefault();

    login();
  };

  // Check if user is signed in
  useEffect(() => {
    if(signedIn){
      navigate('/dashboard');
    }
  },[signedIn]);

  // Mobile View
  if(isMobile){
    return (
      <div className='w-full h-[80%] flex flex-col justify-center items-center'>
        {/* Back to welcome button */}
        <div onClick={goBackToWelcome} className='w-[60%] flex justify-start mb-5'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </div>
        {/* Login Form section */}
        <form onSubmit={submitForm} className='w-[60%] flex flex-col gap-1'>
          <h1 className='text-3xl mb-5'>Login</h1>
          {/* Email */}
          <div>
            <label>Email: </label>
            <input className='rounded-xl w-full px-2' onChange={inputHandler} name='email' type="email" required/>
          </div>
          {/* Password */}
          <div>
            <label>Password: </label>
            <input className='rounded-xl w-full px-2' onChange={inputHandler} name='password' type="password" required/>
          </div>
          {/* Button login */}
          <div className='w-full flex justify-end'>
            <button className='rounded-xl px-2' onClick={login}>Login</button>
          </div>
        </form>
      </div>
    )
  }

  // PC View
  if(!isMobile){
    return (
      <div className='w-full h-[80%] flex flex-col justify-center items-center'>
        {/* Back button */}
        <div onClick={goBackToWelcome} className='w-[25%] flex justify-start mb-5'>
          <div className={`w-[3rem] flex justify-center items-center border-[2px] ${theme == 'light' ? 'border-[#182217]' : 'border-[#ffefcb]'} rounded-xl hover:cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </div>
        </div>
        {/* Login Form */}
        <form onSubmit={submitForm} className={`w-[25%] flex flex-col gap-1 border-[2px] ${theme == 'light' ? 'border-[#182217]' : 'border-[#ffefcb]'} p-3 rounded-2xl`}>
          <h1 className='text-3xl mb-5'>Login</h1>
          {/* Email */}
          <div>
            <label>Email: </label>
            <input className='rounded-xl w-full px-2' onChange={inputHandler} name='email' type="email" required/>
          </div>
          {/* Password */}
          <div>
            <label>Password: </label>
            <input className='rounded-xl w-full px-2' onChange={inputHandler} name='password' type="password" required/>
          </div>
          {/* Button login */}
          <div className='w-full flex justify-end'>
            <button className='rounded-xl px-2' onClick={login}>Login</button>
          </div>
        </form>
      </div>
    )
  }
}
