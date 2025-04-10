import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const AddEditResume = ({ resumeData, type }) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  // error state
  const [error, setError] = useState('');
  // const [imgFile, setImgFile] = useState(null); // store actual File


  useEffect(() => {
    if (type === 'edit' && resumeData) {
      setName(resumeData.fullName);
      setImg(resumeData.img);
      setDate(resumeData.date);
      setDescription(resumeData.description);
      setExperience(resumeData.experience || []);
      setEducation(resumeData.education || []);
      setSkills(resumeData.skills || []);
    }
  }, [type, resumeData]);


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
    console.log({ img });
  };
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImgFile(file); // 👈 store the file
  //     setImg(URL.createObjectURL(file)); // for preview
  //   }
  // };


  // add resume data logic and API call
  const addResumeData = async () => {
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
        toast.success("Resume added successfully!");
        window.location.reload(); // OR trigger fetch from parent
      } else {
        setError(response?.data?.message);
      }
    } catch (err) {
      setError(err.response?.data?.message);
    }
  }
  // const addResumeData = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('fullName', name);
  //     formData.append('date', date);
  //     formData.append('description', description);
  //     formData.append('image', imgFile); // 👈 must match multer field name
  //     formData.append('experience', JSON.stringify(experience));
  //     formData.append('education', JSON.stringify(education));
  //     formData.append('skills', JSON.stringify(skills));

  //     const response = await axiosInstance.post('/add-resume', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (!response?.data?.error) {
  //       alert('Resume added successfully!');
  //       window.location.reload();
  //     } else {
  //       setError(response?.data?.message);
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Something went wrong.');
  //   }
  // };


  // edit resume data logic and API call
  const editeResumeData = async () => {
    try {
      const response = await axiosInstance.put(`/edit-resume/${resumeData._id}`, {
        fullName: name,
        img,
        date,
        description,
        experience,
        education,
        skills
      });

      if (!response?.data?.error) {
        toast.success("Resume updated successfully!");
        window.location.reload(); // OR trigger fetch from parent
      } else {
        setError(response?.data?.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  }

  // const editeResumeData = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('fullName', name);
  //     formData.append('date', date);
  //     formData.append('description', description);
  //     formData.append('im', imgFile); // 👈 updated image if selected
  //     formData.append('experience', JSON.stringify(experience));
  //     formData.append('education', JSON.stringify(education));
  //     formData.append('skills', JSON.stringify(skills));

  //     const response = await axiosInstance.put(`/edit-resume/${resumeData._id}`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (!response?.data?.error) {
  //       alert('Resume updated successfully!');
  //       window.location.reload();
  //     } else {
  //       setError(response?.data?.message);
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Something went wrong.');
  //   }
  // };


  // Handle form
  const handleAddEditResume = () => {
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

    if (type === 'edit') {
      editeResumeData()
    }
    else {
      addResumeData()
    }

  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        // background: "linear-gradient(135deg, #6c5ce7 0%, #6c5ce7 100%)",
        animation: "fadeSlideIn 1s ease forwards",
        width: "100%",
      }}
    >
      <div
        className="bg-white p-5 rounded-4 shadow-lg mx-3 w-100"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <h2 className="fw-bold mb-4 text-center" style={{ color: "#6c5ce7" }}>
          💼 {type === "edit" ? "Update Your Profile" : "Create Your Profile"}
        </h2>

        <form className="row g-4">
          {/* Name */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              <i className="bi bi-person-fill me-2"></i>Full Name
            </label>
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Image */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              <i className="bi bi-image-fill me-2"></i>Upload Image
            </label>
            <input
              type="file"
              className="form-control rounded-pill px-4 py-2"
              accept="image/*"
              onChange={handleImageChange}
            />
            {img && (
              <img
                src={img}
                alt="Profile"
                className="mt-3 rounded-circle border"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            )}
          </div>

          {/* Date */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">
              <i className="bi bi-calendar-date-fill me-2"></i>Date
            </label>
            <input
              type="date"
              className="form-control rounded-pill px-4 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              <i className="bi bi-file-earmark-text-fill me-2"></i>Description
            </label>
            <textarea
              className="form-control rounded-4 px-4 py-2"
              rows={3}
              placeholder="Describe your resume"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              <i className="bi bi-briefcase-fill me-2"></i>Experience
            </label>
            {experience.map((exp, index) => (
              <div key={index} className="d-flex align-items-center gap-2 mb-2">
                <input
                  type="text"
                  className="form-control rounded-pill px-4 py-2"
                  placeholder="Experience"
                  value={exp}
                  onChange={(e) => handleExperienceChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => setExperience(experience.filter((_, i) => i !== index))}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </div>
            ))}
            <button
              type="button"
              style={{ backgroundColor: "#6c5ce7", color: "white" }}
              className="btn  btn-sm rounded-pill"
              onClick={() => addItem(setExperience, '')}
            >
              ➕ Add Experience
            </button>
          </div>

          {/* Education */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              <i className="bi bi-book-fill me-2"></i>Education
            </label>
            {education.map((edu, index) => (
              <div key={index} className="d-flex align-items-center gap-2 mb-2">
                <input
                  type="text"
                  className="form-control rounded-pill px-4 py-2"
                  placeholder="Education"
                  value={edu}
                  onChange={(e) => handleEducationChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => setEducation(education.filter((_, i) => i !== index))}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </div>
            ))}
            <button
              type="button"
              style={{ backgroundColor: "#6c5ce7", color: "white" }}
              className="btn btn-sm rounded-pill"
              onClick={() => addItem(setEducation, '')}
            >
              ➕ Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="col-12">
            <label className="form-label fw-semibold">
              <i className="bi bi-stars me-2"></i>Skills
            </label>
            {skills.map((skill, index) => (
              <div key={index} className="d-flex align-items-center gap-2 mb-2">
                <input
                  type="text"
                  className="form-control rounded-pill px-4 py-2"
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleSkillsChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </div>
            ))}
            <button
              type="button"
              style={{ backgroundColor: "#6c5ce7", color: "white" }}
              className="btn btn-sm rounded-pill"
              onClick={() => addItem(setSkills, '')}
            >
              ➕ Add Skill
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mt-2" role="alert">
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-primary btn-lg w-100 rounded-pill shadow"
              style={{
                backgroundColor: "#6c5ce7",
                borderColor: "#6c5ce7",
                boxShadow: "0 4px 15px rgba(0, 188, 212, 0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onClick={handleAddEditResume}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0, 188, 212, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(0, 188, 212, 0.3)";
              }}
            >
              {type === "edit" ? "Update Resume" : "Add Resume"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
    @keyframes fadeSlideIn {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
    </div>

  );
};

export default AddEditResume;
