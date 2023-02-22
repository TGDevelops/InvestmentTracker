import React from 'react'
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts'
import { useSelector } from 'react-redux';

const PieChart = () => {
    const investmentData = useSelector((state) => state.investment);

    const data = Object.entries(investmentData).map(([key, investment], index) => ({
        name: investment.type,
        value: parseInt(investment.value)
    }));

    const option = {
        title: {
          text: 'Investment Visualization',
          subtext: 'Invests/Value',
          left: 'center'
        },
        legend: {
          orient: 'Horizontal',
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        series: [
          {
            name: 'Investment Chart',
            type: 'pie',
            radius: [50, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: data
          }
        ]
      };

  return (
    <div>
        <ReactECharts
            option={option}
            style={{ height: 300, width: 350 }}
            // opts={{ locale: 'FR' }}
        />
    </div>
  )
}

export default PieChart