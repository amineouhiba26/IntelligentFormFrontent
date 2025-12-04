import { useState, useEffect } from "react"
import { getSubmissions, getSubmissionStats } from "../lib/api"
import { motion } from "framer-motion"

export function SubmissionsPage({ onBack }) {
  const [submissions, setSubmissions] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [subsData, statsData] = await Promise.all([
          getSubmissions(filter),
          getSubmissionStats()
        ])
        setSubmissions(subsData)
        setStats(statsData)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Impossible de charger les archives du Nexus.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [filter])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  const getMissionIcon = (mission) => {
    switch(mission) {
      case 'donation': return "💝";
      case 'volunteer': return "🤝";
      case 'contact': return "📬";
      case 'information': return "ℹ️";
      default: return "📄";
    }
  }

  const getMissionColor = (mission) => {
    switch(mission) {
      case 'donation': return "from-pink-500 to-rose-500";
      case 'volunteer': return "from-emerald-500 to-teal-500";
      case 'contact': return "from-blue-500 to-cyan-500";
      case 'information': return "from-violet-500 to-purple-500";
      default: return "from-gray-500 to-slate-500";
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
              Archives du Nexus
            </h1>
            <p className="text-gray-400 text-lg">Exploration des données reçues</p>
          </div>
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl transition-all duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl"
            >
              <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Reçu</h3>
              <p className="text-4xl font-bold text-white mt-2">{stats.total_submissions}</p>
            </motion.div>
            {Object.entries(stats.by_mission).map(([mission, count], index) => (
              <motion.div 
                key={mission}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl relative overflow-hidden group cursor-pointer"
                onClick={() => setFilter(filter === mission ? null : mission)}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${getMissionColor(mission)} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                  {getMissionIcon(mission)} {mission}
                </h3>
                <p className="text-4xl font-bold text-white mt-2">{count}</p>
                {filter === mission && (
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Submissions Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400 bg-red-900/20 rounded-2xl border border-red-900/50">
            {error}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {submissions.map((sub) => (
              <motion.div 
                key={sub._id}
                variants={item}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getMissionColor(sub.mission)} text-white shadow-lg`}>
                    {sub.mission.toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    {new Date(sub.submitted_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {sub.username || "Anonyme"}
                  </h3>
                  <p className="text-sm text-gray-400">{sub.values?.email || "No email"}</p>
                </div>

                <div className="space-y-2 mb-4">
                  {Object.entries(sub.values || {}).slice(0, 3).map(([key, value]) => (
                    key !== 'email' && key !== 'name' && key !== 'nom' && (
                      <div key={key} className="text-sm">
                        <span className="text-gray-500 capitalize">{key}: </span>
                        <span className="text-gray-300 truncate block">{String(value)}</span>
                      </div>
                    )
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-500 italic line-clamp-2">
                    "{sub.confirmation_message}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
