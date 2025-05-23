"use client"
import React from 'react'
import { useState } from 'react'
import DashboardCard from './DashboardCard'
import ActiveUsers from '../svg-icon/ActiveUsers'
import UsersIcon from '../svg-icon/UsersIcon'
import UserWithLoan from '../svg-icon/UserWithLoan'
import UserWithSavings from '../svg-icon/UserWithSavings'


function DashboardCardContainer() {
  //Variables
  const [size] = useState(40)
  const [tabs] = useState([
    {
      title: 'users',
      totalCount: '2,453',
      icon: <ActiveUsers width={size} />,
    },
    {
      title: 'active users',
      totalCount: '1,356',
      icon: <UsersIcon width={size} />,
    },
    {
      title: 'Active Sessions',
      totalCount: '12,453',
      icon: <UserWithLoan width={size} />,
    },
    {
      title: 'Sales Revenue',
      totalCount: 'N 102,523',
      icon: <UserWithSavings width={size} />,
    },
  ])



  return (
    <div className="flex flex-wrap w-full justify-around lg:justify-between mb-5">
      {tabs.map((tab) => {
        return (
          <div
            key={tab.title}
            className="card-pallet xl:w-[calc(25%-0.5em)]  md:w-[calc(50%-1em)] w-[calc(50%-0.5em)] bg-transparent  shadow-md rounded-xl my-2"
          >
            <DashboardCard details={tab} />
          </div>
        )
      })}
    </div>
  )
}

export default DashboardCardContainer
