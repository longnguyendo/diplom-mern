import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'


const SignIn = () => {
  
  const [formData, setFormData] = useState({});
  const {loading: isLoading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({... formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'))
    }
    
    try {
      dispatch(signInStart());
      const res = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(formData),     
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      } 
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col max-w-3xl p-3 mx-auto md:flex-row md:items-center'>
        {/* left */}
        <div className='flex-1 gap-2'>
          <Link to='/' className='self-center text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500'>Diplom</span>
            Blog
          </Link> 
          <p className='mt-5 text-sm'>This is demo project, you can sign in this page with email, password or with google</p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col max-w-md gap-2' onSubmit={handleSubmit}>
            <div className=''>
              <Label className='font-bold' htmlFor='email'>Email</Label>
              <TextInput id="email" type="email" placeholder="Email" required onChange={handleChange}/>
            </div>
            <div className=''>
              <Label className='font-bold' htmlFor='password'>Password</Label>
              <TextInput id="password" type="password" placeholder="********" required onChange={handleChange}/>
            </div>
            <Button className='bg-gradient-to-r from-indigo-500 to-blue-500 ' type='submit' disable={isLoading}> 
              {
                isLoading ? (
                  <>
                    <Spinner size="md" color="info" aria-label="Info spinner example" />
                    <span className='pl-3'>Loading ...</span>
                  </>
                ) : 'Sign in'
              }
            </Button>
            <OAuth />
          </form>
          {/*  */}
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Sign up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn