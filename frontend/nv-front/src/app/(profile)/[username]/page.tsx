import PP from "../../../components/modules/profile/ProfilePage";

export default function Profile({ params }: { params: { username: string } }) {
    return (
        <>
            <div className="lg:w-4/5 m-auto lg:border-x-2 lg:border-slate-800">
                <PP username={params.username} />
            </div>
        </>
    )
}