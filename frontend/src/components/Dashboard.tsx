import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import InsuranceIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Modern color palette
const COLORS = {
  primary: '#2196F3',
  secondary: '#00BCD4',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#333333',
  chart: ['#2196F3', '#00BCD4', '#4CAF50', '#FFC107', '#F44336'],
};

// Mock data for demonstration
const mockData = {
  totalPredictions: 150,
  averageConfidence: 0.85,
  mostCommonCategory: 'Standard',
  predictionsByCategory: [
    { name: 'Basic', value: 45 },
    { name: 'Standard', value: 65 },
    { name: 'Premium', value: 30 },
    { name: 'Elite', value: 10 },
  ],
  recentPredictions: [
    { id: 1, age: 35, bmi: 28.5, category: 'Standard', confidence: 0.92, timestamp: '2024-03-20 14:30' },
    { id: 2, age: 42, bmi: 24.8, category: 'Premium', confidence: 0.88, timestamp: '2024-03-20 14:25' },
    { id: 3, age: 29, bmi: 22.3, category: 'Basic', confidence: 0.95, timestamp: '2024-03-20 14:20' },
    { id: 4, age: 38, bmi: 26.1, category: 'Standard', confidence: 0.89, timestamp: '2024-03-20 14:15' },
    { id: 5, age: 45, bmi: 30.2, category: 'Elite', confidence: 0.91, timestamp: '2024-03-20 14:10' },
  ],
  confidenceTrend: [
    { date: '2024-03-14', confidence: 0.82 },
    { date: '2024-03-15', confidence: 0.85 },
    { date: '2024-03-16', confidence: 0.83 },
    { date: '2024-03-17', confidence: 0.87 },
    { date: '2024-03-18', confidence: 0.89 },
    { date: '2024-03-19', confidence: 0.91 },
    { date: '2024-03-20', confidence: 0.92 },
  ],
};

export const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: COLORS.background,
      minHeight: '100vh',
    }}>
      {/* Header with Logo and Title */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4,
        backgroundColor: COLORS.card,
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}>
        <Avatar sx={{ 
          bgcolor: COLORS.primary, 
          width: 56, 
          height: 56,
          mr: 2,
        }}>
          <InsuranceIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="h4" sx={{ color: COLORS.text }}>
          Insurance Premium Analytics
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        },
        gap: 3,
        mb: 4
      }}>
        <Card sx={{ 
          height: '100%',
          backgroundColor: COLORS.card,
          boxShadow: 2,
          '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' },
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: COLORS.primary, mr: 2 }}>
                <TrendingUpIcon />
              </Avatar>
              <Typography color="textSecondary" variant="h6">
                Total Predictions
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: COLORS.primary }}>
              {mockData.totalPredictions}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ 
          height: '100%',
          backgroundColor: COLORS.card,
          boxShadow: 2,
          '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' },
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: COLORS.success, mr: 2 }}>
                <CheckCircleIcon />
              </Avatar>
              <Typography color="textSecondary" variant="h6">
                Average Confidence
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: COLORS.success }}>
              {(mockData.averageConfidence * 100).toFixed(1)}%
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ 
          height: '100%',
          backgroundColor: COLORS.card,
          boxShadow: 2,
          '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' },
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: COLORS.secondary, mr: 2 }}>
                <CategoryIcon />
              </Avatar>
              <Typography color="textSecondary" variant="h6">
                Most Common
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: COLORS.secondary }}>
              {mockData.mostCommonCategory}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ 
          height: '100%',
          backgroundColor: COLORS.card,
          boxShadow: 2,
          '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s' },
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: COLORS.warning, mr: 2 }}>
                <InsuranceIcon />
              </Avatar>
              <Typography color="textSecondary" variant="h6">
                Success Rate
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ color: COLORS.warning }}>
              98.5%
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Charts Section */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '2fr 1fr'
        },
        gap: 3,
        mb: 4
      }}>
        <Card sx={{ 
          height: '100%',
          backgroundColor: COLORS.card,
          boxShadow: 2,
        }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Predictions by Category
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.predictionsByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ 
          height: '100%',
          backgroundColor: COLORS.card,
          boxShadow: 2,
        }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Category Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.predictionsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {mockData.predictionsByCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS.chart[index % COLORS.chart.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Confidence Trend Chart */}
      <Card sx={{ 
        mb: 4,
        backgroundColor: COLORS.card,
        boxShadow: 2,
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Confidence Trend
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.confidenceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0.8, 1]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke={COLORS.success} 
                  strokeWidth={2}
                  dot={{ fill: COLORS.success }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Predictions Table */}
      <Card sx={{ 
        backgroundColor: COLORS.card,
        boxShadow: 2,
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Predictions
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>BMI</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Confidence</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData.recentPredictions.map((prediction) => (
                  <TableRow key={prediction.id}>
                    <TableCell>{prediction.id}</TableCell>
                    <TableCell>{prediction.age}</TableCell>
                    <TableCell>{prediction.bmi}</TableCell>
                    <TableCell>{prediction.category}</TableCell>
                    <TableCell>{(prediction.confidence * 100).toFixed(1)}%</TableCell>
                    <TableCell>{prediction.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}; 