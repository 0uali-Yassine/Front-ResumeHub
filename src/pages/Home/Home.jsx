/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ResumeCard from "../../components/ResumeCard";
import AddEditResume from "./AddEditResume";
import { IoMdAdd } from "react-icons/io";
// import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
    const [showAddEditModel, setShowAddEditModel] = useState({
        isShow: false,
        type: 'add', // or 'edit'
        resumeData: null
    });
    const [resumes, setResumes] = useState([]);
    const [userInfo, setUserInfo] = useState({ id: "", role: "" });
    const [hasResume, setHasResume] = useState(false);
    const [loading, setLoading] = useState(false);


    // for get the role of user
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                // Fetch all resumes
                const resumeRes = await axiosInstance.get("/get-all-resumes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResumes(resumeRes?.data?.resumes);

                // Fetch current user info
                const userRes = await axiosInstance.get("/get-user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const user = userRes.data.user;
                setUserInfo({
                    id: user._id,
                    role: user.role,
                });

                const userHasResume = resumeRes.data.resumes.some(
                    (resume) => resume.userId === user._id
                );

                setHasResume(userHasResume);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);



    // const navigate = useNavigate();
    // //   protect routes in frontend "BUT" must be in backend
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/login");
    //     } else {
    //         navigate("/dashboard");
    //     }
    // }, []);

    const handleClose = () => {
        setShowAddEditModel({
            isShow: false,
            type: 'add',
            resumeData: null
        });
    };

    const handleShow = (type, resumeData = null) => {
        setShowAddEditModel({
            isShow: true,
            type,
            resumeData
        });
    };


    const handleDelete = async (resumeId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.delete(`/delete-resume/${resumeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response?.data?.error) {
                console.error("Failed to delete resume:", response?.data?.message);
            } else {
                toast.success("Resume deleted successfully")
                // Update the state to remove the deleted resume
                console.log("Resume deleted successfully:", response?.data?.message);
                console.log(resumes.filter((resume) => resume._id !== resumeId))

                setResumes(resumes.filter((resume) => resume._id !== resumeId));
                setHasResume(false);
            }
        } catch (err) {
            console.error("Error deleting resume:", err);
        }
    };





    return (
        <>
         <Navbar />
         <ToastContainer />
        <section
            className="py-5 px-3"
            style={{
                background: "linear-gradient(135deg, #f1f2f6, #dfe4ea)",
                minHeight: "100vh",
                animation: "fadeIn 0.7s ease-in-out",
            }}
        >
            <div className="container text-center">
                <h1 className="display-5 fw-bold mb-2" style={{ color: "#6c5ce7" }}>
                    Talent Profiles
                </h1>
                <p className="text-muted lead mb-4">
                    Browse qualified candidates and discover the right fit for your team.
                </p>
            </div>

            <div className="container">
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border" style={{color:'#6c5ce7'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="text-center my-5">
                        <h4 className="text-secondary">No resumes available</h4>
                    </div>
                ) : (
                    <div className="row mt-4 g-4">
                        {resumes.map((resume) => (
                            <div
                                key={resume._id.$oid || resume._id}
                                className="col-12 col-sm-6 col-md-4"
                            >
                                <ResumeCard
                                    name={resume.fullName}
                                    img={resume.img}
                                    description={resume.description}
                                    experience={resume.experience}
                                    education={resume.education}
                                    skills={resume.skills}
                                    date={resume.date}
                                    highlighted={resume.userId === userInfo.id}
                                    currentUserId={userInfo.id}
                                    resumeUserId={resume.userId}
                                    role={userInfo.role}
                                    onEdit={() => handleShow("edit", resume)}
                                    onDelete={() => handleDelete(resume._id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Resume Button */}
            {userInfo.role === "employer" && (
                <button
                    className="btn btn-lg  rounded-circle shadow-lg position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px",backgroundColor: "#6c5ce7", color: "white" }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5a4fcf")}
                    onClick={() => handleShow("add")}
                    disabled={hasResume}
                    title={hasResume ? "You already have a resume." : "Add a new resume"}
                >
                    <IoMdAdd className="fs-3" />
                </button>
            )}

            {/* Modal */}
            {showAddEditModel.isShow && (
                <div
                    className={`modal-overlay ${showAddEditModel.isShow ? "show" : ""}`}
                    onClick={handleClose}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-btn" onClick={handleClose}>
                            &times;
                        </button>
                        <AddEditResume
                            type={showAddEditModel.type}
                            resumeData={showAddEditModel?.resumeData}
                        />
                    </div>
                </div>
            )}

            <style jsx="true">{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1050;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .modal-content {
          background-color: #fff;
          padding: 2rem;
          border-radius: 1rem;
          max-width: 600px;
          width: 100%;
          position: relative;
          animation: fadeIn 0.4s ease;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1.2rem;
          font-size: 1.5rem;
          background: none;
          border: none;
          color: #aaa;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: #333;
          cursor: pointer;
        }
      `}</style>
        </section>
        </>

    );
};

export default Home;
