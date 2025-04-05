/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import axiosInstance  from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/Toast";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(localStorage.getItem("userId"));
  const [isSearch, setIsSearch] = useState(false);
  const [openAddEditModal, setOpenAddEditModal]= useState({
    isShown : false,
    type: "add",
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    })
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    })
  }

  // const getAllNotes = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/notes/getNotes?user=${user}`);    
  //     console.log(response.data.notes); 
       
  //     setNotes(response.data.notes);
  //     console.log(notes)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllNotes();
  // }, [])

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get(`/notes/getNotes?user=${user}`);
      setNotes([...response.data.notes]);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/notes/deleteNote/${noteId}`, {
        data: { user }
    } )
        showToastMessage(response.data.message, 'delete');
        getAllNotes();
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  }

  // Search Notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get('/notes/searchNotes', {
        params: { query, user },
      });
        setNotes(response.data.notes);
        setIsSearch(true);
    }catch (error) {
      console.log(error);
    }
  }  

  // Clear Search Notes
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  // Update Pinned Notes

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/notes/updatePinnedNote/${noteId}` ,{
        "isPinned": !noteData.isPinned,
        user
      })
        showToastMessage(response.data.message);
        getAllNotes();
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  }


  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <section>
      <Navbar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className="container mx-auto p-[2rem]">
      {notes.length === 0 ? (

        <p className="text-center text-xl">
          No notes found. Add some notes by clicking on the plus icon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={moment(note.createdOn).format("DD MM YYYY")}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => handleEdit(note)}
              onDelete={() => deleteNote(note)}
              onPinNote={() => updateIsPinned(note)}
            />
          ))}
        </div>
      )}
    </div>

      <button className=" w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          })
        }} 
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>{}}
        style = {{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
      <AddEditNotes 
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        getAllNotes = {getAllNotes}
        onClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null,
          })
        }}
        showToastMessage={showToastMessage}
      />
      </Modal>

      <Toast 
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}  
      
      />
    </section>
  )
}

export default Home