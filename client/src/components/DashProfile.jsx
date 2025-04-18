import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, uploadBytes, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if(imageFile) {
        uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {

    setImageFileUploading(true); 
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred  / snapshot.totalBytes) * 100; 
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (file must be less then 2MB', error);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        })  
      }
    )
  }
  console.log(imageFile, imageFileUrl);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('no changes made');
      return;
    }
    if (imageFileUploading) {
      return ;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }
      else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('User profile updated successfully');
      }
    } catch ( err ) {
      dispatch(updateFailure(err.message));
    }
  }

  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 upp">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="self-center w-32 h-32 rounded-full shadow-md cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username} onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email} onChange={handleChange}
        />
        <TextInput type="password" id="password" placeholder="password" onChange={handleChange} />
        <Button type="submit" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color ='success' className="mt-5">
          {updateUserSuccess}
          
        </Alert>
      )}
      {updateUserError && (
        <Alert color ='failure' className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
