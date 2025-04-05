import React from 'react'
const AddEditResume = () => {

 
  return (
    <div className="relative">
      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={onClose}>
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input 
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value=""
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Description</label>
        <textarea 
          type="text"            
          className=" text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="This is my weekly workout routine."
          rows={8}
          value=""
        />
      </div>
      <div className="mt-3">
        <label className="input-label">Tags</label>
      </div>

     
      <button className="btn-primary font-medium mt-5 p-3">
        {"test" === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  )
}

export default AddEditResume