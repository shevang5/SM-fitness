import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const { email, password } = formData
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            alert(message)
        }
        if (isSuccess || user) {
            if (user.role === 'admin') navigate('/admin')
            else navigate('/dashboard')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData))
    }

    return (
        <div className="min-h-screen relative bg-white dark:bg-black text-black dark:text-white p-6 md:p-12 font-sans overflow-hidden transition-colors duration-300 flex flex-col justify-start">

            <button
                onClick={() => navigate('/')}
                className="flex backdrop-blur-sm fixed top-24 right-8 z-50 items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] border border-black/5 dark:border-white/5 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-black dark:text-white"
            >
                <FiArrowLeft className="w-3 h-3" /> Home
            </button>

            <div className="max-w-md mx-auto w-full relative z-10">
                <header className="mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2 block">Access Portal</span>
                    <h1 className="text-5xl md:text-7xl text-center font-black italic uppercase tracking-tighter leading-none text-black dark:text-white">
                        Sign <span className="text-zinc-300 dark:text-zinc-700">In</span>
                    </h1>
                </header>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] p-10 border border-black/5 dark:border-white/5 transition-colors duration-300"
                >
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="name@example.com"
                                className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 md:p-6 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 md:p-6 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full bg-black text-white dark:bg-white dark:text-black py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group mt-8"
                        >
                            {isLoading ? 'Processing...' : 'Authorize'}
                            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                            New to the performance lab?
                        </p>
                        <Link
                            to="/register"
                            className="text-xs font-black uppercase tracking-widest text-black dark:text-white hover:opacity-70 transition-opacity"
                        >
                            Create Account
                        </Link>
                    </div>
                </motion.div>

                <div className="mt-12 text-center">
                    <p className="text-[8px] font-bold uppercase tracking-[0.5em] text-zinc-400">
                        &copy; {new Date().getFullYear()} SM FITNESS PERFORMANCE
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
