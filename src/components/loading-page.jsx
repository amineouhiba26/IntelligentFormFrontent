import { useEffect, useState } from "react"

export function LoadingPage() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900 gap-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="flex flex-col items-center gap-6 relative z-10">
        {/* Animated heart loader */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-8 border-emerald-200 dark:border-emerald-800 border-t-emerald-600 dark:border-t-emerald-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-rose-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Connecting Hearts{dots}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">Preparing your mission</p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-3 relative z-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 rounded-full shadow-lg"
            style={{
              animation: `pulse 1.4s infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
