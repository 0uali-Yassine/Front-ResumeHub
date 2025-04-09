import React, { use, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Add prop-types for validation
import { getInitials } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router';

function ProfileInfo({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const goToLogin = () => {
  //   navigate('/login');
  // }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/get-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response?.data?.error) {
          setUser(response?.data?.user);
        } else {
          setError(response.data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError(error.message || 'Error fetching user data');
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="p-2">Loading...</div>;
  if (error) return <div className="p-2 text-danger">{error}</div>;
  console.log(user);
  console.log(user?.name);
  console.log(user?.fullName);

  return (
    <div className="d-flex align-items-center gap-3 p-2">
      {
        user?.fullName && (
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              width: "3rem",
              height: "3rem",
              backgroundColor: "rgba(108, 92, 231, 0.1)",
              color: "#6c5ce7",
              fontWeight: "600",
              border: "1px solid #6c5ce7",
            }}
            aria-label="User avatar"
          >
            {getInitials(user?.fullName)}
          </div>

        )
      }


      <div>
        {user ? (
          <button
            className="btn btn-sm px-4 py-2 rounded-pill"
            style={{
              backgroundColor: "#ff6b6b",
              color: "white",
              border: "none",
              fontWeight: "500",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)"
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 107, 107, 0.4)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 107, 107, 0.3)"
            }}
            onClick={onLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        ) : (
          <button
            className="btn btn-sm px-4 py-2 rounded-pill"
            style={{
              backgroundColor: "transparent",
              color: "#6c5ce7",
              border: "1px solid #6c5ce7",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)"
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(108, 92, 231, 0.2)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
            onClick={() => navigate("/login")}
            aria-label="Login"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

// ProfileInfo.propTypes = {
//   onLogout: PropTypes.func.isRequired,
// };

export default ProfileInfo;