import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  
  const handleShowMore = async () => {

    const user = Math.floor(users.length / 9);
    // const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?userId=${currentUser._id}&user=${user}&limit=9`
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]); // ?
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/user/delete/${userIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className='p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && users.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <TableHead>
            <TableHeadCell>Date created</TableHeadCell>
            <TableHeadCell>User image</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Admin</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
          </TableHead>
          {users.map((user) => (
            <TableBody className='divide-y' key={user._id}>
              <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className='object-cover w-10 h-10 bg-gray-500 rounded-full'
                  />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <FaCheck className='text-green-500' />
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </TableCell>
                <TableCell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}
                    className='font-medium text-red-500 cursor-pointer hover:underline'
                  >
                    Delete
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        {showMore && (
          <button
            onClick={handleShowMore}
            className='self-center w-full text-sm text-teal-500 py-7'
          >
            Show more
          </button>
        )}
      </>
    ) : (
      <p>You have no users yet!</p>
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
            Are you sure you want to delete this user?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteUser}>
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
);
};

export default DashUsers;
