import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import BriefcaseIcon from '../svg-icon/BriefcaseIcon'
import HomeIcon from '../svg-icon/HomeIcon'
import UserIcon from '../svg-icon/UserIcon'
import GaurantorIcon from '../svg-icon/GaurantorIcon'
import LoanIcon from '../svg-icon/LoanIcon'
import DecisionIcon from '../svg-icon/DecisionIcon'
import SavingsIcon from '../svg-icon/SavingsIcon'
import LoanRequesticon from '../svg-icon/LoanRequesticon'
import WhitelistIcon from '../svg-icon/WhitelistIcon'
import UserICrossIcon from '../svg-icon/UserICrossIcon'
import PrefrenceIcon from '../svg-icon/PrefrenceIcon'
import FeesAndPricingIcon from '../svg-icon/FeesAndPricingIcon'
import AuditLogsIcon from '../svg-icon/AuditLogsIcon'
import SystemManagementIcon from '../svg-icon/SystemManagementIcon'
import SavingFeeIcon from '../svg-icon/SavingFeeIcon'
import FeesChargesIcon from '../svg-icon/FeesChargesIcon'
import TransactionIcon from '../svg-icon/TransactionIcon'
import ServicesIcon from '../svg-icon/ServicesIcon'
import ServiceAccount from '../svg-icon/ServiceAccount'
import SettlementsIcon from '../svg-icon/SettlementsIcon'
import ReportsIcon from '../svg-icon/ReportsIcon'
import { Avatar } from '@mantine/core';
import React from 'react'
import SearchInput from '@/components/shared/search-input/SearchInput'
import { useInfoGetter } from '@/hook/getters/userInfoGetter'

const SideNav = () => {
  const [iconWidth] = useState(16)
  const [route, setRoute] = useState('Users')
  const { user } = useInfoGetter();


  const routes = {
    customers: [
      { name: 'Users', route: '/users', Element: <UserIcon width={iconWidth} /> },
      { name: 'Gaurantor', route: '/gaurantor', Element: <GaurantorIcon width={iconWidth} /> },
      { name: 'Loan', route: '/loan', Element: <LoanIcon width={iconWidth} /> },
      { name: 'Decision Models', route: '/Decision-Models', Element: <DecisionIcon width={iconWidth} /> },
      { name: 'Savings', route: '/savings', Element: <SavingsIcon width={iconWidth} /> },
      { name: 'Loan-request', route: '/loan-request', Element: <LoanRequesticon width={iconWidth} /> },
      { name: 'Whitelist', route: '/whitelist', Element: <WhitelistIcon width={iconWidth} /> },
      { name: 'Karmar', route: '/karmar', Element: <UserICrossIcon width={iconWidth} /> },
    ],
    setting: [
      { name: 'Preferences', route: '/Preferences', Element: <PrefrenceIcon width={iconWidth} /> },
      { name: 'Fees and Pricing', route: '/Fees-and-Pricing', Element: <FeesAndPricingIcon width={iconWidth} /> },
      { name: 'Audit Logs', route: '/Audit-Logs', Element: <AuditLogsIcon width={iconWidth} /> },
      { name: 'Systems Messages', route: '/Systems-Messages', Element: <SystemManagementIcon width={iconWidth} /> },
    ],
    business: [
      { name: 'Organization', route: '/organization', Element: <BriefcaseIcon width={iconWidth} /> },
      { name: 'Loan Products', route: '/loan-Products', Element: <LoanRequesticon width={iconWidth} /> },
      { name: 'Savings Products', route: '/Savings-Products', Element: <SavingFeeIcon width={iconWidth} /> },
      { name: 'Fees and Charges', route: '/Fees-and-Charges', Element: <FeesChargesIcon width={iconWidth} /> },
      { name: 'Transactions', route: '/Transactions', Element: <TransactionIcon width={iconWidth} /> },
      { name: 'Services', route: '/Services', Element: <ServicesIcon width={iconWidth} /> },
      { name: 'Service Account', route: '/Service-Account', Element: <ServiceAccount width={iconWidth} /> },
      { name: 'Settlements', route: '/Settlements', Element: <SettlementsIcon width={iconWidth} /> },
      { name: 'Reports', route: '/reports', Element: <ReportsIcon width={iconWidth} /> },
    ]
  }

  useEffect(() => {
    const pallet = document.querySelectorAll('.nav-scroll-item')
    let start = 0
    const childTranslateNav = setInterval(() => {
      ; (pallet[start] as HTMLElement).style.cssText = 'opacity:0.4;left:0'
      start++
      if (start >= pallet.length) {
        clearInterval(childTranslateNav)
      }
    }, 200)
  }, [])

  const AvtrName = React.useMemo(() => {
    return user?.displayName
      .split(' ')                           // Split by space
      .filter((word: string) => word.length > 0)      // Remove extra spaces
      .map((word: string) => word[0].toUpperCase())   // Take first letter, capitalize
      .join('').toUpperCase();
  }, [user])


  const renderNavItems = (items: any[]) => {
    return items.map((item) => (
      <div
        // href={item.route}
        key={item.name}
        className={`nav-scroll-item text-app_base flex items-center py-3 pl-8 cursor-pointer opacity-60 ${route === item.name ? 'nav-border-start' : ''}`}
        onClick={() => setRoute(item.name)}
      >
        {item.Element}
        <span className="ml-2">{item.name}</span>
      </div>
    ))
  }

  return (
    <div className="w-full side-nav-container">


      <div className='lg:hidden text-app_base flex items-center py-3 pl-2 flex-wrap'>
        <span className="inline-flex text-app_base mr-1 capitalize font-normal mb-2 text-black dark:text-white">
          <span className='-mt-2 mr-2'><Avatar color="cyan" radius="xl">{AvtrName}</Avatar></span>
          {user?.displayName}
        </span>
        <div className="w-11/12 p-0">
          <SearchInput placeholder={'searh dashboard'} />
        </div>
      </div>
      <hr />

      <div className="flex items-center py-6 pl-8 text-app_base">
        <BriefcaseIcon width="15" />
        <span className="mx-2">Switch Organization</span>
        <i className="inline-block mt-[1px]">
          <IoIosArrowDown width="13px" color="gray" />
        </i>
      </div>

      <div className="text-app_base nav-scroll-item flex items-center py-3 pl-8 opacity-60">
        <HomeIcon width="15" />
        <span className="ml-2">Dashboard</span>
      </div>

      <div className="mt-4">
        <h2 className="pl-8 text-app_base">CUSTOMERS</h2>
        {renderNavItems(routes.customers)}
      </div>

      <div className="mt-4">
        <h2 className="pl-8 text-app_base">BUSINESSES</h2>
        {renderNavItems(routes.business)}
      </div>

      <div className="mt-4">
        <h2 className="pl-8 text-app_base">SETTINGS</h2>
        {renderNavItems(routes.setting)}
      </div>
    </div>
  )
}

export default SideNav