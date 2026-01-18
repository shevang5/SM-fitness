import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { logout, getMe } from '../features/auth/authSlice'
import { motion } from 'framer-motion'
import API_URL from '../api/config'
import { FiLogOut, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import ProgressChart from '../components/ProgressChart'
import ProgressLog from '../components/ProgressLog'

const UserDashboard = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    const getDaysRemaining = () => {
        if (!user.membership || !user.membership.endDate) return 0;
        const now = new Date();
        const end = new Date(user.membership.endDate);
        const diffTime = end - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const daysRemaining = getDaysRemaining();
    const isExpired = daysRemaining <= 0;

    const onActivate = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const sanitizedCode = code.trim().toUpperCase();
            await axios.post(`${API_URL}/membership/activate`, { userId: user._id || user.id, code: sanitizedCode }, config);
            setMsg('Success. Refreshing...');
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            setMsg(err.response?.data?.msg || 'Error activating');
        }
    };

    return (
        <div className="min-h-screen relative bg-white dark:bg-black text-black dark:text-white p-6 md:p-12 font-sans overflow-hidden transition-colors duration-300">
            {/* Background Branding Accent */}
            {/* <div className="absolute overflow-x-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none ">
                <h1 className="text-[30vw] font-black uppercase tracking-tighter leading-none">MEMBER</h1>
            </div> */}

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-2">
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex backdrop-blur-sm fixed right-0 z-50 items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-black/5 dark:border-white/5 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-black dark:text-white"
                        >
                            <FiArrowLeft className="w-3 h-3 text-black dark:text-white" /> Back
                        </button>
                        <span className="text-[10px] pt-3 font-black uppercase tracking-[0.3em] text-zinc-500 mb-2 block">Account Overview</span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-black dark:text-white">
                            My <span className="text-zinc-300 dark:text-zinc-700">Status</span>
                        </h1>
                    </div>
                    {/* <button 
                        onClick={() => dispatch(logout())} 
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
                    >
                        <FiLogOut /> Sign Out
                    </button> */}
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 items-start">
                    {/* Status Column */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className={`${isExpired ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-4`}
                    >

                        {/* Membership Card */}
                        <div className='flex flex-col gap-2 md:flex-row' >


                            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] p-10 md:p-16 border border-black/5 dark:border-white/5 relative overflow-hidden group transition-colors duration-300">
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-1 md:mb-12">
                                        <div className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-black dark:text-white">
                                            {daysRemaining > 0 ? daysRemaining : '00'}
                                            <span className="text-xl md:text-2xl ml-2 font-bold uppercase tracking-widest text-zinc-500 block">Days Left</span>
                                        </div>
                                        <div className="text-black dark:text-white opacity-20 text-6xl font-black">*</div>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-1 text-black dark:text-white">
                                                {user.membership?.planName || 'Standard Access'}
                                            </h2>
                                            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isExpired ? 'text-red-500' : 'text-zinc-500'}`}>
                                                {isExpired ? 'Membership Expired' : `Valid until ${new Date(user.membership.endDate).toLocaleDateString()}`}
                                            </p>
                                        </div>
                                        <div className={`h-px md:h-12 w-12 md:w-px ${isExpired ? 'bg-red-500/30' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Status</span>
                                            <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isExpired ? 'bg-red-500/10 text-red-500' : 'bg-black text-white dark:bg-white dark:text-black'}`}>
                                                {isExpired ? 'Inactive' : 'Active'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ProgressChart metric="weight" title="Weight" className="flex-1" />
                        </div>

                        {/* Progress Tracker */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <ProgressLog defaultType="weight" />
                        </div>
                    </motion.div>

                    {/* Activation Column */}
                    {isExpired && (
                        <motion.div
                            initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                            className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] p-10 border border-black/5 dark:border-white/5 transition-colors duration-300"
                        >
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Redeem Code</h3>
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest leading-relaxed mb-10">
                                Enter your voucher code to add duration to your current performance plan.
                            </p>

                            <form onSubmit={onActivate} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="GYM-XXXX-XXXX"
                                    className="w-full bg-zinc-100 dark:bg-black border border-black/10 dark:border-white/10 p-6 rounded-[2rem] text-center text-xl font-black tracking-[0.2em] uppercase focus:border-black dark:focus:border-white transition-all outline-none text-black dark:text-white"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <button className="w-full bg-black text-white dark:bg-white dark:text-black py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">
                                    Activate Plan
                                    <FiArrowRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                                </button>
                            </form>

                            {msg && (
                                <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    {msg}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDashboard