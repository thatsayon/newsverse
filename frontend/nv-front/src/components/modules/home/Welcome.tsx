import { Bebas_Neue, Oswald} from "next/font/google";

const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
})

export default function WelcomeHome() {
  return (
    <>
      <div className="flex h-svh relative">
        <h1 style={oswald.style} className="text-8xl px-14 flex-1 place-content-center">
          Explore the latest updates <br />
          in the{" "}
          <span className="text-main-one font-semibold cursor-pointer hover-on-span hover:text-main-one-deep">
            news
          </span>{" "}
          with insightful <br />
          commentary in our{" "}
          <span className="text-main-one font-semibold hover:text-main-one-deep cursor-pointer">
            verse
          </span>
          .
        </h1>
        <h2 className="absolute top-16 right-12 text-2xl text-center border-2 p-4 rounded-full">
          All your news <br />
          in one place
        </h2>
      </div>
    </>
  );
}
