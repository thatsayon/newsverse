"use client";
import { useEffect, useState } from "react";
import PL from "./ProfileLeft";
import PR from "./ProfileRight";
import Cookies from "js-cookie";
import Load from "@/components/common/Loading";
import { UserProfileData } from "@/types/userType";
import PLock from "./ProfileLock";

export default function PP({ username }: { username: string }) {
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userToken = Cookies.get("token");


    const getProfileData = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${username}/`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${userToken}`
                    },
                }
            );

            if (!response.ok) {
                window.location.href = "/not-found"
                return;
            }

            const data: UserProfileData = await response.json();
            setUserData(data);
        } catch (error) {
            window.location.href = "/not-found"
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProfileData();
    }, []);

    if (isLoading) return <Load />

    if (!userData?.is_public) return <>{userData && <PLock userData={userData} />}</>
    return (
        <>
            <div className="lg:grid lg:grid-cols-4">
                <div className="lg:border-r-2 lg:border-slate-800 overflow-hidden">
                    {userData && <PL userData={userData} />}
                </div>

                <div className="lg:col-span-3">
                    {userData && <PR userData={userData} />}
                </div>
            </div>
        </>
    )
}