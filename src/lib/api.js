// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://formulaire-intelligent-1.onrender.com/api';

/**
 * Classify mission from user prompt using AI
 */
export async function classifyMission(prompt, language = 'fr') {
  try {
    const response = await fetch(`${API_BASE_URL}/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, language }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error classifying mission:', error);
    throw error;
  }
}

/**
 * Generate dynamic form fields for a mission
 */
export async function generateFormFields(mission, language = 'fr') {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mission, language }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating form fields:', error);
    throw error;
  }
}

/**
 * Submit form data
 */
export async function submitForm(mission, values, username = null, language = 'fr') {
  try {
    const response = await fetch(`${API_BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mission, values, username, language }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}

/**
 * Get submission statistics
 */
export async function getSubmissionStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/submissions/stats`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching submission stats:', error);
    throw error;
  }
}

/**
 * Get all submissions with optional filters
 */
export async function getSubmissions(mission = null, limit = 50, skip = 0) {
  try {
    const params = new URLSearchParams();
    if (mission) params.append('mission', mission);
    params.append('limit', limit.toString());
    params.append('skip', skip.toString());

    const response = await fetch(`${API_BASE_URL}/submissions?${params}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
}

/**
 * Health check
 */
export async function healthCheck() {
  try {
    const response = await fetch(API_BASE_URL.replace('/api', '/health'));

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
}
