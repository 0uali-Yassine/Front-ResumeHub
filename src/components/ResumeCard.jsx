/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { toast } from 'react-toastify';

const ResumeCard = ({
  name,
  img,
  date,
  description,
  experience = [],
  education = [],
  skills = [],
  highlighted,
  currentUserId,
  resumeUserId,
  role,
  onEdit,
  onDelete: externalDelete,
}) => {
  const newRole = currentUserId === resumeUserId ? role : "manager";
  // const canExpand = role === "manager" || currentUserId === resumeUserId;
  const canExpand = newRole;
  const [expanded, setExpanded] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  //const [editFormData, setEditFormData] = useState({ name, role, description });

//   const handleEdit = () => {
//     //externalEdit?.(editFormData);
//     onEdit();
//     //setIsEditDialogOpen(false);
//     //toast.success("Resume updated successfully");
//   };

  const handleDelete = () => {
    externalDelete?.();
    setIsDeleteDialogOpen(false);
    toast.warning(`${name} cannot be deleted`);
  };

  return (
    <>
    {/* <div
  className={`card border rounded-4 p-4 bg-white shadow-sm transition-all duration-300 ${
    highlighted ? 'highlighted-card' : ''
  }`}
  style={{ minHeight: "220px" }}
></div> */}
      <div
        className={`card border rounded-4 p-4 bg-white shadow-sm transition-all duration-300 ${
            highlighted ? 'highlighted-card' : ''
          }`}
          
        style={{
          minHeight: "220px",
          transition: "all 0.3s ease",
        }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="fw-bold mb-1">{name}</h5>
            <div className="text-muted small mb-2 d-flex align-items-center">
              <span className="badge bg-light text-dark me-2">{role}</span>
              <span>•</span>
              <span className="ms-2">{date}</span>
            </div>
          </div>
          <img
            src={img || "/placeholder.svg"}
            alt={name}
            className="rounded-circle"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              border: "3px solid #fff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <div className="mt-3">
          <p className="text-muted" style={{ lineHeight: "1.6" }}>
            {expanded
              ? description
              : description?.slice(0, 100) + (description?.length > 100 ? "..." : "")}
          </p>
        </div>

        <hr className="my-3" style={{ opacity: "0.1" }} />

        {expanded && (
          <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
            <div className="mt-3">
              <h6 className="fw-bold mb-2">💼 Experience</h6>
              {experience.map((exp, index) => (
                <div key={index} className="mb-2 ps-3 border-start border-2" style={{ borderColor: "#e9ecef" }}>
                  <p className="mb-0 text-muted">{exp}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h6 className="fw-bold mb-2">🎓 Education</h6>
              {education.map((edu, index) => (
                <div key={index} className="mb-2 ps-3 border-start border-2" style={{ borderColor: "#e9ecef" }}>
                  <p className="mb-0 text-muted">{edu}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h6 className="fw-bold mb-2">🔧 Skills</h6>
              <div className="d-flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill"
                    style={{ backgroundColor: "#6c5ce7", color: "white" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted small">By: {name}</div>
          <div className="d-flex">
            <button
              className="btn btn-sm rounded-circle me-2"
              style={{
                backgroundColor: "rgba(72, 219, 116, 0.1)",
                color: "#48db74",
              }}
              onClick={onEdit}
              title="Edit"
            >
              <BiPencil size={16} />
            </button>
            <button
              className="btn btn-sm rounded-circle"
              style={{
                backgroundColor: "rgba(255, 71, 87, 0.1)",
                color: "#ff4757",
              }}
              onClick={() => setIsDeleteDialogOpen(true)}
              title="Delete"
            >
              <BsTrash2 size={16} />
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            title={canExpand ? "Expand" : "You cannot expand this resume"}
            className="btn btn-sm w-100"
            style={{
              backgroundColor: expanded ? "#f8f9fa" : "#6c5ce7",
              color: expanded ? "#6c5ce7" : "white",
              borderRadius: "30px",
              border: expanded ? "1px solid #6c5ce7" : "none",
              transition: "all 0.3s ease",
              cursor: canExpand ? "pointer" : "not-allowed",
              opacity: canExpand ? 1 : 0.7,
            }}
            onClick={() => canExpand && setExpanded(!expanded)}
            disabled={!canExpand}
          >
            {expanded ? "View Less" : "View More"}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {/*isEditDialogOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Edit Resume</h5>
                <button type="button" className="btn-close" onClick={() => setIsEditDialogOpen(false)}></button>
              </div>
              <div className="modal-body px-4">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Full Name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Role"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                />
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                ></textarea>
              </div>
              <div className="modal-footer border-0 px-4 pb-4">
                <button className="btn btn-light" onClick={() => setIsEditDialogOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )*/}

      {/* Delete Modal */}
      {isDeleteDialogOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setIsDeleteDialogOpen(false)}></button>
              </div>
              <div className="modal-body text-center">
                <p className="text-muted">Are you sure you want to delete <strong>{name}</strong>?</p>
              </div>
              <div className="modal-footer border-0 px-4 pb-4">
                <button className="btn btn-light" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeCard;
