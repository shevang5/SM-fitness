import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute role="member">
              <UserDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
