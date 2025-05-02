import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API}/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API}/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API}/api/comment/getcomments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex flex-wrap justify-center gap-4'>
        <div className='flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-800 md:w-72'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 uppercase text-md'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='p-3 text-5xl text-white bg-teal-600 rounded-full shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex items-center text-green-500'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-800 md:w-72'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 uppercase text-md'>
                Total Comments
              </h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='p-3 text-5xl text-white bg-indigo-600 rounded-full shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex items-center text-green-500'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-800 md:w-72'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 uppercase text-md'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='p-3 text-5xl text-white rounded-full shadow-lg bg-lime-600' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex items-center text-green-500'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap justify-center gap-4 py-3 mx-auto'>
        <div className='flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='p-2 text-center'>Recent users</h1>
            <Button outline>
              <Link to={'/dashboard?tab=users'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
            </TableHead>
            {users &&
              users.map((user) => (
                <TableBody key={user._id} className='divide-y'>
                  <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 bg-gray-500 rounded-full'
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='p-2 text-center'>Recent comments</h1>
            <Button outline >
              <Link to={'/dashboard?tab=comments'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Comment content</TableHeadCell>
              <TableHeadCell>Likes</TableHeadCell>
            </TableHead>
            {comments &&
              comments.map((comment) => (
                <TableBody key={comment._id} className='divide-y'>
                  <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell className='w-96'>
                        <p className='line-clamp-2'>{comment.content}</p>
                    </TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='p-2 text-center'>Recent posts</h1>
            <Button outline >
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Post image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
            </TableHead>
            {posts &&
              posts.map((post) => (
                <TableBody key={post._id} className='divide-y'>
                  <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <TableCell>
                      <img
                        src={post.image}
                        alt='user'
                        className='h-10 bg-gray-500 rounded-md w-14'
                      />
                    </TableCell>
                    <TableCell className='w-96'>{post.title}</TableCell>
                    <TableCell className='w-5'>{post.category}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}