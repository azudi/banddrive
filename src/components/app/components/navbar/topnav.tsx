"use client"
import React, { useMemo } from 'react'
// import { Switch } from '@mantine/core';
import { FaCircleChevronDown } from "react-icons/fa6";
import { RiLogoutCircleLine } from 'react-icons/ri'
import { Avatar, Menu } from '@mantine/core';
import { useAppStore } from '@/store/app.store'
import SearchInput from '@/components/shared/search-input/SearchInput'
import useLogOut from '@/hook/useLogOut'
import { colors } from '@/app-config'
// import Modeicon from '@/assets/icons/modeIcon';
import { Burger } from '@mantine/core';
import styles from "./nav.module.scss"
import { useInfoGetter } from '@/hook/getters/userInfoGetter';


function Topnav() {
  const appState = useAppStore((state) => state);
  const { user } = useInfoGetter();
  const { logout } = useLogOut()


  const toggleSideBar = () => {
    appState.setNavToggle(!appState.navToggle);
  };

  const AvtrName = useMemo(() => {
    return user?.displayName
      .split(' ')                           // Split by space
      .filter((word: string) => word.length > 0)      // Remove extra spaces
      .map((word: string) => word[0].toUpperCase())   // Take first letter, capitalize
      .join('').toUpperCase();
  }, [user])

  //Custom Hook

  return (
    <nav className="nav-container h-20">
      <div className="w-6/12 lg:w-3/12">
        {/* <img alt="" src={GroupLogo} className="w-[120px]"></img> */}
        <b className='about_header'>BANDdrive</b>
      </div>
      <div className="w-6/12 lg:inline-block lg:w-3/12 hidden p-0">
        <SearchInput placeholder={'searh dashboard'} />
      </div>
      <div className="w-6/12 lg:w-6/12 flex items-center justify-end lg:mr-5">
        <div className="inline-flex mx-3 items-center">
          <div
            className="cursor-pointer inline-block lg:hidden"
          >
            <span className={styles['nav_btn_wrapper']}>
              <Burger size={'sm'} color={colors.brand['navy-700']} opened={!appState.navToggle} onClick={toggleSideBar} aria-label="Toggle navigation" />
            </span>
          </div>
          <Menu shadow="md" width={250}>
            <Menu.Target>
              <span className="inline-flex item-center cursor-pointer">
                <span className='-mt-2 mr-2 hidden sm:inline'><Avatar color="cyan" radius="xl">{AvtrName}</Avatar></span>
                <span className="hidden sm:inline text-app_base mr-1 capitalize font-normal text-black dark:text-white">
                  {user?.displayName}
                </span>
                <span className="sm:mt-1 ml-2 lg:mt-[2px]">
                  <FaCircleChevronDown size={20} color={appState.colorScheme == 'dark' ? colors.brand['white'] : colors.brand['black']} />
                </span>
              </span>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Divider />
              <Menu.Item leftSection={<RiLogoutCircleLine />}>
                <button onClick={() => logout()}>Sign Out</button>
              </Menu.Item>
              <Menu.Divider />
              {/* <Menu.Item onClick={(e) => appState.toggleColorScheme(appState.colorScheme == 'light' ? 'dark' : 'light')} leftSection={<Modeicon />}>
                <div className='flex items-center justify-between'>
                  <span>Mode</span>
                  <Switch
                    defaultChecked={appState.colorScheme == 'light'}
                    label=""
                    color={colors.brand['primary-teal']}
                  />
                </div>
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </nav>
  )
}

export default Topnav
