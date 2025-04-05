/* eslint-disable no-unused-vars */
import Navbar from "../../components/Navbar";
import AddEditResume from "./AddEditResume";

const Home = () => {

    return (
        <section>
            <Navbar />
            <div className="container mx-auto p-[2rem]">
                <h1 className="text-4xl text-slate-900 font-semibold">Your Thoughts</h1>
                <p className="text-slate-500 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
            </div>

            <button className=" w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10">
            </button>

            <AddEditResume />


        </section>
    )
}

export default Home