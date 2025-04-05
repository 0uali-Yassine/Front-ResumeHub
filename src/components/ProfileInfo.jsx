import React from 'react'
import { getInitials } from '../utils/helper'

function ProfileInfo() {
    return (
        <div className="d-flex align-items-center gap-3 p-2">
            <div className="d-flex justify-content-center fw-bold align-items-center rounded-circle bg-light text-dark font-weight-medium" style={{ width: '3rem', height: '3rem' }}>
                {getInitials("ygbahzd hg")}
            </div>
            <div>
                <p className="fw-bold">ygbahzd</p>
                <button className="btn btn-outline-danger p-2 text-sm font-weight-bold">
                    LogOut
                </button>

            </div>
        </div>

    )
}

export default ProfileInfo