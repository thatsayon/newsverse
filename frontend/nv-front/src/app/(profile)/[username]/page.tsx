import PP from "../../../components/modules/profile/ProfilePage";

export default function Profile({ params }: { params: { username: string } }) {
    return (
        <>
            <div className="w-4/5 m-auto border-x-2 border-slate-800">
                <PP username={params.username} />
            </div>
        </>
    )
}