import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Add prop-types for validation
import { getInitials } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';

function ProfileInfo({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  if (!user) return <div className="p-2">Login</div>;
  console.log(user);
  console.log(user?.name);

  return (
    <div className="d-flex align-items-center gap-3 p-2">
      <div
        className="d-flex justify-content-center fw-bold align-items-center rounded-circle bg-light text-dark font-weight-medium"
        style={{ width: '3rem', height: '3rem' }}
        aria-label="User avatar"
      >
        {getInitials(user?.fullName)}
      </div>
      <div>
        <button
          className="btn btn-outline-danger p-2 text-sm font-weight-bold"
          onClick={onLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// ProfileInfo.propTypes = {
//   onLogout: PropTypes.func.isRequired,
// };

export default ProfileInfo;