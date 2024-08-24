import PAndS from "@/components/modules/settings/PasswordAndSecurity";
import SettingSidebar from "@/components/modules/settings/SettingNav";

export default function PassSecure() {
    return (
        <>
            <div className="lg:border-r-2 lg:border-slate-800 lg:grid lg:grid-cols-4 lg:w-4/5 m-auto">
                <div className="lg:block hidden">
                    <SettingSidebar />
                </div>

                <div className="col-span-3">
                    <PAndS />
                </div>
            </div>
        </>
    )
}