/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ResumeCard from "../../components/ResumeCard";
import AddEditResume from "./AddEditResume";
import { IoMdAdd } from "react-icons/io";
// import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
    const [showAddEditModel, setShowAddEditModel] = useState({
        isShow: false,
        type: 'add', // or 'edit'
        resumeData: null
    });
    const [resumes, setResumes] = useState([]);
    const [userInfo, setUserInfo] = useState({ id: "", role: "" });
    const [hasResume, setHasResume] = useState(false);


    // for get the role of user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                // Fetch all resumes
                const resumeRes = await axiosInstance.get("/get-all-resumes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResumes(resumeRes.data.resumes);

                // Fetch current user info
                const userRes = await axiosInstance.get("/get-user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const user = userRes.data.user;
                setUserInfo({
                    id: user._id,
                    role: user.role,
                });
            } catch (err) {
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

    // get all resumes
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axiosInstance.get("/get-all-resumes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setResumes(res?.data?.resumes);
                setCurrentUserId(res?.data?.currentUserId); // save employer id
            } catch (err) {
                console.error("Failed to fetch resumes", err);
            }
        };

        fetchResumes();
    }, []);



    return (
        <section>
            <Navbar />
            <div className="container mx-auto p-[2rem]">
                <h1 className="text-4xl text-slate-900 text-center font-semibold">Your Thoughts</h1>
                <p className="text-slate-500 mt-2 text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                </p>
            </div>
            <div className="container py-4">
                <p className="text-center fs-4">
                    No Resume found. Add some resumes by clicking on the plus icon.
                </p>

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
                            />
                        </div>
                    ))}


                </div>

            </div>

            {/* Add Resume Button */}
            <button
                className="btn btn-primary rounded-1 position-fixed bottom-0 end-0 m-4 shadow"
                onClick={() => handleShow('add')}
            >
                <IoMdAdd className="fs-2" />
            </button>

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
                            resumeData={showAddEditModel.resumeData}
                        />
                    </div>
                </div>
            )}


        </section>
    );
};

export default Home;
