import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const CreatePost = () => {

  const [value, setValue] = useState('');
  const onChange = (e) => {
    console.log(e);
  }

  return (
    <div className='max-w-3xl min-h-screen p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col justify-between gap-4 sm:flex-row'> 
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">Reactjs</option>
            <option value="reactjs">Reactjs</option>
          </Select>
        </div>
        <div className='flex items-center justify-between gap-4 p-3 border-4 border-teal-500 border-dotted'>
          <FileInput type='file' accept='image/*' />
          <Button type='button' size='sm' outline>Upload image</Button>
        </div>
        <ReactQuill theme="snow" value={value} placeholder='write something ...' className='mb-12 h-72'/>
        <Button type='submit' >Publish</Button>
      </form>
      
    </div>
  )
}

export default CreatePost