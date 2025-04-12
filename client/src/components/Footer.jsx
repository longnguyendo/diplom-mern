import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full mx-auto max-w-7xl'>
        <div className='grid justify-between w-full sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white'
            >
              <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                Diplom
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <FooterTitle title='About' />
              <FooterLinkGroup col>
                <FooterLink
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                   JS Projects
                </FooterLink>
                <FooterLink
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                   Blog Diplom
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Follow us' />
              <FooterLinkGroup col>
                <FooterLink
                  href='https://www.github.com/sahandghavidel'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </FooterLink>
                <FooterLink href='#'>Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Legal' />
              <FooterLinkGroup col>
                <FooterLink href='#'>Privacy Policy</FooterLink>
                <FooterLink href='#'>Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FooterCopyright
            href='#'
            by="Diplom blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
            <FooterIcon href='#' icon={BsFacebook}/>
            <FooterIcon href='#' icon={BsInstagram}/>
            <FooterIcon href='#' icon={BsTwitter}/>
            <FooterIcon href='https://github.com/sahandghavidel' icon={BsGithub}/>
            <FooterIcon href='#' icon={BsDribbble}/>

          </div>
        </div>
      </div>
    </Footer>
  );
}