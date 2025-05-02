import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({... formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(formData),     
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setIsLoading(false);
      if (res.ok) {
        navigate('/signin');
      } 
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
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
          <p className='mt-5 text-sm'>This is demo project</p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col max-w-md gap-2' onSubmit={handleSubmit}>
            <div className=''>
              <Label className='font-bold' htmlFor='your name'>Your Name</Label>
              <TextInput id="username" type="text" placeholder="Username" required onChange={handleChange}/>
            </div>
            <div className=''>
              <Label className='font-bold' htmlFor='email'>Email</Label>
              <TextInput id="email" type="email" placeholder="Email" required onChange={handleChange}/>
            </div>
            <div className=''>
              <Label className='font-bold' htmlFor='password'>Password</Label>
              <TextInput id="password" type="password" placeholder="Password" required onChange={handleChange}/>
            </div>
            <Button className='bg-gradient-to-r from-indigo-500 to-blue-500 ' type='submit' disable={isLoading}> 
              {
                isLoading ? (
                  <>
                    <Spinner size={'sm'} color={'white'}/>
                    <span className='pl-3'>Loading ...</span>
                  </>
                ) : 'Sign up'
              }
            </Button>
            <OAuth />
          </form>
          {/*  */}
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Sign in
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

export default SignUp