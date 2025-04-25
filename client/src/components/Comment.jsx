import React, { useEffect, useState } from "react";
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';import { useSelector } from "react-redux";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {

  // console.log("cmt", comment);
  const [user, setUser] = useState({});
  const { currentUser }  = useSelector((state) => state.user);
  
  // console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 text-sm border-b dark:border-gray-600">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 bg-gray-200 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className='flex items-center mb-1'>
            <span className="mr-1 text-xs font-bold truncate">
                {user? `@${user.username}` : `anonymous user`}
            </span>
            <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="pb-2 text-gray-500">{comment.content}</p>
        <div className="flex items-center gap-2 pt-2 text-xs border-t dark:border-gray-700 max-w-fit">
            <button 
                type="button"
                className={`text-gray-400 hover:text-blue-500 ${
                    currentUser &&
                    comment.likes.includes(currentUser._id) &&
                    '!text-blue-500'
                }`}
                onClick={() => {onLike(comment._id)}} 
            >
                <FaThumbsUp className='text-sm'/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
