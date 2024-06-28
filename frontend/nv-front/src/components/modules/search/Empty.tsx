import { TbFaceIdError } from "react-icons/tb";

export default function Empty() {
  return (
    <>
      <div className="fixed w-screen overflow-hidden">
        <div className="flex flex-col mt-14 items-center">
          <TbFaceIdError className="text-8xl"/>
          <div className="flex mt-4 flex-col items-center">
            <h1 className="text-3xl mb-4 font-semibold">Looks like you didn't type anything in the search bar.</h1>
            <h2 className="text-2xl font-semibold">What are you looking for?</h2>
          </div>
        </div>
      </div>
    </>
  );
}
