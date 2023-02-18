import { RadialBarChart, RadialBar, Legend } from 'recharts';

import React from 'react'
import { useSelector } from 'react-redux';

const RadialChart = () => {

    const investmentData = useSelector((state) => state.investment);

    const data = Object.entries(investmentData).map(([key, investment], index) => ({
        value: investment.value,
        type: investment.type,
    }));

    console.log(investmentData);
    console.log(data);

  return (
    <RadialBarChart width={400} height={400} cx={150} cy={150} innerRadius={50} outerRadius={120} barSize={20} data={data}>
      <RadialBar dataKey='value' cornerRadius={50} background={{ fill: '#eee' }} />
      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align='right' />
    </RadialBarChart>
  )
}

export default RadialChart;