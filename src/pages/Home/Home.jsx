/* eslint-disable no-unused-vars */
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ResumeCard from "../../components/ResumeCard";
import AddEditResume from "./AddEditResume";
import { IoMdAdd } from "react-icons/io";

const Home = () => {
    const [showAddEditModel, setShowAddEditModel] = useState({
        isShow: false,
        type: 'add', // or 'edit'
        data: null
    });

    const handleClose = () => {
        setShowAddEditModel({
            isShow: false,
            type: 'add',
            data: null
        });
    };

    const handleShow = (type, data = null) => {
        setShowAddEditModel({
            isShow: true,
            type,
            data
        });
    };

    return (
        <section>
            <Navbar />
            <div className="container mx-auto p-[2rem]">
                <h1 className="text-4xl text-slate-900 font-semibold">Your Thoughts</h1>
                <p className="text-slate-500 mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                </p>
            </div>
            <div className="container py-4">
                <p className="text-center fs-4">
                    No Resume found. Add some resumes by clicking on the plus icon.
                </p>

                <div className="row mt-4 g-4">
                    {/* Repeat ResumeCard for each item */}
                    <div className="col-12 col-sm-6 col-md-4">
                        <ResumeCard
                            name={'John Doe'}
                            img={'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            description={'Passionate full-stack developer with 5+ years of experience in building scalable web applications.'}
                            experience={["Frontend Developer at TechCorp (2020 - 2022)", "Software Engineer at DevSolutions (2018 - 2020)"]}
                            education={["B.Sc. in Computer Science - University of XYZ (2014 - 2018)", "High School Diploma - ABC High School (2010 - 2014)"]}
                            skills={["JavaScript", "React", "Node.js", "MongoDB", "Express", "Git"]}
                            date={'12-54-29'}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <ResumeCard
                            name={'John Doe'}
                            img={'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            description={'Passionate full-stack developer with 5+ years of experience in building scalable web applications.'}
                            experience={["Frontend Developer at TechCorp (2020 - 2022)", "Software Engineer at DevSolutions (2018 - 2020)"]}
                            education={["B.Sc. in Computer Science - University of XYZ (2014 - 2018)", "High School Diploma - ABC High School (2010 - 2014)"]}
                            skills={["JavaScript", "React", "Node.js", "MongoDB", "Express", "Git"]}
                            date={'12-54-29'}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <ResumeCard
                            name={'John Doe'}
                            img={'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            description={'Passionate full-stack developer with 5+ years of experience in building scalable web applications.'}
                            experience={["Frontend Developer at TechCorp (2020 - 2022)", "Software Engineer at DevSolutions (2018 - 2020)"]}
                            education={["B.Sc. in Computer Science - University of XYZ (2014 - 2018)", "High School Diploma - ABC High School (2010 - 2014)"]}
                            skills={["JavaScript", "React", "Node.js", "MongoDB", "Express", "Git"]}
                            date={'12-54-29'}
                        />
                    </div>

                    {/* Other ResumeCard Components */}
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
                            data={showAddEditModel.data}
                        />
                    </div>
                </div>
            )}

            
        </section>
    );
};

export default Home;
