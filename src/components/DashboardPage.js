import React from 'react'
import Header from './Header'
import PieChart from './visualizations/PieChart'

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <div className='dashboard'>
          <PieChart />
      </div>
    </div>
  )
}

export default DashboardPage