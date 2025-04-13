/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import html2pdf from 'html2pdf.js'

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
  resume
}) => {
  // const newRole = currentUserId === resumeUserId ? role : "manager";
  const canExpand = role === "manager" || currentUserId === resumeUserId;
  // const canExpand = newRole;
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
    // toast.warning(`${name} cannot be deleted`);
  };

  // copy the link
  const [isCopied, setIsCopied] = useState(false);

  function copyLink(link) {
    // Copy the RIB to the clipboard
    navigator.clipboard.writeText(link)
      .then(() => {
        setIsCopied(true);
        toast.success('Link copied to clipboard!');
      })
      .catch((err) => {
        setIsCopied(false);
        console.error('Failed to copy Link: ', err);
      });
  }

  const navigate = useNavigate()

  const handleViewClick = (resumeId) => {
    navigate(`/view-resume/${resumeId}`)
  }

  // dowload resume
  const resumeRef = useRef()
  const handleDownload = () => {
    const element = resumeRef.current
    const opt = {
      margin: 0.5,
      filename: `${resume?.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
  }


  return (
    <>
      {/* <div
  className={`card border rounded-4 p-4 bg-white shadow-sm transition-all duration-300 ${
    highlighted ? 'highlighted-card' : ''
  }`}
  style={{ minHeight: "220px" }}
></div> */}
      <div
        className={`card border rounded-4 p-4 bg-white shadow-sm transition-all duration-300 ${highlighted ? 'highlighted-card' : ''
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
              <span className="badge bg-light text-dark me-2">{role === "manager" ? 'Employer' : 'Employer'}</span>
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

          {
            canExpand && (
              <button
                title={canExpand ? "Expand" : "You cannot expand this resume"}
                style={{
                  backgroundColor: "#6c5ce7",
                  color: "white",
                  borderRadius: "30px",
                  border: "1px solid #6c5ce7",
                  transition: "all 0.3s ease",
                  cursor: canExpand ? "pointer" : "not-allowed",
                  opacity: canExpand ? 1 : 0.7,
                  width: '179px'
                }}
                className="btn mt-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target={`#offcanvasBottom-${resume?.userId}`}
                aria-controls={`offcanvasBottom-${resume?.userId}`}
              >
                Resume
              </button>

            )

          }

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
      {/* ofcanva*/}
      {/* <!-- Trigger Button --> */}
      {/* <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
      >
        View Resume
      </button> */}

      {/* from here it giive me the first resume i create thier data */}

      <div
        className="offcanvas offcanvas-bottom fullscreen"
        tabIndex="-1"
        id={`offcanvasBottom-${resume?.userId}`}
        aria-labelledby={`offcanvasBottom-${resume?.userId}-label`}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id={`offcanvasBottom-${resume?.userId}-Label `}>{name}– {resume?.title}</h5>
          <div title='Copy url' className='' style={{ cursor: 'pointer', marginLeft: "10px" }} onClick={() => copyLink(`front-resume-hub.vercel.app/view-resume/${resume?.userId}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: '#6c5ce7' }} width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
              <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
            </svg>
          </div>
          {
            isCopied && <span style={{ color: "#624dff", fontSize: '12px' }} className='mt-1'>copied</span>
          }
          <div title='View PDF' className='ms-2' style={{ cursor: 'pointer' }} onClick={() => handleViewClick(resume?.userId)}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'red' }} width="18" height="18" fill="currentColor" class="bi bi-file-earmark-pdf-fill" viewBox="0 0 16 16">
              <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
              <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
            </svg>
          </div>
          <div title='Download PDF' className='ms-2 mt-1' style={{ cursor: 'pointer', color: '#2563eb' }} onClick={handleDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
              <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708" />
            </svg>
          </div>
          
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div ref={resumeRef} className="offcanvas-body px-4 py-3" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
          {/* Header */}
          <div className="text-center mb-4">
            <img src="https://via.placeholder.com/100" alt="Profile" className="rounded-circle mb-2" />
            <h4 className="fw-bold mb-0">{name}</h4>
            <p className="text-muted mb-1">{resume?.title}</p>
            <div className="small">
              <div>📧 {resume?.email}</div>
              <div>📍 {resume?.address}</div>
              <div>📞 {resume?.phone}</div>
              <div>
                🌐
                <a href={resume?.link} style={{ color: '#624dff' }} target="_blank" rel="noreferrer">
                  Portfolio Website
                </a>
              </div>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Professional Summary</h6>
            <p>
              {description}
            </p>
          </section>

          {/* Skills */}
          <section className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {skills?.map((skill, i) => (
                <span key={i} className="badge bg-secondary">{skill}</span>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Projects</h6>
            <ul className="list-unstyled">
              {
                resume?.project.map(prjct => {
                  return <li>*<strong>{prjct}</strong></li>

                })
              }

            </ul>
          </section>

          {/* Experience */}
          <section className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Experience</h6>
            <div>
              {
                experience?.map(exp => {
                  return <>
                    <strong>{exp}</strong><br />
                  </>
                })
              }
              {/* <strong>Freelancer</strong><br /> */}
              {/* <span className="text-muted small">June 2021 – October 2023</span>
              <p className="mb-1">Built responsive, visually appealing landing pages and apps for clients using modern tech stacks.</p> */}

              {/* <strong>Déclarant en Douane – IDDTL, Casablanca</strong><br /> */}
              {/* <span className="text-muted small">October 2017 – June 2018</span> */}
            </div>
          </section>

          {/* Education */}
          <section className="mb-2">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Education</h6>
            <div>
              {
                education?.map(edc => {
                  return <p className="mb-1"><strong>{edc}</strong> <br /></p>
                })
              }
              {/* <p className="mb-1"><strong>Développement Informatique – OFPPT Casablanca</strong> <br /></p>
              <p className="mb-1"><strong>Baccalauréat SVT – Lycée ELKhalil, Casablanca</strong> <br /></p> */}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-2">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Languages</h6>
            <div>
              {
                resume?.language?.map(lng => {
                  return <p className="mb-0">{lng}</p>
                })
              }
            </div>
            {/* <p className="mb-0">English, French</p> */}
          </section>
        </div>
      </div>


      {/* ofcanva*/}

    </>
  );
};

export default ResumeCard;
