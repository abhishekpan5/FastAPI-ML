import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  useTheme,
  alpha,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { UserInput } from '../types';
import { api } from '../services/api';

// Modern color palette
const COLORS = {
  primary: '#2563EB', // Modern blue
  secondary: '#7C3AED', // Modern purple
  success: '#059669', // Modern green
  error: '#DC2626', // Modern red
  background: '#F8FAFC', // Light gray background
  card: '#FFFFFF',
  text: '#1E293B', // Dark slate
  border: '#E2E8F0', // Light gray border
  hover: '#F1F5F9', // Hover state
  switch: {
    checked: '#2563EB',
    unchecked: '#CBD5E1',
  },
};

const occupations = [
  'retired',
  'freelancer',
  'student',
  'government_job',
  'business_owner',
  'unemployed',
  'private_job',
] as const;

const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Patna',
  'Vadodara',
  'Ghaziabad',
  'Ludhiana',
] as const;

type FormData = {
  age: string;
  weight: string;
  height: string;
  income_lpa: string;
  smoker: boolean;
  city: typeof cities[number];
  occupation: typeof occupations[number];
};

export const PredictionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    weight: '',
    height: '',
    income_lpa: '',
    smoker: false,
    city: 'Mumbai',
    occupation: 'private_job',
  });

  const [prediction, setPrediction] = useState<{
    category: string;
    confidence: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form data
    const validatedData: UserInput = {
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      income_lpa: Number(formData.income_lpa),
      smoker: formData.smoker,
      city: formData.city,
      occupation: formData.occupation,
    };

    // Validate numeric fields
    if (isNaN(validatedData.age) || validatedData.age <= 0 || validatedData.age > 120) {
      setError('Please enter a valid age between 1 and 120');
      return;
    }
    if (isNaN(validatedData.weight) || validatedData.weight <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    if (isNaN(validatedData.height) || validatedData.height <= 0 || validatedData.height > 2.5) {
      setError('Please enter a valid height between 0 and 2.5 meters');
      return;
    }
    if (isNaN(validatedData.income_lpa) || validatedData.income_lpa < 0) {
      setError('Please enter a valid income');
      return;
    }

    try {
      const response = await api.predictPremium(validatedData);
      if (response && response.predicted_category && typeof response.confidence === 'number') {
        setPrediction({
          category: response.predicted_category,
          confidence: response.confidence,
        });
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to get prediction. Please try again.');
    }
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: COLORS.background,
      minHeight: '100vh',
    }}>
      <Card sx={{ 
        maxWidth: 1200, 
        mx: 'auto',
        backgroundColor: COLORS.card,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: 2,
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: COLORS.text,
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Insurance Premium Prediction
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
              gap: 3 
            }}>
              <Box>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange('age')}
                  required
                  inputProps={{ min: 1, max: 120 }}
                  error={error?.includes('age')}
                  helperText={error?.includes('age') ? error : ''}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: COLORS.primary,
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange('weight')}
                  required
                  inputProps={{ min: 1 }}
                  error={error?.includes('weight')}
                  helperText={error?.includes('weight') ? error : ''}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: COLORS.primary,
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Height (m)"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange('height')}
                  required
                  inputProps={{ min: 0.1, max: 2.5, step: 0.01 }}
                  error={error?.includes('height')}
                  helperText={error?.includes('height') ? error : ''}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: COLORS.primary,
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Annual Income (LPA)"
                  type="number"
                  value={formData.income_lpa}
                  onChange={handleInputChange('income_lpa')}
                  required
                  inputProps={{ min: 0 }}
                  error={error?.includes('income')}
                  helperText={error?.includes('income') ? error : ''}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: COLORS.primary,
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <FormControl fullWidth required>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    label="City"
                    onChange={handleSelectChange}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: COLORS.border,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: COLORS.primary,
                      },
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth required>
                  <InputLabel>Occupation</InputLabel>
                  <Select
                    name="occupation"
                    value={formData.occupation}
                    label="Occupation"
                    onChange={handleSelectChange}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: COLORS.border,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: COLORS.primary,
                      },
                    }}
                  >
                    {occupations.map((occupation) => (
                      <MenuItem key={occupation} value={occupation}>
                        {occupation.replace('_', ' ').toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.smoker}
                      onChange={handleInputChange('smoker')}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: COLORS.switch.checked,
                          '& + .MuiSwitch-track': {
                            backgroundColor: COLORS.switch.checked,
                          },
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: COLORS.switch.unchecked,
                        },
                      }}
                    />
                  }
                  label="Smoker"
                  sx={{ color: COLORS.text }}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: alpha(COLORS.primary, 0.9),
                    },
                  }}
                >
                  Predict Premium
                </Button>
              </Box>
            </Box>
          </Box>

          {error && !error.includes('Please enter') && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 3,
                backgroundColor: alpha(COLORS.error, 0.1),
                color: COLORS.error,
                '& .MuiAlert-icon': {
                  color: COLORS.error,
                },
              }}
            >
              {error}
            </Alert>
          )}

          {prediction && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 3,
                backgroundColor: alpha(COLORS.success, 0.1),
                color: COLORS.success,
                '& .MuiAlert-icon': {
                  color: COLORS.success,
                },
              }}
            >
              <Typography variant="h6" sx={{ color: COLORS.success, mb: 1 }}>
                Prediction Result
              </Typography>
              <Box sx={{ color: COLORS.text }}>
                <Typography sx={{ mb: 1 }}>
                  <strong>Category:</strong> {prediction.category}
                </Typography>
                <Typography>
                  <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%
                </Typography>
              </Box>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}; 