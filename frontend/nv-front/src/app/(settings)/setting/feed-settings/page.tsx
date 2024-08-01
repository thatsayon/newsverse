import SettingSidebar from "@/components/modules/settings/SettingNav";

export default function FeedSetting() {
    return (
        <>
            <div className="grid grid-cols-4 w-4/5 m-auto">
                <div>
                    <SettingSidebar />
                </div>

                <div className="col-span-3">
                    <h1>feed setting</h1>
                </div>
            </div>
        </>
    )
}