import { UserProfileData } from "@/types/userType";
import { BiSolidUpvote, BiSolidDownvote, BiHappyHeartEyes } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function RightAbout({ userData }: { userData: UserProfileData }) {
    return (
        <>
            <div className="ml-4 mt-2">
                <div className="pb-4">
                    <div className="text-2xl font-semibold"><p>Favourite Topics</p></div>
                    <div className="flex py-2 gap-2">
                        {userData?.favourite_topics && (userData?.favourite_topics.map((data) => (
                            <p key={data} className="bg-nav-dark px-2 py-1 rounded-lg font-semibold cursor-pointer hover:text-main-one">
                                {data}
                            </p>
                        )))}
                    </div>
                </div>

                <div className="pb-4">
                    <div className="text-2xl font-semibold"><p>Reading Streak</p></div>

                    <div className="flex py-2 gap-6">
                        <div className="border-2 border-slate-800 px-4 py-2 rounded-lg">
                            <h1 className="text-xl font-bold">{userData.longest_streak}</h1>
                            <p>Longest streak</p>
                        </div>

                        <div className="border-2 border-slate-800 p-2 rounded-lg">
                            <h1 className="text-xl font-bold">{userData.total_reading_days}</h1>
                            <p>Total reading days</p>
                        </div>
                    </div>
                </div>

                <div className="pb-4">
                    <div className="text-2xl font-semibold"><p>Total Count</p></div>

                    <div className="py-2 text-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <BiSolidUpvote />
                            <p>{`${userData.upvote_count} total Upvotes`}</p>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                            <BiSolidDownvote />
                            <p>{`${userData.downvote_count} total Downvotes`}</p>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                            <FaEye />
                            <p>{`${userData.read_count} posts read in total`}</p>
                        </div>
                    </div>
                </div>

                {userData.pinned_creators && (
                    <div className="pb-4">
                        <div className="text-2xl font-semibold"><p>Pinned Creators</p></div>

                        <div className="flex flex-wrap gap-6 py-2 justify-evenly mb-14">
                            {userData?.pinned_creators.map((data) => (
                                <div key={data.name} className="w-40 flex-shrink-0">
                                    <div className="border-2 border-slate-800 rounded-lg px-2 py-2">
                                        <div className="flex justify-end cursor-pointer">
                                            <TiDelete className="text-2xl" />
                                        </div>
                                        <img
                                            src="https://picsum.photos/id/23/3887/4899"
                                            alt="creator profile"
                                            height={80}
                                            width={80}
                                            className="rounded-full m-auto mb-1"
                                        />
                                        <p className="text-xl font-semibold text-center">{data.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
