import { classifyMission } from './api'

// Simple client-side mission detection based on keywords (fallback)
const MISSION_KEYWORDS = {
  make_donation: ['donate', 'donation', 'don', 'contribute', 'money', 'financial', 'give', 'support', 'fund', 'offrir'],
  join_volunteers: ['volunteer', 'bénévole', 'help', 'join', 'rejoindre', 'participate', 'assist', 'community service'],
  contact_us: ['contact', 'reach', 'speak', 'talk', 'email', 'call', 'message', 'établir'],
  request_information: ['information', 'info', 'learn', 'know', 'details', 'about', 'programs', 'demander'],
}

// Fallback client-side detection
function detectMissionClientSide(prompt) {
  const lowerPrompt = prompt.toLowerCase()
  let bestMatch = { mission: 'contact_us', score: 0 }
  
  // Score each mission based on keyword matches
  for (const [mission, keywords] of Object.entries(MISSION_KEYWORDS)) {
    let score = 0
    for (const keyword of keywords) {
      if (lowerPrompt.includes(keyword)) {
        score++
      }
    }
    
    if (score > bestMatch.score) {
      bestMatch = { mission, score }
    }
  }
  
  return {
    mission: bestMatch.mission,
    confidence: bestMatch.score > 0 ? 'high' : 'low',
  }
}

export async function detectMission(prompt) {
  try {
    // Try to use backend AI classification
    const result = await classifyMission(prompt, 'fr')
    
    // Map backend mission names to frontend names
    const missionMap = {
      'contact': 'contact_us',
      'donation': 'make_donation',
      'volunteer': 'join_volunteers',
      'information': 'request_information',
    }
    
    return {
      mission: missionMap[result.mission] || result.mission,
      confidence: result.confidence || 'high',
    }
  } catch (error) {
    console.warn('Backend API unavailable, using client-side detection:', error)
    // Fallback to client-side detection
    return detectMissionClientSide(prompt)
  }
}

