import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store";




export default function useLogOut() {
  const navigation = useRouter();
  const appState = useAppStore((state) => state);

  const logout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    appState.setIsloggedIn(false)
    navigation.push('/auth/login');
  };

  return { logout };
}
