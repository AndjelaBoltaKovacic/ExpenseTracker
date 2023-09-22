import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { Box, useTheme } from '@mui/material';

interface ChartProps {
  totalIncome: number;
  totalExpense: number;
}

const CustomLabel: React.FC<{ value: number }> = ({ value }) => (
  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
    ${value}
  </text>
);

const Chart: React.FC<ChartProps> = ({ totalIncome, totalExpense }) => {
  const theme = useTheme();

  const chartData = [
    { name: `Total Expense: ${totalExpense.toFixed(2)}`, value: totalExpense },
    { name: `Total Income: ${totalIncome.toFixed(2)}`, value: totalIncome },
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: 300, margin: '0 auto' }}>
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={90}
            fill="#8884d8"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend iconType="circle" layout="vertical" verticalAlign="bottom" align="center" />
        </PieChart>
      </div>
    </Box>
  );
};

export default Chart;
