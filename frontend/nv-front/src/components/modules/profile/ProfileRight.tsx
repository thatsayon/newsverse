"use client";
import { useState } from "react"
import dynamic from "next/dynamic"

const About = dynamic(() => import('./RightSideComps/RAbout'), { ssr: false });
const Upvotes = dynamic(() => import('./RightSideComps/RUpvotes'), { ssr: false });
const Bookmark = dynamic(() => import('./RightSideComps/RBookmark'), { ssr: false });
import { UserProfileData } from "@/types/userType";

export default function PR({userData}: {userData: UserProfileData}) {
    const [activeComponent, setActiveComponent] = useState<'about' | 'upvotes' | 'bookmark'>('about');
    const name = "this is working"
    return (
        <>
            <div>
                <div className="flex border-b-2 border-slate-800 p-4">
                    <div
                        className={`mr-4 bg-nav-dark rounded-lg px-2 py-1 cursor-pointer ${activeComponent === 'about' ? 'bg-zinc-700' : ''}`}
                        onClick={() => setActiveComponent('about')}
                    >
                        <p className="text-xl font-semibold">About</p>
                    </div>

                    <div
                        className={`mr-4 bg-nav-dark rounded-lg px-2 py-1 cursor-pointer ${activeComponent === 'upvotes' ? 'bg-zinc-700' : ''}`}
                        onClick={() => setActiveComponent('upvotes')}
                    >
                        <p className="text-xl font-semibold">Upvotes</p>
                    </div>

                    <div
                        className={`mr-4 bg-nav-dark rounded-lg px-2 py-1 cursor-pointer ${activeComponent === 'bookmark' ? 'bg-zinc-700' : ''}`}
                        onClick={() => setActiveComponent('bookmark')}
                    >
                        <p className="text-xl font-semibold">Bookmark</p>
                    </div>
                </div>

                <div className="mt-4">
                    {activeComponent === 'about' && <About userData={userData}/>}
                    {activeComponent === 'upvotes' && <Upvotes />}
                    {activeComponent === 'bookmark' && <Bookmark />}
                </div>
            </div>
        </>
    )
}