import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setError(false);
          setPost(data.posts[0]);
        }
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <main className="flex flex-col max-w-6xl min-h-screen p-3 mx-auto">
      <h1 className="max-w-2xl p-3 mx-auto mt-10 font-serif text-3xl text-center lg:text-4xl">
        {" "}
        {post && post.title}{" "}
      </h1>

      <Link
        className="self-center mt-5"
        to={`/search?category=${post && post.category}`}
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>

      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between w-full max-w-2xl p-3 mx-auto text-xs border-b border-slate-500">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} min read
        </span>
      </div>

      <div
        className="w-full max-w-2xl p-3 mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className="w-full max-w-4xl mx-auto">
        <CallToAction />
      </div>

      <CommentSection postId={post._id} />

      <div className='flex flex-col items-center justify-center mb-5'>
        <h1 className='mt-5 text-xl'>Recent articles</h1>
        <div className='flex flex-wrap justify-center gap-5 mt-5'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
