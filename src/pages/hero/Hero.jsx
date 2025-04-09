
import { useState, useEffect } from "react"

import { NavLink } from "react-router"
import Navbar from "../../components/Navbar"

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [activeFeature, setActiveFeature] = useState(0)


    // Features to cycle through
    const features = [
        "Professional Templates",
        "Get Job Easily",
        "One-Click Applications",
    ]

    // Animation on mount
    useEffect(() => {
        setIsVisible(true)

        // Cycle through features
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])


    
    return (
        <div className="container-fluid p-0">
            <Navbar />
            <div
                className="row g-0 min-vh-100"
                style={{
                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                }}
            >
                {/* Content Column */}
                <div className="col-lg-6 d-flex align-items-center">
                    <div
                        className={`px-4 px-md-5 py-5 mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}
                        style={{ maxWidth: "600px" }}
                    >
                        <div
                            className="badge mb-3 px-3 py-2 rounded-pill"
                            style={{
                                backgroundColor: "rgba(108, 92, 231, 0.1)",
                                color: "#6c5ce7",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <span
                                className="spinner-grow spinner-grow-sm me-2"
                                style={{
                                    width: "0.5rem",
                                    height: "0.5rem",
                                    animation: "pulse 1.5s infinite ease-in-out",
                                }}
                            ></span>
                            Launching Soon
                        </div>

                        <h1
                            className="display-4 fw-bold mb-3"
                            style={{
                                transition: "all 0.5s ease",
                                transitionDelay: "0.1s",
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                            }}
                        >
                            Welcome to <span style={{ color: "#6c5ce7" }}>ResumeHub</span>
                        </h1>

                        <h2
                            className="h3 mb-4"
                            style={{
                                transition: "all 0.5s ease",
                                transitionDelay: "0.2s",
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                                height: "60px",
                            }}
                        >
                            <span className="text-muted">Your one-stop solution for </span>
                            <div className="feature-text position-relative">
                                {features.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="position-absolute"
                                        style={{
                                            left: 0,
                                            top: 0,
                                            opacity: activeFeature === index ? 1 : 0,
                                            transform: `translateY(${activeFeature === index ? 0 : 10}px)`,
                                            transition: "all 0.5s ease",
                                            fontWeight: "600",
                                            color: "#6c5ce7",
                                        }}
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </h2>

                        <p
                            className="lead mb-5 text-muted"
                            style={{
                                transition: "all 0.5s ease",
                                transitionDelay: "0.3s",
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                                lineHeight: "1.6",
                            }}
                        >
                            Create professional resumes in minutes with our intuitive platform. Stand out from the crowd and land your
                            dream job with ResumeHub.
                        </p>

                        <div
                            className="d-flex flex-wrap gap-3"
                            style={{
                                transition: "all 0.5s ease",
                                transitionDelay: "0.4s",
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                            }}
                        >
                            <NavLink
                                to="/login"
                                className="btn btn-lg px-4 py-2 rounded-pill"
                                style={{
                                    backgroundColor: "#6c5ce7",
                                    color: "white",
                                    border: "none",
                                    fontWeight: "500",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 4px 15px rgba(108, 92, 231, 0.3)",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)"
                                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(108, 92, 231, 0.4)"
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)"
                                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(108, 92, 231, 0.3)"
                                }}
                            >
                                Get Started
                            </NavLink>

                            <NavLink
                                to="/signup"
                                className="btn btn-lg px-4 py-2 rounded-pill"
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
                            >
                                Learn More
                            </NavLink>
                        </div>

                        <div
                            className="d-flex flex-wrap gap-4 mt-5"
                            style={{
                                transition: "all 0.5s ease",
                                transitionDelay: "0.5s",
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                            }}
                        >
                            <div className="text-center">
                                <h3 className="fw-bold mb-0">1k+</h3>
                                <p className="text-muted mb-0 small">Active Users</p>
                            </div>

                            <div
                                className="text-center"
                                style={{
                                    position: "relative",
                                    paddingLeft: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: "10%",
                                        height: "80%",
                                        width: "1px",
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    }}
                                ></div>
                                <h3 className="fw-bold mb-0">98%</h3>
                                <p className="text-muted mb-0 small">Success Rate</p>
                            </div>

                            <div
                                className="text-center"
                                style={{
                                    position: "relative",
                                    paddingLeft: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: "10%",
                                        height: "80%",
                                        width: "1px",
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    }}
                                ></div>
                                <h3 className="fw-bold mb-0">24/7</h3>
                                <p className="text-muted mb-0 small">Company see ur resume</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Column */}
                <div className="col-lg-6 d-none d-lg-block position-relative" style={{ overflow: "hidden" }}>
                    <div
                        className={`h-100 w-100 ${isVisible ? "animate-slide-in" : ""}`}
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: "rgba(108, 92, 231, 0.1)",
                            transform: isVisible ? "translateX(0)" : "translateX(100px)",
                            opacity: isVisible ? 1 : 0,
                            transition: "all 1s ease",
                            borderRadius: "24px 0 0 24px",
                            margin: "20px 0 20px 0",
                            boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.1)",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* Floating elements */}
                        <div
                            className="position-absolute"
                            style={{
                                top: "15%",
                                left: "10%",
                                padding: "15px 20px",
                                backgroundColor: "white",
                                borderRadius: "12px",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                                animation: "float 6s ease-in-out infinite",
                                zIndex: 2,
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <div
                                    className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        backgroundColor: "rgba(108, 92, 231, 0.1)",
                                        color: "#6c5ce7",
                                    }}
                                >
                                    <span>✓</span>
                                </div>
                                <div>
                                    <p className="mb-0 fw-bold">Resume Approved</p>
                                    <p className="mb-0 small text-muted">Just now</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="position-absolute"
                            style={{
                                bottom: "20%",
                                right: "15%",
                                padding: "15px 20px",
                                backgroundColor: "white",
                                borderRadius: "12px",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                                animation: "float 6s ease-in-out infinite 1s",
                                zIndex: 2,
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <div
                                    className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        backgroundColor: "rgba(72, 219, 116, 0.1)",
                                        color: "#48db74",
                                    }}
                                >
                                    <span>★</span>
                                </div>
                                <div>
                                    <p className="mb-0 fw-bold">Get Job</p>
                                    <p className="mb-0 small text-muted">Tomorrow, 2:00 PM</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="position-absolute"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "120px",
                                height: "120px",
                                backgroundColor: "white",
                                borderRadius: "50%",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                animation: "pulse 3s infinite ease-in-out",
                                zIndex: 1,
                            }}
                        >
                            <div className="text-center">
                                <h4 className="mb-0 fw-bold" style={{ color: "#6c5ce7" }}>
                                    85%
                                </h4>
                                <p className="mb-0 small">Match Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slide-in {
          animation: slideIn 1s forwards;
        }
        
        @keyframes slideIn {
          from { 
            transform: translateX(100px);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    )
}
