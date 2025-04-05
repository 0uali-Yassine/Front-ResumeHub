import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

function App() {
  const routes =(
    <Router>
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/dashboard"  element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
  return (
    <>
      {routes}
    </>
  )
}

export default App