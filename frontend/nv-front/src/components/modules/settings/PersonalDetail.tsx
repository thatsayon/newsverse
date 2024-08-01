"use client";
import React, { useState, ChangeEvent } from 'react';
import { IoPerson } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";

export default function PD() {
    const [fullName, setFullName] = useState<string>('Ashiqul Islam Ayon');
    const [userName, setUserName] = useState<string>('username');
    const [email, setEmail] = useState<string>('email@example.com');
    const [birthDate, setBirthDate] = useState<string>('');
    const [gender, setGender] = useState<string>('male');

    const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value);
    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value);
    const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => setGender(e.target.value);
    return (
        <>
            <div className="pt-3 border-l-2 border-slate-800">
                <div className="border-b-2 border-slate-800">
                    <h1 className="pl-4 pb-3 text-2xl font-semibold">Personal Detail</h1>
                </div>

                <div className="flex flex-col pt-4 pl-4">
                    <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                        <IoPerson className="text-3xl text-gray-400 mx-3" />

                        <div>
                            <label htmlFor="full_name" className="text-sm text-gray-400 mb-0.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={fullName}
                                onChange={handleFullNameChange}
                                className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col pt-4 pl-4">
                    <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                        <MdAlternateEmail className="text-3xl text-gray-400 mx-3" />

                        <div>
                            <label htmlFor="username" className="text-sm text-gray-400 mb-0.5">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="full_name"
                                value={userName}
                                onChange={handleUserNameChange}
                                className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col pt-4 pl-4">
                    <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                        <MdEmail className="text-3xl text-gray-400 mx-3" />

                        <div>
                            <label htmlFor="full_name" className="text-sm text-gray-400 mb-0.5">
                                Email
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col pt-4 pl-4">
                    <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                        <FaCalendarAlt className="text-3xl text-gray-400 mx-3" />
                        <div className='relative w-full mr-4'>
                            <label htmlFor="birth_date" className="text-sm text-gray-400 mb-0.5">
                                Birth Date
                            </label>
                            <input
                                type="date"
                                id="birth_date"
                                name="birth_date"
                                value={birthDate}
                                onChange={handleBirthDateChange}
                                className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col pt-4 pl-4">
                    <div className="flex items-center bg-zinc-700 rounded-md py-2 mr-80">
                        <FaTransgender className="text-3xl text-gray-400 mx-3" />
                        <div className='relative w-full mr-4'>
                            <label htmlFor="gender" className="text-sm text-gray-400 mb-0.5">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={handleGenderChange}
                                className="w-full bg-zinc-700 text-white text-xl border-none rounded-md py-1 focus:outline-none"
                                style={{appearance: "none"}}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='text-right mr-80 mt-4'>
                    <button className='bg-main-one text-black font-semibold p-2 rounded-lg text-xl hover:bg-main-one-deep'>Update</button>
                </div>
            </div>
        </>
    )
}