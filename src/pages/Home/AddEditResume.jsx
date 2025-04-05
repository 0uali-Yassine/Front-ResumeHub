// import React from 'react'

// function AddEditResume() {
//   return (
//     <div>AddEditResume</div>
//   )
// }

// export default AddEditResume
/* eslint-disable no-unused-vars */
import { useState } from "react"
import TagInput from "../../components/TagInput"
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const AddEditResume = ({noteData, onClose, type, getAllNotes, showToastMessage}) => {

  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [title, setTitle] = useState( noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState( noteData?.tags || []);

  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/notes/createNote",{
        title,
        content,
        tags,
        user: user,
      })

      if(response.data && response.data.note){
        showToastMessage(response.data.message);
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  }

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/notes/editNote/" + noteId ,{
        title,
        content,
        tags,
        user
      })

      if(response.data && response.data.note){
        showToastMessage(response.data.message);
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title")
      return;
    }
    if (!content) {
      setError("Please enter a description")
      return;
    }

    setError("");

    if (type === 'edit'){
      editNote()
    }else {
      addNewNote()
    }
  }
  return (
    <div className="relative">
      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
        <MdClose className="text-xl text-slate-400"/>
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input 
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Description</label>
        <textarea 
          type="text"            
          className=" text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="This is my weekly workout routine."
          rows={8}
          value={content}
          onChange={({target}) => setContent(target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  )
}

export default AddEditResume