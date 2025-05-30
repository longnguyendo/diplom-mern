import {
    getStorage,
    uploadBytes,
    uploadBytesResumable,
  } from "firebase/storage";
  import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
  import React, { useEffect, useState } from "react";
  import ReactQuill from "react-quill-new";
  import "react-quill-new/dist/quill.snow.css";
  import { app } from "../firebase";
  import { useNavigate, useParams } from "react-router-dom";
  import { CircularProgressbar } from "react-circular-progressbar";
  import { useSelector } from 'react-redux';
  import "react-circular-progressbar/dist/styles.css";
  
  const UpdatePost = () => {

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    console.log(imageUploadProgress);
    
    const {postId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(()=> {
      try {
        const fetchPost = async () => {
          const res = await fetch(`/api/post/getposts?postId=${postId}`);
          const data = await res.json();
          console.log("data", data);
          if (!res.ok) {
            console.log(data.message);
            setPublishError(data.message);
            return;
          }
          if (res.ok) {
            setPublishError(null);
            setFormData(data.posts[0]);
          }
        };
  
        fetchPost();
      } catch (error) {
      console.log(error.message);
      }
    }, [postId])
  
    const handleUploadImage = async () => {

      try {
        if (!file) {
          setImageUploadError("Please select an image");
          return;
        }
        setImageUploadError(null);
        setImageUploadProgress(0);
    
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        formDataUpload.append("upload_preset", "diplom-mern-blog"); // Replace with actual preset
    
        const res = await fetch("https://api.cloudinary.com/v1_1/dmhnaimnl/image/upload", {
          method: "POST",
          body: formDataUpload,
        });
    
        const data = await res.json();
        // console.log(data);
        if (data.secure_url) {
          setFormData((prev) => ({ ...prev, image: data.secure_url }));
          setImageUploadProgress(null);
          setImageUploadError(null);
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error(error);
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
            setPublishError(data.message);
            return;
        }
  
        if (res.ok) {
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }
      } catch (error) {
        setPublishError("Something went wrong");
      }
    };
  
    return (
      <div className="max-w-3xl min-h-screen p-3 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Create a post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">Javascript</option>
              <option value="reactjs">ReactJs</option>
              <option value="nextjs">NextJs</option>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4 p-3 border-4 border-teal-500 border-dotted">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}

            />
            <Button type="button" size="sm" outline onClick={handleUploadImage}>
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload image"
              )}
            </Button>
          </div>
          
          {imageUploadError && <Alert color="failure"> {imageUploadError}</Alert>}

          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="object-cover w-full h-72"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="mb-12 h-72"
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            value={formData.content}
          />
          <Button type="submit">Update Post</Button>
  
          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    );
  };
  
  export default UpdatePost;
  