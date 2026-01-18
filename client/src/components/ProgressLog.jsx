import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FiPlus, FiActivity, FiArrowUpRight, FiTrendingUp } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import API_URL from '../api/config'

const ProgressLog = ({ userId, defaultType = 'weight' }) => {
  const [entries, setEntries] = useState([])
  const [type, setType] = useState(defaultType)
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('kg')
  const [notes, setNotes] = useState('')

  const fetchEntries = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const url = userId
        ? `${API_URL}/progress?type=${type}&userId=${userId}`
        : `${API_URL}/progress?type=${type}`
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEntries(res.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [type])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!value) return;
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const payload = { type, value: Number(value), unit, notes }
      await axios.post(`${API_URL}/progress`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setValue('')
      setNotes('')
      fetchEntries()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto min-h-[600px] flex flex-col lg:flex-row gap-10 bg-white dark:bg-black text-black dark:text-white p-4 md:p-8 transition-colors duration-300">

      {/* Left Column: Fixed Input Controller */}
      {!userId && (
        <div className="w-full lg:w-[450px] flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600 font-sans">Metric Input</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter italic text-black dark:text-white">Log <span className="text-zinc-200 dark:text-zinc-800">Data.</span></h2>
          </div>

          <form onSubmit={onSubmit} className="bg-zinc-50 dark:bg-zinc-900 rounded-[3.5rem] p-10 border border-black/5 dark:border-white/5 space-y-8 sticky top-8 transition-colors duration-300">
            {/* Custom Toggle Pills */}
            <div className="flex flex-wrap gap-2 p-1 bg-black/5 dark:bg-black rounded-full border border-black/5 dark:border-white/5">
              {['weight', 'squat', 'bench', 'deadlift'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${type === t ? 'bg-black dark:bg-white text-white dark:text-black shadow-xl' : 'text-zinc-500 dark:text-zinc-600 hover:text-black dark:hover:text-white'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-black border-b-2 border-zinc-200 dark:border-zinc-800 py-8 px-2 text-6xl font-black tracking-tighter focus:border-black dark:focus:border-white transition-all outline-none placeholder-zinc-300 dark:placeholder-zinc-800 text-black dark:text-white"
                />
                <div className="absolute top-0 right-0 flex flex-col items-end">
                  <input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="bg-transparent text-right font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 w-16 outline-none text-xs focus:text-black dark:focus:text-white"
                  />
                  <span className="text-[9px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-widest mt-1">Units</span>
                </div>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ADD SESSION NOTES..."
                className="w-full h-24 bg-zinc-100 dark:bg-zinc-800/30 border border-black/5 dark:border-white/5 p-6 rounded-[2rem] text-[10px] font-bold uppercase tracking-widest placeholder-zinc-400 dark:placeholder-zinc-700 focus:border-zinc-300 dark:focus:border-zinc-500 transition-all outline-none resize-none text-black dark:text-white"
              />
            </div>

            <button className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]">
              Commit to Log <FiPlus className="text-lg group-hover:rotate-90 transition-transform" />
            </button>
          </form>
        </div>
      )}

      {/* Right Column: Dynamic History */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between px-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-2">
            <FiTrendingUp className="text-zinc-300 dark:text-zinc-700" /> Recent performance history
          </h4>
          <span className="text-black dark:text-white opacity-10 text-4xl font-black select-none">*</span>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/30 rounded-[3.5rem] p-4 md:p-8 border border-black/5 dark:border-white/5 backdrop-blur-sm min-h-[500px]">
          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode='popLayout'>
              {entries.length === 0 ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-zinc-800">
                  <FiActivity size={60} className="mb-4 opacity-10" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting Data Input</p>
                </div>
              ) : (
                entries.map((e, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={e._id || idx}
                    className="group bg-zinc-100 dark:bg-zinc-900 hover:bg-black dark:hover:bg-white rounded-[2rem] p-6 flex items-center justify-between transition-all duration-500 cursor-default border border-black/5 dark:border-white/5 hover:border-transparent text-black dark:text-white hover:text-white dark:hover:text-black"
                  >
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 uppercase tracking-tighter">Day</span>
                        <span className="text-2xl font-black group-hover:text-white dark:group-hover:text-black">
                          {new Date(e.date).getDate()}
                        </span>
                      </div>

                      <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-800 dark:group-hover:bg-zinc-200"></div>

                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <h5 className="text-4xl font-black uppercase tracking-tighter group-hover:text-white dark:group-hover:text-black leading-none">
                            {e.value}
                          </h5>
                          <span className="text-[10px] font-black text-zinc-600 group-hover:text-zinc-400 uppercase">{e.unit || 'KG'}</span>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1 group-hover:text-zinc-500">
                          Logged: {e.type} • {new Date(e.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {e.notes && (
                        <div className="hidden xl:block max-w-[200px] text-right">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 line-clamp-2 italic">
                            "{e.notes}"
                          </p>
                        </div>
                      )}
                      {/* <div className="w-14 h-14 rounded-full border border-black/10 dark:border-white/10 group-hover:border-white/10 dark:group-hover:border-black/10 flex items-center justify-center group-hover:rotate-45 transition-all bg-black dark:bg-black text-white group-hover:bg-white dark:group-hover:bg-black group-hover:text-black dark:group-hover:text-white">
                        <FiArrowUpRight className="text-xl" />
                      </div> */}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressLog