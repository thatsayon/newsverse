import BlockList from "@/components/modules/settings/BlockingList";
import SettingSidebar from "@/components/modules/settings/SettingNav";

export default function Blocking() {
    return (
        <>
            <div className="lg:border-r-2 lg:border-slate-800 lg:grid lg:grid-cols-4 lg:w-4/5 m-auto">
                <div className="lg:block hidden">
                    <SettingSidebar />
                </div>

                <div className="col-span-3">
                    <BlockList />
                </div>
            </div>
        </>
    )
}