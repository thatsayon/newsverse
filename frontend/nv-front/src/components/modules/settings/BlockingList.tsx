"use client";
import Image from "next/image"
import { MdKeyboardArrowLeft } from "react-icons/md";

interface CreatorData {
    creator_profile_pic: string;
    creator_name: string;
}

export default function BlockList() {
    const data: CreatorData[] = [
        { 'creator_profile_pic': 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI', 'creator_name': 'prothom alo' },
        { 'creator_profile_pic': 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI', 'creator_name': 'sotto samachar' }
    ]
    return (
        <>
            <div className="pt-3 lg:border-l-2 border-slate-800">
                <div className="border-b-2 border-slate-800 flex pl-2">
                    <MdKeyboardArrowLeft className='text-3xl lg:hidden mt-0.5 cursor-pointer' onClick={() => window.history.back()} />
                    <h1 className="pl-2 pb-3 text-2xl font-semibold">Blocking</h1>
                </div>

                <div className="pl-4 mt-2">
                    <h1 className="text-xl font-semibold mb-2">Blocked Creators</h1>
                    <p>Once you block a creator, you won't receive any news from them. However, you can unblock them at any time, and you'll start seeing their news again.</p>
                </div>

                <div className="pl-4">
                    {data.length > 0 ? (
                        data.map((item, key) => (
                            <div className="flex border-2 my-4 border-slate-800 px-3 py-2 mr-4 rounded-lg items-center" key={key}>
                                <img src={item.creator_profile_pic} alt="creator image" width={35} height={35} className="mr-4" />

                                <div className="flex justify-between w-full pr-6">
                                    <p className="text-lg">{item.creator_name}</p>

                                    <button className="uppercase">Unblock</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <h1 className="text-center bg-[#222] font-semibold rounded-2xl px-4 py-2 mb-7 select-none inline hover:text-main-one cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                                No creators are currently blocked
                            </h1>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}