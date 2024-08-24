import AccountDelet from "@/components/modules/settings/AccountDeletion";
import SettingSidebar from "@/components/modules/settings/SettingNav";

export default function AccountDeletion() {
    return (
        <>
            <div className="lg:border-r-2 border-slate-800 lg:grid lg:grid-cols-4 lg:w-4/5 m-auto">
                <div className="lg:block hidden">
                    <SettingSidebar />
                </div>

                <div className="col-span-3">
                    <AccountDelet />
                </div>
            </div>
        </>
    )
}