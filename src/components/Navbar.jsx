import React,{useState} from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router'
import SearchBar from './SearchBar';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
  }

  const onClearSearch = () => {
    setSearchQuery("");
  }


  const onLogout = () => {
    localStorage.removeItem("token");
    // axios
    navigate("/");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-5">
      <div className="container-fluid">
        <h2 className="navbar-brand text-dark py-2">ResumeHub</h2>

        {/* Toggler for responsive navbar */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto w-100 d-flex justify-content-center">
            <SearchBar
              value={searchQuery} 
              handleSearch={handleSearch} 
               onClearSearch={onClearSearch} 
               onChange={(e) => (setSearchQuery(e.target.value))}
              />
          </div>

          <ProfileInfo onLogout={onLogout} />
        </div>
      </div>
    </nav>


  )
}

export default Navbar