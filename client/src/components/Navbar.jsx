import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { logout } from '../features/auth/authSlice'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowLogo(true)
      } else {
        setShowLogo(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    setIsMenuOpen(false)
  }

  // Common styles for nav links to keep it DRY
  const linkStyles = "text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity";

  return (
    <nav className="bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-900 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">

          {/* Logo - Matches SM fitness branding */}
          <div className={`transition-all duration-500 transform ${showLogo ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 -translate-x-10 pointer-events-none'}`}>
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/images/gym logo.png" className='w-16 py-0 px-2 rounded-full bg-black' alt="" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden text-black dark:text-white  md:flex items-center gap-10">
            {!user ? (
              <>
                <Link to="/" className={linkStyles}>Home</Link>
                <a href="/#about" className={linkStyles}>About</a>
                <a href="/#trainings" className={linkStyles}>Trainings</a>
                <a href="/#pricing" className={linkStyles}>Pricing</a>
                <Link to="/login" className={linkStyles}>Login</Link>
                <Link
                  to="/register"
                  className="px-6 py-2 border border-zinc-900 dark:border-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300"
                >
                  Join Today
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-8">
                  {user.role === 'admin' ? (
                    <Link to="/admin" className={linkStyles}>Admin Panel</Link>
                  ) : (
                    <Link to="/dashboard" className={linkStyles}>Dashboard</Link>
                  )}
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-l border-zinc-200 dark:border-zinc-800 pl-8">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 border border-zinc-900 dark:border-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:border-red-500 hover:text-white transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-zinc-900 dark:text-white focus:outline-none"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`h-[2px] bg-current transition-all ${isMenuOpen ? 'w-6 rotate-45 translate-y-[9px]' : 'w-6'}`}></span>
              <span className={`h-[2px] bg-current transition-all ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`h-[2px] bg-current transition-all ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-[9px]' : 'w-5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden text-black dark:text-white absolute inset-x-0 top-20 bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-800 py-8 px-6 space-y-6 flex flex-col items-center animate-in fade-in slide-in-from-top-4">
            {!user ? (
              <>
                <Link to="/" className={linkStyles}>Home</Link>
                <a href="/#about" onClick={() => setIsMenuOpen(false)} className={linkStyles}>About</a>
                <a href="/#trainings" onClick={() => setIsMenuOpen(false)} className={linkStyles}>Trainings</a>
                <a href="/#pricing" onClick={() => setIsMenuOpen(false)} className={linkStyles}>Pricing</a>

                <Link to="/login" onClick={() => setIsMenuOpen(false)} className={linkStyles}>Login</Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center px-6 py-4 border border-zinc-900 dark:border-white rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white dark:bg-white dark:text-black"
                >
                  Join Today
                </Link>
              </>
            ) : (
              <>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{user.name}</span>
                {user.role === 'admin' ? (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className={linkStyles}>Admin Panel</Link>
                ) : (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={linkStyles}>Dashboard</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-4 border border-zinc-900 dark:border-white rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white dark:bg-white dark:text-black"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar