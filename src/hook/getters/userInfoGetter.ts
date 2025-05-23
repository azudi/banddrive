import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAppStore } from "../../store/app.store"

export const useInfoGetter = () => {
  const [user, setUser] = useState({
    displayName: '',
    email: "",
    uid: ""
  })

  const userLoggedIn = useAppStore((state) => state.isLoggedIn);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      setUser(user as any)
    });

  }, []);

  return { userLoggedIn, user }
}



