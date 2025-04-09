import React from "react"
import { NavLink } from "react-router-dom"

function Footer() {
  return (
    <footer
      className="text-white pt-5 pb-4"
      style={{
        backgroundColor: "#6c5ce7",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* Brand Column */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">
              ResumeHub
            </h5>
            <p className="text-light small">
              Build smart, professional resumes with ease. Powered by modern AI tools and elegant design.
            </p>
          </div>

          {/* Links Column */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Product</h6>
            <p><NavLink to="" className="text-light text-decoration-none">Features</NavLink></p>
            <p><NavLink to="" className="text-light text-decoration-none">Pricing</NavLink></p>
            <p><NavLink to="" className="text-light text-decoration-none">Templates</NavLink></p>
            <p><NavLink to="" className="text-light text-decoration-none">Download</NavLink></p>
          </div>

          {/* About Column */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Resources</h6>
            <p><NavLink to="" className="text-light text-decoration-none">Support</NavLink></p>
            <p><NavLink to="" className="text-light text-decoration-none">Guides</NavLink></p>
            <p><NavLink to="" className="text-light text-decoration-none">FAQs</NavLink></p>
            <p><NavLink to="" className="text-light text-decoration-none">Contact</NavLink></p>
          </div>

          {/* Contact Column */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p className="text-light small"><i className="bi bi-envelope me-2"></i> support@resumehub.com</p>
            <p className="text-light small"><i className="bi bi-geo-alt me-2"></i> New York, NY 10012, US</p>
            <p className="text-light small"><i className="bi bi-phone me-2"></i> +1 234 567 890</p>
          </div>

        </div>

        <hr className="mb-4 mt-4 border-light" />

        {/* Footer Bottom */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-light small mb-0">
              © {new Date().getFullYear()} ResumeHub. All rights reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-end">
              <a href="" className="text-light me-3 text-decoration-none">
                Privacy Policy
              </a>
              <a href="" className="text-light text-decoration-none">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
