"use client"
import "@/assets/styles/main.scss"
import { Toaster } from 'react-hot-toast'
import { useAppStore } from "@/store/app.store";
import SideNav from "../components/navbar/SideNav";
import Topnav from "../components/navbar/topnav";
import { createTheme, MantineProvider } from '@mantine/core';
import { useEffect } from "react";
import useLogOut from "@/hook/useLogOut";



export default function RootDashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const appState = useAppStore((state) => state);
  const { logout } = useLogOut()

  const theme = createTheme({
    primaryColor: appState.colorScheme === 'dark' ? 'blue' : 'green',
  });

  const LogOutIfNotKeepLoggedIn = () => {
      setTimeout(() => {
          logout()
      }, 60000);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!appState.keepMeLoggedIn) {
        LogOutIfNotKeepLoggedIn();
      }
    }, 100);

    return () => clearTimeout(timer); 
  }, [appState.keepMeLoggedIn]);

  return (
    <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:ital@1&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </head>
      
      <body className={appState.colorScheme === 'dark' ? "dark" : ""}>
        <MantineProvider theme={theme}>
          <div className='w-full flex justify-center h-[100vh] items-center bg-white dark:bg-black'>
            <Toaster />
            <div className="w-full">
              <Topnav />

              <main className="flex flex-wrap h-[calc(100vh-80px)] lg:overflow-hidden bg-banddrive-300/10">
                <section
                  className={`w-[280px] z-20 h-full side-scroll-contain hide-scrollbar top-19 lg:left-0 fixed lg:relative bg-white dark:bg-black
                 ${appState.navToggle ? '-left-[300px]' : 'left-[0px]'}`}
                >
                  <SideNav />
                </section>

                <section className="lg:w-[calc(100%-280px)] bg-banddrivegray-100/50 h-full overflow-auto native-font rounded-lg w-full">
                  <section className="w-[96%] md:w-[94%] md:ml-[3%] ml-[2%]">
                    {children}
                  </section>
                </section>
              </main>
            </div>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
