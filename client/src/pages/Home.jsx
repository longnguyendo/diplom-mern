import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${API}/api/post/getPosts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col max-w-6xl gap-6 p-10 px-3 mx-auto '>
        <h1 className='pt-10 text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-justify text-gray-500 text-2xs sm:text-4sm'>
        I am so excited to have you here. Whenever you click a link from one of my social media accounts, you’ll land on this very site — a personal space where I share the story of my life, my journey, my thoughts, and everything that makes me who I am.
        This blog is a reflection of my experiences, my milestones, my dreams, and even the small everyday moments that shape me. I created this platform not just to document my life, but to proudly showcase my growth, my passions, and my perspective on the world.
        </p>
        <h1 className='pt-10 text-2xl font-bold lg:text-4xl'>Read and enjoy my blog</h1>
        <Link
          to='/search'
          className='text-xs font-bold text-teal-500 sm:text-sm hover:underline'
        >
          View all posts
        </Link>
        <div className='p-3 bg-amber-100 dark:bg-slate-700'>
          <CallToAction />
        </div>
      </div>

      <div className='flex flex-col max-w-6xl gap-8 p-3 py-3 mx-auto'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-3'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-center text-teal-500 hover:underline'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}