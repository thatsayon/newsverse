export default function FeedBack() {
  return (
    <>
      <div className="flex flex-col items-center mt-16 px-4 md:px-16 text-gray-200 min-h-screen">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold">
            We aim to make <span className="text-main-one">News Verse</span> an
            even better place.
          </h1>
          <h2 className="text-2xl mt-2">
            We need your help to achieve this. Please share your feedback with
            us.
          </h2>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mt-8">
          <div className="bg-slate-800 border-2 border-slate-600 w-full m-auto px-6 py-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl text-center">
            <h1 className="text-2xl font-semibold mb-4 text-white">
              General feedback
            </h1>
            <p className="text-lg mb-4 text-gray-300">
              You can ask anything you want; we're here to listen to you.
            </p>
            <button className="w-full bg-main-one text-black font-semibold py-2 rounded-lg hover:bg-main-one-deep transition-colors">
              Give feedback
            </button>
          </div>

          <div className="bg-slate-800 border-2 border-slate-600 w-full m-auto px-6 py-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl text-center">
            <h1 className="text-2xl font-semibold mb-4 text-white">
              New Feature
            </h1>
            <p className="text-lg mb-4 text-gray-300">
              If you have any new features for News Verse, let us know to bring
              them to life.
            </p>
            <button className="w-full bg-main-one text-black font-semibold py-2 rounded-lg hover:bg-main-one-deep transition-colors">
              Give feedback
            </button>
          </div>

          <div className="bg-slate-800 border-2 border-slate-600 w-full m-auto px-6 py-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl text-center">
            <h1 className="text-2xl font-semibold mb-4 text-white">
              Report a bug
            </h1>
            <p className="text-lg mb-4 text-gray-300">
              Found a bug on News Verse? Let us know ASAP so we can fix it.
            </p>
            <button className="w-full bg-main-one text-black font-semibold py-2 rounded-lg hover:bg-main-one-deep transition-colors">
              Give feedback
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
