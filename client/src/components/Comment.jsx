import React, { useEffect, useState } from "react";
import moment from 'moment';

const Comment = ({ comment }) => {
  // console.log("cmt", comment);
  const [user, setUser] = useState({});
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
    <div>
      <div className="">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 bg-gray-200 rounded-full"
        />
      </div>
      <div>
        <div>
            <span className="">
                {user? `@${user.username}` : `anonymous user`}
            </span>
            <span className="text-gray-500">{moment(comment.createAt).fromNow()}</span>
        </div>
        <p className="">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
