"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


function NotFoundUI() {
    const navigate = useRouter()

    return (
        <div className='flex justify-center items-center h-[100vh] text-center'>
            <div>
                {/* <TbError404 size={70}/> */}
                <p className='py-2'>
                    Oops it seems you have missed your way
                </p>
                <button className='px-5 bg-red-600 text-white py-2 mt-6 rounded-full'
                    onClick={() => navigate.push("/")}
                >
                    Go to home</button>
            </div>
        </div>
    )
}

export default NotFoundUI
