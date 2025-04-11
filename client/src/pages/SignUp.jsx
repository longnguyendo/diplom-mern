import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

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
          <form className='flex flex-col max-w-md gap-2'>
            <div className=''>
              <Label className='font-bold' htmlFor='your name'>Your Name</Label>
              <TextInput id="username" type="text" placeholder="Username" required />
            </div>
            <div className=''>
              <Label className='font-bold' htmlFor='email'>Email</Label>
              <TextInput id="email" type="text" placeholder="Email" required />
            </div>
            <div className=''>
              <Label className='font-bold' htmlFor='password'>Password</Label>
              <TextInput id="password" type="text" placeholder="Password" required />
            </div>
            <Button className='bg-gradient-to-r from-indigo-500 to-blue-500 ' type='submit' > Sign up </Button>
          </form>
          {/*  */}
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp