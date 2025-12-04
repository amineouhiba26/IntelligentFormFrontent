import { Button } from "./ui/button"
import { Card } from "./ui/card"

export function ConfirmationPage({ missionTitle, confirmationMessage, formData, onNewMission }) {
  const currentYear = new Date().getFullYear()

  const processedMessage = confirmationMessage
    .replace("[name]", formData.name || "Friend")
    .replace("[email]", formData.email || "")
    .replace("[year]", currentYear.toString())
    .replace("[amount]", formData.amount || "")
    .replace("[frequency]", formData.frequency || "")
    .replace("[topic]", formData.topic || "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900 p-6 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      
      <Card className="w-full max-w-lg p-10 border-2 border-emerald-200/50 dark:border-emerald-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl relative z-10">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl animate-float">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Confetti effect */}
              <div className="absolute -top-2 -right-2 text-4xl animate-bounce">🎉</div>
              <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Success!
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">{missionTitle}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 border-2 border-emerald-200 dark:border-emerald-700 shadow-inner">
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed text-lg">{processedMessage}</p>
          </div>

          <div className="pt-4 space-y-4">
            <Button
              onClick={onNewMission}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500 dark:hover:from-emerald-600 dark:hover:via-teal-600 dark:hover:to-cyan-600 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Start Another Mission 🚀
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
