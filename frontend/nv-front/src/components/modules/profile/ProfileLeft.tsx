import { IoPerson, IoEyeSharp } from "react-icons/io5";
import { LuArrowBigUp } from "react-icons/lu";
import { TiLocation } from "react-icons/ti";
import { IoIosLink } from "react-icons/io";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { UserProfileData } from "@/types/userType";

export default function PL({ userData }: { userData: UserProfileData }) {
    const img: string = "https://avatars.githubusercontent.com/u/75683770?v=4";

    return (
        <div>
            <div className="flex justify-center w-3/6 m-auto py-6">
                <img src={img} alt="profile pic" className="rounded-full" style={{ width: "100%" }} />
            </div>

            <div>
                <div>
                    <p className="text-2xl font-semibold text-center mb-1">
                        {userData?.full_name}
                    </p>

                    <div className="flex justify-center text-lg mb-2">
                        <p className="mr-3">@{userData?.username}</p>
                        <p className="mr-3">-</p>
                        <p>Joined {new Date(userData?.date_joined || "").toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                    </div>

                    <div className="flex text-xs justify-center items-center">
                        <div className="flex items-center mr-1">
                            <IoPerson className="mr-2" />
                            <p>{userData?.total_reading_days} Reading Days</p>
                        </div>

                        <div className="flex items-center mr-2">
                            <IoEyeSharp className="mr-1 text-lg" />
                            <p>{userData?.profile_views} Profile Views</p>
                        </div>

                        <div className="flex items-center">
                            <LuArrowBigUp className="mr-1 text-lg" />
                            <p>{userData?.upvote_count} Upvotes</p>
                        </div>
                    </div>
                </div>

                <div className="border-b-2 mx-8 my-3 border-slate-800"></div>

                <div className="ml-4">
                    <div className="flex items-center mb-1">
                        <TiLocation className="mr-2" />
                        <p>{userData?.address}</p>
                    </div>

                    {userData?.personal_website && (
                        <div className="flex items-center mb-1">
                            <IoIosLink className="mr-2" />
                            <a href={userData?.personal_website} target="_blank" rel="noopener noreferrer">
                                {userData?.personal_website ? new URL(userData?.personal_website).hostname.replace(/^www\./, '') : userData?.username}
                            </a>
                        </div>
                    )}

                    {userData?.facebook && (
                        <div className="flex items-center mb-1">
                            <FaFacebook className="mr-2" />
                            <a href={userData?.facebook} target="_blank" rel="noopener noreferrer">
                                {userData?.facebook ? userData?.facebook.split('/').filter(Boolean).pop() : userData?.username}
                            </a>
                        </div>
                    )}

                    {userData?.instagram && (
                        <div className="flex items-center mb-1">
                            <FaInstagram className="mr-2" />
                            <a href={userData?.instagram} target="_blank" rel="noopener noreferrer">
                                {userData?.instagram ? userData?.instagram.split('/').filter(Boolean).pop() : userData?.username}
                            </a>
                        </div>
                    )}

                    {userData?.twitter && (
                        <div className="flex items-center mb-1">
                            <FaTwitter className="mr-2" />
                            <a href={userData?.twitter} target="_blank" rel="noopener noreferrer">
                                {userData?.twitter ? userData?.twitter.split('/').filter(Boolean).pop() : userData?.username}
                            </a>
                        </div>
                    )}

                    {userData?.linkedin && (
                        <div className="flex items-center mb-1">
                            <FaLinkedin className="mr-2" />
                            <a href={userData?.linkedin} target="_blank" rel="noopener noreferrer">
                                {userData?.linkedin ? userData?.linkedin.split('/').filter(Boolean).pop() : userData?.username}

                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
