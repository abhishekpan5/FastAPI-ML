import axios from 'axios';
import type { UserInput, PredictionResponse, DashboardStats } from '../types';

const API_URL = 'http://localhost:8002';

export const api = {
  predictPremium: async (data: UserInput): Promise<PredictionResponse> => {
    const response = await axios.post(`${API_URL}/predict`, data);
    return response.data.response;
  },

  getHealth: async (): Promise<{ status: string }> => {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  },
}; 