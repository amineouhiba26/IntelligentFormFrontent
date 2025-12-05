import { useState } from "react"
import { LoadingPage } from "./components/loading-page"
import { PromptInput } from "./components/prompt-input"
import { DynamicForm } from "./components/dynamic-form"
import { ConfirmationPage } from "./components/confirmation-page"
import { FieldEditor } from "./components/field-editor"
import { SubmissionsPage } from "./components/submissions-page"
import { detectMission } from "./lib/detect-mission"
import missionsDataDefault from "./lib/missions-schema.json"
import { Button } from "./components/ui/button"
import { Settings, Database } from "lucide-react"

function App() {
  const [state, setState] = useState("prompt") // prompt | loading | form | confirmation | submissions
  const [selectedMission, setSelectedMission] = useState(null)
  const [formData, setFormData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [missionsData, setMissionsData] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("missionsData")
    return saved ? JSON.parse(saved) : missionsDataDefault
  })

  const handlePromptSubmit = async (prompt) => {
    setIsProcessing(true)
    setState("loading")

    try {
      const result = await detectMission(prompt)

      if (result.mission) {
        setSelectedMission(result.mission)
        // Simulate slight delay for better UX
        setTimeout(() => {
          setState("form")
          setIsProcessing(false)
        }, 800)
      } else {
        // Fallback error handling
        setIsProcessing(false)
        setState("prompt")
      }
    } catch (error) {
      console.error("Error detecting mission:", error)
      setIsProcessing(false)
      setState("prompt")
    }
  }

  const handleFormSubmit = async (data) => {
    setIsProcessing(true)
    setState("loading")

    try {
      // Import the submitForm function from api.js
      const { submitForm } = await import('./lib/api')
      
      // Map frontend mission names to backend format
      const missionMap = {
        'make_donation': 'donation',
        'join_volunteers': 'volunteer',
        'contact_us': 'contact',
        'request_information': 'information'
      }
      
      const backendMission = missionMap[selectedMission] || selectedMission
      
      // Extract username from form data if available
      const username = data.nom || data.name || data.prenom || null
      
      // Submit to backend API
      const result = await submitForm(
        backendMission,
        data,
        username,
        'fr'
      )
      
      console.log('✅ Form submitted successfully to backend:', result)
      
      // Store the result including the confirmation message from backend
      setFormData({
        ...data,
        confirmation_message: result.confirmation_message,
        year: result.year
      })
      
      setState("confirmation")
      setIsProcessing(false)
    } catch (error) {
      console.error('❌ Error submitting form:', error)
      
      // Fallback: still show confirmation even if API fails
      setFormData(data)
      setState("confirmation")
      setIsProcessing(false)
      
      // Show error to user
      alert('Formulaire soumis localement. Erreur de connexion au serveur: ' + error.message)
    }
  }

  const handleNewMission = () => {
    setState("prompt")
    setSelectedMission(null)
    setFormData(null)
  }

  const getMissionData = () => {
    if (!selectedMission) return null
    return missionsData[selectedMission]
  }

  const handleSaveFields = (newMissionsData) => {
    setMissionsData(newMissionsData)
    localStorage.setItem("missionsData", JSON.stringify(newMissionsData))
    setShowEditor(false)
    alert("Fields saved successfully!")
  }

  return (
    <main className="min-h-screen">
      {/* Settings Button - Always visible */}
      <div className="fixed top-6 right-6 z-40 flex gap-2">
        <Button
          onClick={() => setState("submissions")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl text-white font-semibold px-4 py-3 rounded-xl border-2 border-white/20 backdrop-blur-sm transition-all duration-200 transform hover:scale-105"
          title="View Archives"
        >
          <Database className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setShowEditor(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-2xl text-white font-semibold px-6 py-3 rounded-xl border-2 border-white/20 backdrop-blur-sm transition-all duration-200 transform hover:scale-105"
        >
          <Settings className="w-5 h-5 mr-2" />
          Edit Fields
        </Button>
      </div>

      {/* Field Editor Modal */}
      {showEditor && (
        <FieldEditor
          missions={missionsData}
          onSave={handleSaveFields}
          onClose={() => setShowEditor(false)}
        />
      )}
      {state === "loading" && <LoadingPage />}

      {state === "prompt" && <PromptInput onSubmit={handlePromptSubmit} isLoading={isProcessing} />}
      
      {state === "submissions" && <SubmissionsPage onBack={handleNewMission} />}

      {state === "form" && selectedMission && (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900 p-6 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <button 
              onClick={handleNewMission} 
              className="mb-8 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-emerald-700 dark:text-emerald-300 hover:bg-white dark:hover:bg-gray-800 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 border-2 border-emerald-200 dark:border-emerald-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Start
            </button>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border-2 border-emerald-200/50 dark:border-emerald-700/50">
              {/* Icon based on mission */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    {selectedMission === 'make_donation' && (
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    )}
                    {selectedMission === 'join_volunteers' && (
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    )}
                    {selectedMission === 'contact_us' && (
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    )}
                    {selectedMission === 'request_information' && (
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    )}
                  </svg>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                {getMissionData()?.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-center text-lg mb-10">{getMissionData()?.description}</p>
              <DynamicForm
                fields={getMissionData()?.fields || {}}
                onSubmit={handleFormSubmit}
                isLoading={isProcessing}
              />
            </div>
          </div>
        </div>
      )}

      {state === "confirmation" && selectedMission && formData && (
        <ConfirmationPage
          missionTitle={getMissionData()?.title || ""}
          confirmationMessage={getMissionData()?.confirmation || ""}
          formData={formData}
          onNewMission={handleNewMission}
        />
      )}
    </main>
  )
}

export default App
