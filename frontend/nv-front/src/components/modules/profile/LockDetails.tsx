import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

import { MdLockPerson, MdOutlinePersonSearch } from "react-icons/md";
import { GrFormViewHide } from "react-icons/gr";
import { IoMdUnlock } from "react-icons/io"
import { IoClose } from "react-icons/io5";

interface LockDProps {
    onClose: () => void;
}

const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#d7f64e",
        "&:hover": {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#d7f64e",
    },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const LockDe: React.FC<LockDProps> = ({ onClose }) => {
    return (
        <>
            <div
                className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.75)] overflow-auto font-[sans-serif]"
                onClick={onClose}
            >
                <div
                    className="w-full max-w-md bg-[#1e1e1e] shadow-lg rounded-lg relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-end text-3xl mb-4 px-4 pt-4">
                        <IoClose className="cursor-pointer" onClick={onClose}/>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="flex flex-col items-center text-center border-b-2 border-slate-800 pb-4 mb-3">
                            <MdLockPerson className="text-5xl mb-2" />
                            <h1 className="text-2xl font-semibold mb-1">Lock your profile</h1>
                            <p className="text-xl">Secure your personal information with a single step for enhanced privacy.</p>
                        </div>

                        <div>
                            <div className="flex items-center mb-2">
                                <GrFormViewHide className="text-5xl mr-2" />
                                <p>No one can view your address, social links, upvotes, pinned creators, or any other personal information.</p>
                            </div>

                            <div className="flex items-center mb-2">
                                <MdOutlinePersonSearch className="text-2xl mr-2" />
                                <p>Your full name and username will still be visible to others.</p>
                            </div>

                            <div className="flex items-center mb-2">
                                <IoMdUnlock className="text-2xl mr-1.5" />
                                <p>You can unlock your profile whenever you want.</p>
                            </div>
                        </div>

                        <div className="text-center bg-main-one text-black py-2 font-extrabold mt-6 rounded-lg hover:bg-main-one-deep cursor-pointer">
                            <button>Lock your profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LockDe;