import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export type userInterface = {
  displayName: string;
  email: string;
  uid: string;
}

type AppState = {
  isLoggedIn: boolean;
  setIsloggedIn: (val: boolean) => void;
  user: userInterface;
  setUser: (val: userInterface) => void;
  navToggle: boolean,
  setNavToggle: (val: boolean) => void;
  colorScheme: 'light' | 'dark';
  toggleColorScheme: (val: 'dark' | 'light') => void;
  keepMeLoggedIn: boolean;
  setKeepMeLoggedIn: (val: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: {
        displayName: '',
        email: '',
        uid: ''
      },
      keepMeLoggedIn: false,
      setKeepMeLoggedIn: (val: boolean) => set({ keepMeLoggedIn: val }),
      navToggle: true,
      setNavToggle: (val: boolean) => set({ navToggle: val }),
      setUser: (val: any) => set({ user: val }),
      colorScheme: 'light',
      toggleColorScheme: (val: 'light' | 'dark') => set({ colorScheme: val }),
      setIsloggedIn: (val: boolean) => {
        // Set Zustand state
        set({ isLoggedIn: val });

        // Set or remove cookie
        if (typeof document !== 'undefined') {
          if (val) {
            // Set cookie for 1 hour
            document.cookie = `isLoggedIn=true; path=/; max-age=3600`;
          } else {
            // Expire the cookie
            document.cookie = `isLoggedIn=; path=/; max-age=0`;
          }
        }
      },
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)