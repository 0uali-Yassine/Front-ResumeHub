import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AddEditResume = ({resumeData,type }) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  // error state
  const [error, setError] = useState('');
 

  // Handle adding/editing experience, education, and skills
  const handleExperienceChange = (index, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = value;
    setExperience(updatedExperience);
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...education];
    updatedEducation[index] = value;
    setEducation(updatedEducation);
  };

  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addItem = (arraySetter, value) => {
    arraySetter(prevArray => [...prevArray, value]);
  };

  // Handle file input for image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  // add resume data logic and API call
  const addResumeData = async() => {
    try {
      const response = await axiosInstance.post("/add-resume", {
        fullName: name,
        img,
        date,
        description,
        experience,
        education,
        skills
      });
  
      if (!response?.data?.error) {
        alert("Resume added successfully!");
        window.location.reload(); // OR trigger fetch from parent
      } else {
        setError(response?.data?.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "something  wrong");
    }  
  }
  
  // edit resume data logic and API call
  const editeResumeData = () => {}

  // Handle form
  const  handleAddEditResume = () => {
    if (!name || !date || !description || !experience.length || !education.length || !skills.length) {
      setError("Please fill in all fields and add at least one experience, education, and skill.");
      return;
    }
    setError('');
    // const resumeData = {
    //   name,
    //   img,
    //   date,
    //   description,
    //   experience,
    //   education,
    //   skills,
    // };
    // console.log('Resume Data:', resumeData);
    // Add your logic to save the resume data here (e.g., API call)

    if(type === 'edit') {
      editeResumeData()
    }
    else {
      addResumeData()
    }

  }

  return (
    <div className="position-relative p-3 rounded shadow-sm bg-white w-full mx-auto" style={{width: '100%'}}>
      <h4 className="text-center mb-4">{'Add Resume'}</h4>

      <div className="d-flex flex-column gap-2">
        {/* Name */}
        <div className="mb-2">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Image */}
        <div className="mb-2">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control form-control-sm"
            accept="image/*"
            onChange={handleImageChange}
          />
          {img && <img src={img} alt="Profile" className="mt-2 rounded-circle" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />}
        </div>

        {/* Date */}
        <div className="mb-2">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

        </div>

        {/* Description */}
        <div className="mb-2">
          <label className="form-label">Description</label>
          <textarea
            className="form-control form-control-sm"
            rows={3}
            placeholder="Describe your resume"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Experience */}
        <div className="mb-2">
          <label className="form-label">Experience</label>
          {experience.map((exp, index) => (
            <div key={index} className="d-flex justify-content-between mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Experience"
                value={exp}
                onChange={(e) => handleExperienceChange(index, e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => setExperience(experience.filter((_, i) => i !== index))}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => addItem(setExperience, '')}
          >
            Add Experience
          </button>
        </div>

        {/* Education */}
        <div className="mb-2">
          <label className="form-label">Education</label>
          {education.map((edu, index) => (
            <div key={index} className="d-flex justify-content-between mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Education"
                value={edu}
                onChange={(e) => handleEducationChange(index, e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => setEducation(education.filter((_, i) => i !== index))}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => addItem(setEducation, '')}
          >
            Add Education
          </button>
        </div>

        {/* Skills */}
        <div className="mb-2">
          <label className="form-label">Skills</label>
          {skills.map((skill, index) => (
            <div key={index} className="d-flex justify-content-between mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleSkillsChange(index, e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => setSkills(skills.filter((_, i) => i !== index))}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => addItem(setSkills, '')}
          >
            Add Skill
          </button>
        </div>
        {/* Error Message */}
        {error && <div className="text-danger border border-danger boder-1 p-2 rounded-2 bg-danger-subtle">{error}</div>}

        {/* Submit Button */}
        <div className="text-center mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddEditResume}
          >
            Add Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditResume;
