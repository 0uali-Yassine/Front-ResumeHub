/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const ResumeCard = ({ name, img, date, description, experience, education, skills, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="card border rounded p-3 bg-white shadow-sm transition" style={{ minHeight: "220px" }}>
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h6 className="mb-1 small fw-semibold">{name}</h6>
                    <small className="text-muted">{date}</small>
                </div>
                <img
                    src={img}
                    alt="thumbnail"
                    className="img-thumbnail rounded-circle ms-3"
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
            </div>

            <p className="small text-muted mt-2 mb-0">
                {expanded ? description : description.slice(0, 100) + (description.length > 100 ? '...' : '')}
            </p>

            {expanded && (
                <>
                    <div className="mt-2">
                        <h6 className="small text-dark fw-bold mb-1">Experience:</h6>
                        {experience.map((exp, index) => (
                            <p className="small text-muted mb-1" key={index}>{exp}</p>
                        ))}
                    </div>

                    <div className="mt-2">
                        <h6 className="small text-dark fw-bold mb-1">Education:</h6>
                        {education.map((edu, index) => (
                            <p className="small text-muted mb-1" key={index}>{edu}</p>
                        ))}
                    </div>
                    <div className="mt-2">
                        <h6 className="small text-dark fw-bold mb-1">Skills:</h6>
                        {skills.map((skill, index) => (
                            <span key={index} className="badge bg-secondary me-2">{skill}</span>
                        ))}
                    </div>

                </>
            )}

            <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">#create by: Yassine</small>
                <div className="d-flex gap-2">
                    <div className="ms-auto">
                        <MdCreate className="icon-btn text-muted cursor-pointer hover-text-success" onClick={onEdit} />
                        <MdDelete className="icon-btn text-muted cursor-pointer hover-text-danger" style={{cursor:'pointer'}} onClick={onDelete} />
                    </div>
                </div>
            </div>


            <div className="text-center mt-2">
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'View Less' : 'View More'}
                </button>
            </div>
        </div>
    );
};

export default ResumeCard;
