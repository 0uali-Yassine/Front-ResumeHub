import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Hero from './pages/hero/Hero'
import Footer from './pages/footer/Footer'
import PublicResume from './pages/resume/PublicResume'

function App() {
  
  const routes = (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/view-resume/:id" element={<PublicResume />} />
      </Routes>
      <Footer />
    </Router>
  )
  return (
    <>
      {routes}
    </>
  )
}

export default App