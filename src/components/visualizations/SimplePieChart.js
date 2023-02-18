import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import React from 'react'
import { useSelector } from 'react-redux';

const SimplePieChart = () => {

    const investmentData = useSelector((state) => state.investment);

    const data = Object.entries(investmentData).map(([key, investment], index) => ({
        name: investment.type,
        value: parseInt(investment.value)
    }));

    console.log(data);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
  )
}

export default SimplePieChart;