import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Label, Legend } from 'recharts';
import { Box, Paper, Typography, useTheme } from '@mui/material';

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
    { name: 'Total Expense', value: totalExpense },
    { name: 'Total Income', value: totalIncome },
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <Box display='flex' flexDirection='column' alignItems='center' p={2}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: 300, margin: '0 auto' }}>
        <PieChart width={300} height={300}>
          <Pie
            dataKey='value'
            isAnimationActive={true}
            data={chartData}
            cx='50%' // Center the pie chart horizontally
            cy='50%' // Center the pie chart vertically
            innerRadius={30}
            outerRadius={80}
            fill='#8884d8'
            label
            stroke='none'
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Label content={<CustomLabel value={0} />} position='center' />
          <Legend iconType='circle' layout='horizontal' verticalAlign='bottom' align='center' />
        </PieChart>
      </div>
    </Box>
  );
};

export default Chart;
