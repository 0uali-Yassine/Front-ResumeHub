import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';


const PublicResume = () => {
  const { id } = useParams()
  const [resume, setResume] = useState(null)

  useEffect(() => {
    axiosInstance.get(`/resume/${id}`)
      .then(res => setResume(res.data.resume[0]))
      .catch(err => console.error(err))
  }, [id])

 

  //console.log(resume);
  if (!resume) return <div>Loading...</div>

  return (
    <> 
    <div className="offcanvas-header border-bottom">
          
        </div>

        <div className="offcanvas-body px-4 py-3" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
          {/* Header */}
          <div className="text-center mb-4">
            <img src="https://via.placeholder.com/100" alt="Profile" className="rounded-circle mb-2" />
            <h4 className="fw-bold mb-0">{resume?.name}</h4>
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
              {resume?.description}
            </p>
          </section>

          {/* Skills */}
          <section className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {resume?.skills?.map((skill, i) => (
                <span key={i} className="badge bg-secondary">{skill}</span>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-4">
            <h6 className="fw-bold text-uppercase border-bottom pb-1 mb-2">Projects</h6>
            <ul className="list-unstyled">
              {
                resume?.project?.map(prjct => {
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
                resume?.experience?.map(exp => {
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
                resume?.education?.map(edc => {
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
    </>
  )
}

export default PublicResume
