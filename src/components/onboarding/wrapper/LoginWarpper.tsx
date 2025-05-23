"use client"
import React, { useState } from "react";
import LoginForm from "@/components/onboarding/LoginForm";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { isLoggedIn } from "redux/mutateUsers/users";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store";

function LoginWrapper() {
    const navigate = useRouter();
    const [isLoading, setisloading] = useState(false);
    const appState = useAppStore((state) => state);

    const loginUser = async (val: any) => {
        setisloading(true);
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                val.email,
                val.password
            );
            appState.setUser(user as any)
            appState.setIsloggedIn(true)
            navigate.push("/");
        } catch (err: any) {
            const errorMsg = err.message.split("/")[1];
            toast.error(errorMsg.slice(0, -2).replace("-", " "));
        } finally {
            setisloading(false);
        }
    };

    return (
        <>
            <LoginForm isLoading={isLoading} loginUser={loginUser} />
        </>
    );
}

export default LoginWrapper;
