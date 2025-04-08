/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ResumeCard from "../../components/ResumeCard";
import AddEditResume from "./AddEditResume";
import { IoMdAdd } from "react-icons/io";
// import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer } from "react-toastify";

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
                toast.success("Resume deleted successfully", {
                    position: "top-right"});
                // Update the state to remove the deleted resume
                setHasResume(false);
                setResumes(resumes.filter((resume) => resume._id !== resumeId));
            }
        } catch (err) {
            console.error("Error deleting resume:", err);
        }
    };





    return (
    
        <section>
            <Navbar />
            <ToastContainer />
            <div className="container mx-auto mt-5 p-[2rem]">
                <h1 className="text-4xl text-slate-900 text-center font-semibold">Talent Profiles</h1>
                <p className="text-slate-500 mt-2 text-center">
                    Browse qualified candidates and discover the right fit for your team.
                </p>
            </div>
            <div className="container py-4">
                {
                    loading ? (
                        <div className="text-center mt-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : resumes.length === 0 ? (
                        <div className="text-center mt-5">
                            <h2 className="text-gray-500">No resumes available</h2>
                        </div>
                    ) : null
                }

                <div className="row mt-4 g-4">
                    {resumes.map((resume) => (
                        <div key={resume._id.$oid || resume._id} className="col-12 col-sm-6 col-md-4">
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
                                onEdit={() => handleShow('edit', resume)}
                                onDelete={() => handleDelete(resume._id)}
                            />
                        </div>
                    ))}


                </div>

            </div>

            {/* Add Resume Button */}
            {userInfo.role === "employer" && (
                <button
                    className="btn btn-primary rounded-1 position-fixed bottom-0 end-0 m-4 shadow"
                    onClick={() => handleShow('add')}
                    disabled={hasResume}
                    title={hasResume ? "You already have a resume." : "Add a new resume"}
                >
                    <IoMdAdd className="fs-2" />
                </button>
            )}

            {/* Modal */}
            {showAddEditModel.isShow && (
                <div
                    className={`modal-overlay ${showAddEditModel.isShow ? 'show' : ''}`}
                    onClick={handleClose}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <button className="close-btn" onClick={handleClose}>
                            ×
                        </button>
                        <AddEditResume
                            type={showAddEditModel.type}
                            resumeData={showAddEditModel?.resumeData}
                        />
                    </div>
                </div>
            )}


        </section>
    );
};

export default Home;
