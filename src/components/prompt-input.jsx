import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Card } from "./ui/card"

export function PromptInput({ onSubmit, isLoading = false }) {
  const [prompt, setPrompt] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      onSubmit(prompt.trim())
      setPrompt("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900 p-6 flex items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '0.5s'}}></div>
      
      <Card className="w-full max-w-2xl p-10 border-2 border-emerald-200/50 dark:border-emerald-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl relative z-10">
        <div className="space-y-8">
          {/* Heart Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-float">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              How Can We Help?
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              Tell us what you'd like to do in a few words
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I want to donate monthly, I want to volunteer on weekends, I need more information about your programs..."
              className="w-full px-6 py-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 min-h-32 resize-none text-lg transition-all duration-200"
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500 dark:hover:from-emerald-600 dark:hover:via-teal-600 dark:hover:to-cyan-600 text-white py-6 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing your request...
                </span>
              ) : (
                "Continue →"
              )}
            </Button>
          </form>

          <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
              💚 Based on your message, we'll guide you through the right mission for you.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
