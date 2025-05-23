"use client"
import React, { useState } from "react";
import RegisterForm from "@/components/onboarding/RegisterForm";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";
import { useInfoGetter } from "@/hook/getters/userInfoGetter";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store"

const RegisterWrapper = () => {
    const appState = useAppStore((state) => state);
    const navigate = useRouter();
    const [isLoading, setisloading] = useState(false);
    const { user } = useInfoGetter();

    const getUserToLogIn = (val: any) => {
        setisloading(true);
        createUserWithEmailAndPassword(auth, val.email, val.password)
            .then(async (res) => {
                await writeUserData(res.user.uid, val.fullname);
            })
            .catch((error) => {
                const errorMsg = error.message.split("/")[1];
                toast.error(errorMsg.slice(0, -2).replace("-", " "));
            })
            .finally(() => setisloading(false));
    };

    const writeUserData = async (userId: number | string, name: string) => {
        const auth = getAuth();
        await updateProfile(auth.currentUser as any, {
            displayName: name,
        })
            .then(() => {
                appState.setUser(user)
                appState.setIsloggedIn(true)
                navigate.push("/");
            })
            .catch((error) => {
                const errorMsg = error.message.split("/")[1];
                toast.error(errorMsg.slice(0, -2).replace("-", " "));
            });
    };


    return (
        <RegisterForm isLoading={isLoading} getUserInfo={getUserToLogIn} />
    );
}

export default RegisterWrapper;
