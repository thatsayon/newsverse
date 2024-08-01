import { IoPerson, IoEyeSharp } from "react-icons/io5";
import { LuArrowBigUp } from "react-icons/lu";
import { TiLocation } from "react-icons/ti";
import { IoIosLink } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";

export default function PL() {
    const img: string = "https://avatars.githubusercontent.com/u/75683770?v=4";
    return (
        <>
            <div>
                <div className="flex justify-center w-3/6 m-auto py-6">
                    <img src={img} alt="profile pic" className="rounded-full" style={{ width: "100%" }} />
                </div>

                <div>
                    <div>
                        <p className="text-2xl font-semibold text-center mb-1">Ashiqul Islam Ayon</p>

                        <div className="flex justify-center text-lg mb-2">
                            <p className="mr-3">@thatsayon</p>
                            <p className="mr-3">-</p>
                            <p>Joined May 2024</p>
                        </div>

                        <div className="flex text-xs justify-center items-center">
                            <div className="flex items-center mr-1">
                                <IoPerson className="mr-2" />
                                <p>10 Following</p>
                            </div>

                            <div className="flex items-center mr-2">
                                <IoEyeSharp className="mr-1 text-lg" />
                                <p>4 Profile Views</p>
                            </div>

                            <div className="flex items-center">
                                <LuArrowBigUp className="mr-1 text-lg" />
                                <p>199 Upvotes</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b-2 mx-8 my-3 border-slate-800">
                    </div>

                    <div className="ml-4">
                        <div className="flex items-center mb-1">
                            <TiLocation className="mr-2"/>
                            <p>Mirpur 11, Dhaka</p>
                        </div>

                        <div className="flex items-center mb-1">
                            <IoIosLink className="mr-2"/>
                            <p>www.techview71.com</p>
                        </div>

                        <div className="flex items-center mb-1">
                            <FaFacebook className="mr-2"/>
                            <p>thatsayon</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}