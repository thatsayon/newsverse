export default function AccountDelet() {
    return (
        <>
            <div className="pt-3 border-l-2 border-slate-800">
                <div className="border-b-2 border-slate-800">
                    <h1 className="pl-4 pb-3 text-2xl font-semibold">Account Deletion</h1>
                </div>

                <div className="pl-4 pr-4 mt-3 text-lg">
                    <div>
                        <p>Are you sure you want to delete your <span className="text-main-one font-semibold">News Verse</span> account? If you're having problems, please contact customer support who can help.</p>
                    </div>
                    <br />
                    <div>
                        <p>Deleting your account will: <br /> <br /> 1. Permanently delete your profile, along with your all data. <br /> 2. Permanently delete all your bookmarks and also all your history, including read history, vote history, search history etc. <br /> 3. Allow your username to become available to anyone.</p>
                    </div>
                    <br />
                    <div>
                        <p><b>Note:</b> Deleting your account is unrecoverable and cannot be undone.</p>
                    </div>

                    <div className="mt-4">
                        <button className="bg-red-600 text-black font-semibold p-2 text-xl rounded-lg hover:bg-red-700">Delete account</button>
                    </div>
                </div>
            </div>
        </>
    )
}