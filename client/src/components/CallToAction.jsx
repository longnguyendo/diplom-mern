import React from 'react'
import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center justify-center p-3 text-center border border-teal-500 rounded-tl-3xl rounded-br-3xl sm:flex-row'>
    <div className='flex flex-col justify-center flex-1'>
      <h2 className='text-2xl'>
       Do you want to come my github to see my project or some basic function i wrote.
      </h2>
      <p className='my-2 text-gray-500'>
        Check my github to see my project and basic functions in js
      </p>
      <a
        href='https://github.com/longnguyendo'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button
          className='w-full rounded-bl-none rounded-tl-xl rounded-br-xl'
        >
          Check my github bio
        </Button>
      </a>
    </div>
    <div className='flex-1 p-7'>
      <img src='https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?' />
    </div>
  </div>
  )
}

export default CallToAction