import React from 'react'
import { ArrowDownRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProgressChart from './ProgressChart'

const Mcard = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const getDaysRemaining = () => {
        if (!user || !user.membership || !user.membership.endDate) return 0;
        const now = new Date();
        const end = new Date(user.membership.endDate);
        const diffTime = end - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const daysRemaining = getDaysRemaining();
    const isExpired = daysRemaining <= 0;
    const isActive = user && user.membership && daysRemaining > 0;

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-7xl mx-auto bg-white dark:bg-black p-6 transition-colors duration-300">
            {isActive && (
                <div onClick={() => navigate('/dashboard')} className='flex flex-col gap-6 md:flex-row w-full' >
                    <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] p-10 md:p-16 border border-black/5 dark:border-white/5 relative overflow-hidden group transition-colors duration-300">
                        <div className="relative z-10">
                            <div className="flex archivo-black-regular justify-between items-start mb-8">
                                <div className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-black dark:text-white">
                                    {daysRemaining > 0 ? daysRemaining : '00'}
                                    <span className="text-xl md:text-2xl ml-2 font-bold uppercase tracking-widest text-red-500 block">Days Left</span>
                                </div>
                                <div className="text-black dark:text-white opacity-20 text-6xl font-black">*</div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
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
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Status</span>
                                    <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isExpired ? 'bg-red-500/10 text-red-500' : 'bg-black text-white dark:bg-white dark:text-black'}`}>
                                        {isExpired ? 'Inactive' : 'Active'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProgressChart metric="weight" title="Weight" className="flex-1" />
                </div>
            )}

            <button
                onClick={() => navigate('/dashboard')}
                className="group flex items-center gap-4 px-12 py-6 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 mb-10"
            >
                Check Your Dashboard
                <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center transition-transform group-hover:rotate-45">
                    <ArrowDownRight className="w-4 h-4" />
                </div>
            </button>
        </div>
    )
}

export default Mcard
