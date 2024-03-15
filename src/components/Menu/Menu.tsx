import {
    CogIcon,
    LogoutIcon,
    MenuIcon,
    XIcon,
} from "@heroicons/react/solid";
import React, { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react";

const MenuComponent = () => {
    // opens and closes the side hamburger menu
    const [menuToggle, setMenuToggle] = useState(false);

    const { data: session } = useSession();

    const menuOpen = () => {
        setMenuToggle(!menuToggle);
        console.log("menu toggled");
    };
    return (
        <>
            {!menuToggle ? (
                <div className="bg-black opacity-60 h-[100vh] -m-12  md:flex justify-between p-2 items-center flex-col rounded-lg w-[4%] hover:opacity-80 transition-all hidden">
                    <MenuIcon
                        className="w-6 lg:w-8  mt-6 hover:opacity-100 cursor-pointer hover:text-red-400"
                        onClick={() => menuOpen()}
                    />

                    {session ? (
                        <div>
                            <LogoutIcon
                                className="w-6 lg:w-8 hover:text-red-400 text-white"
                                onClick={() => signOut()}
                            />
                            <br />
                            <CogIcon className="w-6 lg:w-8 hover:animate-spin hover:text-red-400 transition-all mb-6" />
                        </div>
                    ) : (
                        <CogIcon className="w-6 lg:w-8 hover:animate-spin hover:text-red-400 transition-all mb-6" />
                    )}
                </div>
            ) : (
                <>
                    <div className="bg-black opacity-60 h-[100vh] -m-12  md:flex flex-row-reverse p-2 items-center rounded-lg w-[14%] hover:opacity-80 transition-all hidden z-10">
                        <div className="flex flex-col justify-between h-screen items-center p-2">
                            <XIcon
                                className="w-6 lg:w-8  mt-6 hover:opacity-100 cursor-pointer hover:text-red-400"
                                onClick={() => menuOpen()}
                            />

                            <CogIcon className="w-6 lg:w-8 hover:animate-spin hover:text-red-400 transition-all mb-6" />
                        </div>
                        <div className="h-[91vh] bg-red-400 w-1 rounded-full" />
                        <div className="flex justify-center items-start pt-24 w-[100%] h-full">
                            {!session ? (
                                <button
                                    onClick={() => signIn()}
                                    className="hover:text-red-400 hover:scale-105 transition-all"
                                >
                                    Sign In
                                </button>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => signOut()}
                                        className="hover:text-red-400 hover:scale-105 transition-all"
                                    >
                                        Sign Out!
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
