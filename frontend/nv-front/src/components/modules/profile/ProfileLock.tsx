"use client";
import { UserProfileData } from "@/types/userType";
import { useState } from "react";
import { MdLockPerson } from "react-icons/md";
import LockDe from "./LockDetails";

export default function PLock({ userData }: { userData: UserProfileData }) {
    const [detailBoxOpen, setDetialBoxOpen] = useState<boolean>(false);
    const [anchorDB, setAnchorDB]  = useState<null | HTMLElement>(null);

    const img: string = "https://avatars.githubusercontent.com/u/75683770?v=4";

    const handleCloseDB = () => {
        setAnchorDB(null);
    }

    const handleDetailBoxOpen = () => {
        setDetialBoxOpen(true);
        handleCloseDB();
    }

    const handleDetailBoxClose = () => {
        setDetialBoxOpen(false);
    }
    return (
        <div className="lg:grid lg:grid-cols-4 lg:border-b-2 lg:border-slate-800">
            <div className="lg:border-r-2 lg:border-slate-800 overflow-hidden">
                <div className="flex justify-center w-3/6 m-auto py-6">
                    <img src={img} alt="profile pic" className="rounded-full" style={{ width: "100%" }} />
                </div>

                <div>
                    <div>
                        <p className="text-2xl font-semibold text-center mb-1">
                            {userData?.full_name}
                        </p>
                    </div>

                    <div className="flex justify-center text-lg mb-2">
                        <p>@{userData?.username}</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3">
                <div className="flex items-center px-4 py-2 bg-main-one text-black lg:m-4 lg:rounded-lg">
                    <div>
                        <MdLockPerson className="text-4xl mr-2" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold"><span className="font-extrabold">{userData?.full_name}'s</span> profile is locked.</h1>
                        <p className="cursor-pointer font-semibold block" onClick={handleDetailBoxOpen}>Learn more</p>
                    </div>
                </div>
            </div>

            {detailBoxOpen && <LockDe onClose={handleDetailBoxClose} />}
        </div>
    )
}