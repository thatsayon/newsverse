import BlockList from "@/components/modules/settings/BlockingList";
import SettingSidebar from "@/components/modules/settings/SettingNav";

export default function Blocking() {
    return (
        <>
            <div className="border-r-2 border-slate-800 grid grid-cols-4 w-4/5 m-auto">
                <div>
                    <SettingSidebar />
                </div>

                <div className="col-span-3">
                    <BlockList />
                </div>
            </div>
        </>
    )
}