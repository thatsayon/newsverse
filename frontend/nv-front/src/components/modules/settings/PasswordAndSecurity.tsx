"use client";
import React, { useState, ChangeEvent } from "react"
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { PiLockKeyFill } from "react-icons/pi";

export default function PAndS() {
    const [currentPass, setCurrentPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [recoverPass, setRecoverPass] = useState<string>('');

    const handleCPChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentPass(e.target.value);
    const handleNPChange = (e: ChangeEvent<HTMLInputElement>) => setNewPass(e.target.value);
    const handleCoPChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value);
    const handleRPChange = (e: ChangeEvent<HTMLInputElement>) => setRecoverPass(e.target.value);

    return (
        <>
            <div className="pt-3 border-l-2 border-slate-800">
                <div className="border-b-2-3 border-slate-800">
                    <h1 className="pl-4 pb-3 text-2xl font-semibold">Password & Security</h1>
                </div>

                <div className="pl-4 pt-2 border-b-2 border-slate-800 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold">Update Password</h1>
                    </div>

                    <div className="flex flex-col pt-4">
                        <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                            <RiLockPasswordLine className="text-3xl text-gray-400 mx-3" />

                            <div>
                                <label htmlFor="current_pass" className="text-sm text-gray-400 mb-0.5">
                                    Current Password
                                </label>
                                <input
                                    type="text"
                                    id="current_pass"
                                    name="current_pass"
                                    value={currentPass}
                                    onChange={handleCPChange}
                                    className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                        <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                            <RiLockPasswordFill className="text-3xl text-gray-400 mx-3" />

                            <div>
                                <label htmlFor="current_pass" className="text-sm text-gray-400 mb-0.5">
                                    New Password
                                </label>
                                <input
                                    type="text"
                                    id="new_pass"
                                    name="new_pass"
                                    value={newPass}
                                    onChange={handleNPChange}
                                    className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                        <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                            <PiLockKeyFill className="text-3xl text-gray-400 mx-3" />

                            <div>
                                <label htmlFor="current_pass" className="text-sm text-gray-400 mb-0.5">
                                    Confirm Password
                                </label>
                                <input
                                    type="text"
                                    id="confirm_pass"
                                    name="confirm_pass"
                                    value={confirmPass}
                                    onChange={handleCoPChange}
                                    className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-right mr-80 mt-4">
                        <button className="bg-main-one text-black font-semibold p-2 rounded-lg hover:bg-main-one-deep">Update Password</button>
                    </div>
                </div>

                <div className="pl-4 pt-2 border-b-2 border-slate-800 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold">Recover Password</h1>
                    </div>

                    <div className="flex flex-col pt-4">
                        <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                            <RiLockPasswordFill className="text-3xl text-gray-400 mx-3" />

                            <div>
                                <label htmlFor="recover_pass" className="text-sm text-gray-400 mb-0.5">
                                    Recover Password
                                </label>
                                <input
                                    type="text"
                                    id="recover_pass"
                                    name="recover_pass"
                                    value={recoverPass}
                                    onChange={handleRPChange}
                                    className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-right mr-80 mt-4">
                        <button className="bg-main-one text-black font-semibold p-2 rounded-lg hover:bg-main-one-deep">Send Mail</button>
                    </div>
                </div>
            </div>
        </>
    )
}