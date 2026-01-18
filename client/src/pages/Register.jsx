import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        weight: ''
    })
    const { name, email, password, confirmPassword, age, weight } = formData
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            alert(message)
        }
        if (isSuccess) {
            alert('Registration successful! Please login.')
            navigate('/login')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        const userData = { name, email, password, age, weight }
        dispatch(register(userData))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    }

    return (
        <div className="min-h-screen relative bg-white dark:bg-black text-black dark:text-white p-2 md:p-12 font-sans overflow-hidden transition-colors duration-300 flex flex-col justify-center">

            <button
                onClick={() => navigate('/')}
                className="flex backdrop-blur-sm fixed top-24 right-8 z-50 items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] border border-black/5 dark:border-white/5 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-black dark:text-white"
            >
                <FiArrowLeft className="w-3 h-3" /> Home
            </button>

            <div className="max-w-md mx-auto w-full relative z-10 py-12">
                <header className="mb-10 text-center">
                    <span className="text-[10px] font-black uppercase text-center tracking-[0.3em] text-zinc-500 mb-2 block">Registration Lab</span>
                    <h1 className="text-5xl italic md:text-7xl font-black uppercase tracking-tighter leading-none text-black dark:text-white">
                        Join <span className="text-zinc-300 dark:text-zinc-700">Us</span>
                    </h1>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] p-8 md:p-10 border border-black/5 dark:border-white/5 transition-colors duration-300"
                >
                    <form onSubmit={onSubmit} className="space-y-5">
                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                placeholder="John Doe"
                                className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="name@example.com"
                                className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white"
                                required
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Age (Opt)</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={age}
                                    onChange={onChange}
                                    placeholder="25"
                                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white text-center"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Weight (Opt)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={weight}
                                    onChange={onChange}
                                    placeholder="75 (kg)"
                                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white text-center"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                        className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Confirm</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                        className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-4xl text-sm font-bold uppercase tracking-widest focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white"
                                        required
                                    />
                                    <button

                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.button
                            variants={itemVariants}
                            disabled={isLoading}
                            className="w-full bg-black text-white dark:bg-white dark:text-black py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group mt-6"
                        >
                            {isLoading ? 'Creating Account...' : 'Initialize Profile'}
                            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </form>

                    <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                            Already optimized?
                        </p>
                        <Link
                            to="/login"
                            className="text-xs font-black uppercase tracking-widest text-black dark:text-white hover:opacity-70 transition-opacity"
                        >
                            Sign In
                        </Link>
                    </motion.div>
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

export default Register
