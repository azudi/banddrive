import React from 'react'

interface Props {
  details: any
}

function DashboardCard(props: Props) {
  const { details } = props

  return (
    <div className="dashboard-card">
      <span>{details.icon}</span>
      <b >{details.title}</b>
      <h2>{details.totalCount}</h2>
    </div>
  )
}

export default DashboardCard
