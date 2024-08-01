import PL from "./ProfileLeft";
import PR from "./ProfileRight";

export default function PP({ username }: { username: string }) {
    return (
        <>
            <div className="grid grid-cols-4">
                <div className="border-r-2 border-slate-800 overflow-hidden">
                    <PL />
                </div>

                <div className="col-span-3">
                    <PR />
                </div>
            </div>
        </>
    )
}