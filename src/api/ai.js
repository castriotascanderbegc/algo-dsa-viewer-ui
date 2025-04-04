import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000"; // Python FastAPI service

// Basic explanation of code (markdown)
export const getBasicExplanation = async (code, user_question) => {
    const response = await axios.post(`${BASE_URL}/explain-code`, {
        code,
        user_question,
    });
    return response.data.explanation; // Markdown explanation
};


// Detailed explanation of code step-by-step (structured output)
export const getStructuredExplanation = async (code, user_question) => {
    const response = await axios.post(`${BASE_URL}/structured-explain-code`, {
        code,
        user_question,
    });
    return response.data; // Structured Output
};