import React,{useState} from 'react'
import ProfileInfo from './ProfileInfo'
import { NavLink, useNavigate } from 'react-router'
import SearchBar from './SearchBar';
import axiosInstance from '../utils/axiosInstance';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();




  const handleSearch = () => {
  }

  const onClearSearch = () => {
    setSearchQuery("");
  }


  const onLogout = async () => {
    try {
        const response = await axiosInstance.get("/logout", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response?.data?.error) {
            console.error("Logout failed:", response?.data?.message);
            console.log("Logout failed:", response?.data?.message);
        } else {
            localStorage.removeItem("token");

            console.log("Logout success");
            navigate("/");  // Use the `navigate` function to redirect
        }
    } catch (err) {
        console.error("Error during logout:", err);
    }
};
  
  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4" style={{ backgroundColor: "#fff" }}>
      <div className="container-fluid">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h2 className="navbar-brand fw-bold" style={{ color: "#6c5ce7" }}>ResumeHub</h2>
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto w-100 d-flex justify-content-center">
            <SearchBar
              value={searchQuery}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ProfileInfo onLogout={onLogout} />
        </div>
      </div>
    </nav>


  )
}

export default Navbar