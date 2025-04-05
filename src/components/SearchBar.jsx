import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
    return (
        <div className="d-flex align-items-center px-3 bg-light rounded">
            <input
                value={value}
                onChange={onChange}
                type="text"
                placeholder="Search Resumes"
                className="form-control form-control-sm bg-transparent border-0 p-2"
                style={{ boxShadow: "none", outline: "none" }}
            />

            {value
                && (
                    <IoMdClose
                        className="fs-4 text-muted cursor-pointer me-3"
                        onClick={onClearSearch}

                    />
                )}
            <button className="btn btn-link p-0 text-muted ms-2 cursor-pointer" onClick={handleSearch}>
                <FaMagnifyingGlass className="text-muted hover:p hover:text-danger" />
            </button>
        </div>

    )
}

export default SearchBar