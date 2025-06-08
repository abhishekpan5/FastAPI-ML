export interface UserInput {
  age: number;
  weight: number;
  height: number;
  income_lpa: number;
  smoker: boolean;
  city: string;
  occupation: 'retired' | 'freelancer' | 'student' | 'government_job' | 'business_owner' | 'unemployed' | 'private_job';
}

export interface PredictionResponse {
  predicted_category: string;
  confidence: number;
  class_probabilities: Record<string, number>;
}

export interface DashboardStats {
  totalPredictions: number;
  averageConfidence: number;
  mostCommonCategory: string;
  predictionsByCategory: Record<string, number>;
} 