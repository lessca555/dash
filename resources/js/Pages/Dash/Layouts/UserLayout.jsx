import { Link, Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

import {
    AiFillCarryOut,
    AiOutlineAppstore,
    AiFillAppstore,
    AiOutlineCheckSquare,
} from "react-icons/ai";
import { BiLogOut, BiSolidLogOut } from "react-icons/bi";
import Navbar from "./Navbar";
import { React, useState, useEffect } from "react";

export default function Layout({ children }) {
    const currentPath = window.location.pathname;
    const { userRole } = usePage();
    // const [count, setCount] = useState(0)
    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         setCount((count) => count + 1)
    //     }, 1000)

    //     return function(){
    //         clearInterval(interval);
    //     }
    // }, []);

    const handleLogout = () => {
        Inertia.post(route("logout")); // Mengirim permintaan POST ke rute logout
    };

    return (
        <main>
            <Head title="Dashboard" />
            <div className="flex sidex user">
                <div className="drawer">
                    <input
                        id="my-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="flex">
                        <div className="flex flex-col">
                            <label
                                htmlFor="my-drawer"
                                className="btn bg-white drawer-button font-bold hover:bg-white outline-none border-none"
                            >
                                <div className="avatar">
                                    <div className="w-[35px] rounded-full">
                                        <img src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auhref=format&fit=crop&w=1470&q=80" />
                                    </div>
                                </div>
                            </label>
                            <ul className="flex flex-col justify-center items-center">
                                <a href="/dashboard/user">
                                    <li
                                        className={`p-4 mt-5
                                        ${
                                            currentPath === "/dashboard/user"
                                                ? "active"
                                                : ""
                                        }
                                    tooltip tooltip-right`}
                                        data-tip="Absen"
                                    >
                                        <AiOutlineCheckSquare size={35} />
                                    </li>
                                </a>
                                <button type="submit" onClick={handleLogout}>
                                    <li
                                        className={`p-4
                                            ${
                                                currentPath === "/logout"
                                                    ? "active"
                                                    : ""
                                            }
                                        tooltip tooltip-right`}
                                        data-tip="Log out"
                                    >
                                        <BiLogOut size={35} />
                                    </li>
                                </button>
                            </ul>
                        </div>
                    </div>

                    <div className="drawer-side z-10">
                        <label
                            htmlFor="my-drawer"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <div className="pl-4 flex items-center mb-5">
                                <div className="avatar online">
                                    <div className="w-[50px] rounded-full">
                                        <img src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auhref=format&fit=crop&w=1470&q=80" />
                                    </div>
                                </div>
                                <div className="flex flex-col pl-2">
                                    <h1 className="font-[800]">Sigma</h1>
                                    <span className="text-[0.6rem] text-gray-500">
                                        Admin
                                    </span>
                                </div>
                            </div>
                            <li
                                className={
                                    currentPath === "/absen" ? "active" : ""
                                }
                            >
                                <a href="/absen">
                                    <AiFillCarryOut size={35} />
                                    <span>Absensi</span>
                                </a>
                            </li>
                            <li
                                className={
                                    currentPath === "/logout" ? "active" : ""
                                }
                            >
                                <form>
                                    {/* <a href="/logout">
                                        <BiSolidLogOut size={35} />
                                        <span>Log Out</span>
                                    </a> */}
                                    <button className="flex justify-center items-center">
                                        <BiSolidLogOut size={35} /> Log Out
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <Navbar />
                    <article className="p-5">{children}</article>
                </div>
            </div>
        </main>
    );
}
