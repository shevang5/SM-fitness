import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../features/auth/authSlice'
import { getMembers, generateCode, resetAdmin } from '../features/admin/adminSlice'
import { motion, AnimatePresence } from 'framer-motion'
import API_URL from '../api/config'
import { FiUsers, FiClock, FiActivity, FiLogOut, FiPlusCircle, FiCopy, FiCheckCircle, FiX, FiHome, FiTrendingUp } from 'react-icons/fi'
import ProgressChart from '../components/ProgressChart'
import ProgressLog from '../components/ProgressLog'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { members, generatedResult, isLoading, isError, message } = useSelector((state) => state.admin)

    const [mode, setMode] = useState('IMMEDIATE')
    const [duration, setDuration] = useState(30)
    const [selectedUserId, setSelectedUserId] = useState('')
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' })
    const [editingUserId, setEditingUserId] = useState('')
    const [viewProgressUserId, setViewProgressUserId] = useState('')
    const [newEndDate, setNewEndDate] = useState('')
    const [addDays, setAddDays] = useState(0)

    // Stats calculation
    const activeMembers = members.filter(m => {
        if (!m.membership || !m.membership.endDate) return false;
        const end = new Date(m.membership.endDate);
        const now = new Date();
        return end > now;
    }).length;

    useEffect(() => {
        dispatch(getMembers())
    }, [dispatch])

    useEffect(() => {
        if (generatedResult && (mode === 'IMMEDIATE' || mode === 'REGISTER')) {
            dispatch(getMembers())
        }
    }, [generatedResult, mode, dispatch])

    const handleGenerate = () => {
        if (mode === 'REGISTER') {
            const token = user.token;
            import('axios').then(axios => {
                axios.default.post(`${API_URL}/auth/register`, registerData)
                    .then(res => {
                        dispatch(getMembers());
                        alert('Member Registered!');
                        setRegisterData({ name: '', email: '', password: '' });
                        setMode('IMMEDIATE');
                    })
                    .catch(err => alert(err.response?.data?.msg || 'Error'));
            });
            return;
        }
        const data = {
            type: mode,
            planDuration: duration,
            generatedBy: user.id
        }
        if (mode === 'IMMEDIATE') {
            data.userId = selectedUserId;
        }
        dispatch(generateCode(data));
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4 md:p-6 relative overflow-hidden font-sans transition-colors duration-300">
            {/* Dynamic BG */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent)] dark:bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] dark:from-gray-900 dark:via-black dark:to-black z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex  sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                    <div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none italic text-black dark:text-white">Admin Command Center</h1>
                        {/* <p className="text-gray-500 text-sm">Welcome back, {user.name}</p> */}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                        >
                            <FiHome /> <span className="text-xs sm:inline">Home</span>
                        </button>
                        <button
                            onClick={() => dispatch(logout())}
                            className="flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                        >
                            <FiLogOut /> <span className="text-xs sm:inline">Logout</span>
                        </button>
                    </div>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-2 md:gap-6 mb-8 md:mb-10">
                    <StatsCard title="Total Members" value={members.length} icon={<FiUsers />} color="blue" />
                    <StatsCard title="Active Members" value={activeMembers} icon={<FiActivity />} color="green" />
                    <StatsCard title="Pending Expired" value={members.length - activeMembers} icon={<FiClock />} color="orange" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* LEFT: Generator (4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900 p-4 md:p-6 rounded-2xl h-fit lg:sticky lg:top-6 border border-black/5 dark:border-white/5 transition-colors duration-300"
                    >
                        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2"><FiPlusCircle className="text-blue-400" /> Actions</h2>

                        {/* Tabs */}
                        <div className="flex bg-black/5 dark:bg-black/40 rounded-lg p-1 mb-4 md:mb-6">
                            {['IMMEDIATE', 'FLEXIBLE', 'REGISTER'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { setMode(t); dispatch(resetAdmin()); }}
                                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${mode === t ? 'bg-blue-600 shadow text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                                >
                                    {t === 'IMMEDIATE' ? 'Start' : t === 'FLEXIBLE' ? 'Voucher' : 'New User'}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4 md:space-y-5">
                            <AnimatePresence mode="wait">
                                {mode === 'REGISTER' ? (
                                    <motion.div
                                        key="register"
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                        className="space-y-3 md:space-y-4"
                                    >
                                        <input className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 rounded-lg outline-none focus:border-blue-500 transition-colors text-sm md:text-base" placeholder="Name" value={registerData.name} onChange={e => setRegisterData({ ...registerData, name: e.target.value })} />
                                        <input className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 rounded-lg outline-none focus:border-blue-500 transition-colors text-sm md:text-base" placeholder="Email" value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
                                        <input className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 rounded-lg outline-none focus:border-blue-500 transition-colors text-sm md:text-base" type="password" placeholder="Password" value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="gen"
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                        className="space-y-3 md:space-y-4"
                                    >
                                        <div>
                                            <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2 block">Duration (Days)</label>
                                            <input
                                                type="number"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 rounded-lg outline-none focus:border-blue-500 font-mono text-base md:text-lg"
                                            />
                                        </div>

                                        {mode === 'IMMEDIATE' && (
                                            <div>
                                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2 block">Select Member</label>
                                                <select
                                                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 rounded-lg outline-none focus:border-blue-500 text-sm md:text-base"
                                                    onChange={(e) => setSelectedUserId(e.target.value)}
                                                    value={selectedUserId}
                                                >
                                                    <option className='bg-white dark:bg-black' value="">-- Choose User --</option>
                                                    {members.map(m => {
                                                        const isActive = m.membership && m.membership.endDate && new Date(m.membership.endDate) > new Date();
                                                        return (
                                                            <option
                                                                className='bg-white dark:bg-black'
                                                                key={m._id}
                                                                value={m._id}
                                                                disabled={isActive}
                                                            >
                                                                {m.name} {isActive ? '(Active)' : ''}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={handleGenerate}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-3 rounded-lg text-white font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm md:text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : (mode === 'REGISTER' ? 'Create User' : (mode === 'IMMEDIATE' ? 'Activate Plan' : 'Generate Code'))}
                            </button>

                            {/* Result Display */}
                            <AnimatePresence>
                                {generatedResult && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-4 p-3 md:p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center overflow-hidden"
                                    >
                                        <p className="text-green-400 text-xs md:text-sm mb-2 flex items-center justify-center gap-2"><FiCheckCircle /> {generatedResult.msg}</p>
                                        {generatedResult.code && (
                                            <div className="flex items-center justify-between bg-black/40 p-2 md:p-3 rounded font-mono text-base md:text-xl text-yellow-500 cursor-pointer hover:bg-black/60 transition" onClick={() => navigator.clipboard.writeText(generatedResult.code.code)}>
                                                <span className="break-all">{generatedResult.code.code}</span>
                                                <FiCopy className="opacity-50 hover:opacity-100 ml-2 flex-shrink-0" />
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {isError && <p className="text-red-400 text-center text-xs md:text-sm">{message}</p>}
                        </div>
                    </motion.div>

                    {/* RIGHT: List (8 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-8 bg-zinc-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 p-4 md:p-6 rounded-2xl overflow-hidden transition-colors duration-300"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 md:mb-6">
                            <h2 className="text-lg md:text-xl font-bold">Member Database</h2>
                            <div className="text-xs text-gray-500">Sorted by Expiration</div>
                        </div>

                        <div className="overflow-x-auto -mx-4 md:mx-0">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-gray-500 border-b border-black/5 dark:border-white/5 text-xs uppercase tracking-wider">
                                                <th className="p-3 md:p-4 whitespace-nowrap">Member Info</th>
                                                <th className="p-3 md:p-4 whitespace-nowrap hidden sm:table-cell">Current Plan</th>
                                                <th className="p-3 md:p-4 whitespace-nowrap">Time Left</th>
                                                <th className="p-3 md:p-4 whitespace-nowrap">Progress</th>
                                                <th className="p-3 md:p-4 whitespace-nowrap">Status</th>
                                                <th className="p-3 md:p-4 whitespace-nowrap">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs md:text-sm">
                                            {members.map((m, idx) => {
                                                const days = m.membership && m.membership.endDate
                                                    ? Math.ceil((new Date(m.membership.endDate) - new Date()) / (1000 * 60 * 60 * 24))
                                                    : -999;

                                                const isExpiring = days > 0 && days <= 5;
                                                const isExpired = days <= 0;

                                                return (
                                                    <motion.tr
                                                        key={m._id}
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                                                        className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                                                    >
                                                        <td className="p-3 md:p-4">
                                                            <div className="font-bold text-black dark:text-white text-sm md:text-base">{m.name}</div>
                                                            <div className="text-gray-500 text-xs">{m.email}</div>
                                                            <div className="text-gray-400 text-xs sm:hidden mt-1">{m.membership?.planName || 'No Plan'}</div>
                                                        </td>
                                                        <td className="p-3 md:p-4 text-gray-400 hidden sm:table-cell">{m.membership?.planName || 'No Plan'}</td>
                                                        <td className={`p-3 md:p-4 font-bold text-base md:text-lg whitespace-nowrap ${isExpired ? 'text-gray-400 dark:text-gray-600' : isExpiring ? 'text-orange-500 dark:text-orange-400' : 'text-black dark:text-white'}`}>
                                                            {days === -999 ? 'N/A' : days} <span className="text-xs font-normal text-gray-500">days</span>
                                                        </td>
                                                        <td className="p-3 md:p-4">
                                                            <button
                                                                onClick={() => setViewProgressUserId(m._id)}
                                                                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                                                            >
                                                                <FiTrendingUp className="text-xs" /> View
                                                            </button>
                                                        </td>
                                                        <td className="p-3 md:p-4">
                                                            {days > 0 ? (
                                                                <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${isExpiring ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-green-500/20 text-green-500 border border-green-500/30'}`}>
                                                                    {isExpiring ? 'Expiring' : 'Active'}
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 md:px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 whitespace-nowrap">
                                                                    Expired
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="p-3 md:p-4">
                                                            <div className="flex items-center gap-2">
                                                                <button onClick={() => {
                                                                    const days = m.membership && m.membership.endDate
                                                                        ? Math.max(0, Math.ceil((new Date(m.membership.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
                                                                        : 0;
                                                                    setEditingUserId(m._id);
                                                                    setAddDays(days);
                                                                    setNewEndDate('');
                                                                }} className="text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 py-2 rounded">Edit</button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {members.length === 0 && <div className="p-10 text-center text-gray-500">No members found.</div>}
                        </div>
                    </motion.div>
                </div>

                {/* Fixed Side Drawer for Editing */}
                <AnimatePresence>
                    {editingUserId && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => { setEditingUserId(''); setNewEndDate(''); setAddDays(0); }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-white/10 z-50 p-6 md:p-8 shadow-2xl overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">Edit Membership</h2>
                                    <button
                                        onClick={() => { setEditingUserId(''); setNewEndDate(''); setAddDays(0); }}
                                        className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                                    >
                                        <FiX className="text-2xl" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest mb-1">Member</p>
                                        <p className="text-lg font-bold text-black dark:text-white">{members.find(m => m._id === editingUserId)?.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-500">{members.find(m => m._id === editingUserId)?.email}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2 block">Edit Membership Duration (Total Days from Today)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={addDays}
                                                    onChange={(e) => setAddDays(e.target.value)}
                                                    className="w-full bg-zinc-100 dark:bg-black border border-black/10 dark:border-white/10 p-4 rounded-xl outline-none focus:border-blue-500 transition-all font-mono text-xl text-black dark:text-white"
                                                    placeholder="0"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">TOTAL DAYS</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex flex-col gap-3">
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const token = user.token || JSON.parse(localStorage.getItem('user'))?.token;
                                                        const payload = {};

                                                        // Calculate new end date based on "Today + Total Days"
                                                        const targetEndDate = new Date();
                                                        targetEndDate.setDate(targetEndDate.getDate() + Number(addDays));
                                                        payload.endDate = targetEndDate.toISOString();

                                                        await axios.put(`${API_URL}/admin/members/${editingUserId}/membership`, payload, { headers: { Authorization: `Bearer ${token}` } });
                                                        setEditingUserId(''); setNewEndDate(''); setAddDays(0);
                                                        dispatch(getMembers());
                                                        alert('Membership updated');
                                                    } catch (err) {
                                                        alert(err.response?.data?.msg || 'Error updating membership');
                                                    }
                                                }}
                                                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-lg"
                                            >
                                                Save Updates
                                            </button>
                                            <button
                                                onClick={() => { setEditingUserId(''); setNewEndDate(''); setAddDays(0); }}
                                                className="w-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 py-4 rounded-xl font-bold transition-all text-gray-600 dark:text-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Progress Drawer */}
                <AnimatePresence>
                    {viewProgressUserId && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setViewProgressUserId('')}
                                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                            />

                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white dark:bg-black z-[70] p-6 md:p-12 shadow-2xl overflow-y-auto"
                            >
                                <div className="flex justify-between pt-24 items-center mb-12">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2 block">Performance Analytics</span>
                                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none italic text-black dark:text-white">
                                            {members.find(m => m._id === viewProgressUserId)?.name} <span className="text-zinc-200 dark:text-zinc-800">History.</span>
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setViewProgressUserId('')}
                                        className="w-16 h-16 flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all"
                                    >
                                        <FiX className="text-3xl" />
                                    </button>
                                </div>

                                <div className="space-y-12">
                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="bg-zinc-100 dark:bg-zinc-900/50  rounded-[3rem] border border-black/5 dark:border-white/5">
                                            <ProgressChart userId={viewProgressUserId} metric="weight" title="Weight Evolution" />
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[4rem]  ">
                                        <ProgressLog userId={viewProgressUserId} />
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

const StatsCard = ({ title, value, icon, color }) => {
    const colorClasses = {
        blue: "bg-blue-500/20 text-blue-400",
        green: "bg-green-500/20 text-green-400",
        orange: "bg-orange-500/20 text-orange-400"
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-zinc-50 dark:bg-zinc-900/50 p-3 md:p-6 rounded-xl flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2 md:gap-4 border border-black/5 dark:border-white/5 transition-colors duration-300"
        >
            <div className={`p-2 md:p-4 rounded-xl ${colorClasses[color]} text-xl md:text-2xl flex-shrink-0`}>
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-gray-500 dark:text-gray-400 text-[8px] md:text-sm uppercase tracking-wide truncate">{title}</p>
                <h3 className="text-base md:text-3xl font-bold text-black dark:text-white">{value}</h3>
            </div>
        </motion.div>
    )
}

export default AdminDashboard
