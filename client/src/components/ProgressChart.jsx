import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../api/config'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ProgressChart = ({ userId, metric = 'weight', title = 'Progress', className = "" }) => {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token
        const url = userId
          ? `${API_URL}/progress?type=${metric}&userId=${userId}`
          : `${API_URL}/progress?type=${metric}`
        const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        const entries = res.data || []
        const labels = entries.map(e => new Date(e.date).toLocaleDateString())
        const values = entries.map(e => e.value)

        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        setChartData({
          labels,
          datasets: [
            {
              label: title,
              data: values,
              fill: false,
              borderColor: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)',
              backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              tension: 0.4
            }
          ]
        })
      } catch (err) {
        console.error('Error fetching progress:', err)
      }
    }

    fetchData()
  }, [metric, title])

  if (!chartData) return <div className="text-sm text-zinc-400">Loading chart...</div>

  return (
    <div className={`bg-zinc-50 dark:bg-zinc-900 p-6 rounded-[3rem] border border-black/5 dark:border-white/5 transition-colors duration-300 ${className}`}>
      <h4 className="text-sm font-black uppercase text-zinc-400 mb-4">{title}</h4>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  )
}

export default ProgressChart
