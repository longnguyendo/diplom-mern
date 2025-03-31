import React from 'react'
import { Avatar, Button, NavbarToggle, Navbar, TextInput, NavbarCollapse, NavbarLink } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
// import {}

const Header = () => {
  const path = useLocation().pathname;


  return (
    <Navbar className='border-b-2' fluid rounded> 
      <Link to='/' className='self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white'>
        <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500'>Diplom</span>
        Blog
      </Link> 
      <form>
        <TextInput 
          type='text'
          placeholder='search'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline '
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='hidden w-12 h-10 sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800 ' pill>
            Sign In
          </Button>
        </Link>
        <NavbarToggle/>
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active={path==='/'} as={'div'}> Home </NavbarLink>
        <NavbarLink href="/about" active={path==='/about'} as={'div'}> About </NavbarLink>
        <NavbarLink href="/projects"active={path==='/projects'} as={'div'}> Projects </NavbarLink>
      </NavbarCollapse>
      
    </Navbar>
  )
}

export default Header