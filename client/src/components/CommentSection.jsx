import { Alert, Button, Modal, ModalBody, ModalHeader, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Comment from "./Comment";

const CommentSection = ({ postId }) => {

  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;
  // console.log("cmt section", comment);

  // submit comment
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (comment.length > 200) {
        return;
      }
      try {
        const res = await fetch(`${API}/api/comment/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: comment,
            postId,
            userId: currentUser._id,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setComment('');
          setCommentError(null);
          setComments([data, ...comments]);
        }
      } catch (error) {
        setCommentError(error.message);
      }
  };
  
  // effect to get comments from postId;
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          const comments = data;
          setComments(comments);
          console.log(comments);
          if (data.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleShowMore = async () => {
    
    const comment = Math.floor(comments.length / 5);
    const startIndex = comments.length;
    console.log(comment);
    try {
      const res = await fetch(
        `/api/comment/getPostComments/${postId}?comment=${comment}&limit=5`
      );
      const data = await res.json();
      const comments = data;
      if (res.ok) {
        setComment((prev) => [...prev, ...comments]);
        if (comments.length < 5) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
    
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments( comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // Click save and handle save of editing comment 
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  // Click delete then handle delete of comment
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
        {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-sm text-gray-500'>
          <p>Signed in as:</p>
          <img
            className='object-cover w-5 h-5 rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='flex gap-1 my-5 text-sm text-teal-500'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='p-3 border border-teal-500 rounded-md'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex items-center justify-between mt-5'>
            <p className='text-xs text-gray-500'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='red' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='my-5 text-sm'>No comments yet!</p>
      ) : (
        <>
          <div className='flex items-center gap-1 my-5 text-sm'>
            <p>Comments</p>
            <div className='px-2 py-1 border border-gray-400 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      {showMore && (
        <button
          onClick={handleShowMore}
          className="self-center w-full text-sm text-teal-500 py-7"
        >
          Show more
        </button>
        )}
       <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <ModalHeader />
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='red'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CommentSection