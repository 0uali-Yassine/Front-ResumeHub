/* eslint-disable no-unused-vars */
import Navbar from "../../components/Navbar";
import ResumeCard from "../../components/ResumeCard";
import AddEditResume from "./AddEditResume";

const Home = () => {

    return (
        <section>
            <Navbar />
            <div className="container mx-auto p-[2rem]">
                <h1 className="text-4xl text-slate-900 font-semibold">Your Thoughts</h1>
                <p className="text-slate-500 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            </div>
            <div className="container py-4">
                <p className="text-center fs-4">
                    No Resume found. Add some resumes by clicking on the plus icon.
                </p>

                <div className="row mt-4 g-4">
                    <div className="col-12 col-sm-6 col-md-4">
                        <ResumeCard />
                    </div>
                </div>
            </div>



            <button className=" w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10">
            szdz
            </button>


            <AddEditResume />


        </section>
    )
}

export default Home