import { Bebas_Neue, Oswald, Lilita_One } from "next/font/google";
import { BsFacebook, BsInstagram, BsYoutube, BsDiscord } from "react-icons/bs";
import { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Link, animateScroll as scroll } from "react-scroll"; // Import Link from react-scroll
import NavLink from "next/link";
import "./HomeStyle.css";

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
});

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
});

export default function WelcomeHome() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // Show button when user scrolls down 200px from the top
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="flex relative" style={{ height: "75vh" }}>
        <h1
          style={oswald.style}
          className="text-8xl px-14 flex-1 place-content-center"
        >
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
        <h2
          className="absolute top-16 right-12 text-2xl text-center border-2 p-4 rounded-full"
          style={oswald.style}
        >
          All your news <br />
          in one place
        </h2>
      </div>

      <button
        onClick={() => scroll.scrollToTop({ duration: 500 })} // Smooth scroll to top in 500ms
        className={`scroll-to-top-button ${
          showScrollTopButton ? "visible" : "hidden"
        }`}
      >
        <MdKeyboardDoubleArrowUp />
      </button>

      <div className="flex justify-center mb-8">
        <Link
          to="question-section" // Target ID of the element to scroll to
          smooth={true} // Enables smooth scrolling
          duration={500} // Scrolling duration in milliseconds
          className="inline bg-red-500 px-6 py-4 rounded cursor-pointer"
        >
          <p className="text-4xl font-bold text-black" style={lilita.style}>
            Hard Truth
          </p>
        </Link>
      </div>

      {/* Question mark section */}
      <div className="flex justify-center">
        <Link
          to="question-section" // Target ID of the element to scroll to
          smooth={true} // Enables smooth scrolling
          duration={500} // Scrolling duration in milliseconds
          className="text-center inline-block cursor-pointer"
        >
          <p
            className="bg-white text-black px-2 text-xl font-bold py-1 dancing"
            style={lilita.style}
          >
            ?
          </p>
        </Link>
      </div>

      {/* question section */}
      <div className="" style={{ height: "100vh" }}>
        <div
          id="question-section"
          className="flex justify-center items-center h-full"
        >
          <div className="">
            <p className="text-6xl mb-8 text-center" style={oswald.style}>
              Finding reliable <span className="text-main-one">news</span> is
              like searching for a needle in a haystack of source.
            </p>
            <div className="flex justify-center">
              <Link
                to="solution-section" // Target ID of the element to scroll to
                smooth={true} // Enables smooth scrolling
                duration={500} // Scrolling duration in milliseconds
                className="text-center inline-block cursor-pointer"
              >
                <p
                  className="bg-white text-black px-2 text-xl font-bold py-1 dancing"
                  style={lilita.style}
                >
                  Need a solution ?
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* solution section  */}

      <div className="" style={{ height: "100vh" }}>
        <div
          id="solution-section"
          className="flex flex-col justify-center items-center h-full"
        >
          <div className="inline mb-6 bg-green-500 px-6 py-4 rounded cursor-pointer">
            <p className="text-4xl font-bold text-black" style={lilita.style}>
              Solution
            </p>
          </div>
          <div className="">
            <p className="text-6xl mb-8 text-center" style={oswald.style}>
              Finding Reliable News Just Got Easier with{" "}
              <span className="text-main-one">News Verse</span>.
            </p>
            <div className="flex justify-center">
              <Link
                to="answer-section" // Target ID of the element to scroll to
                smooth={true} // Enables smooth scrolling
                duration={500} // Scrolling duration in milliseconds
                className="text-center inline-block cursor-pointer"
              >
                <p
                  className="bg-white text-black px-2 text-xl font-bold py-1 dancing"
                  style={lilita.style}
                >
                  But how ?
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* answer section  */}

      <div className="" style={{ height: "100vh" }}>
        <div
          id="answer-section"
          className="flex flex-col justify-center items-center h-full"
        >
          <div className="inline mb-6 bg-main-one px-6 py-4 rounded cursor-pointer">
            <p className="text-4xl font-bold text-black" style={lilita.style}>
              Answer
            </p>
          </div>
          <div className="">
            <p className="text-5xl mb-8 text-center" style={oswald.style}>
              With our advanced algorithm,{" "}
              <span className="text-main-one">News Verse</span> finds the news
              you need from the entire web.
            </p>
            <div className="flex justify-center">
              <NavLink href="/signup">
                <p
                  className="bg-white text-black px-2 text-xl font-bold py-1 dancing"
                  style={lilita.style}
                >
                  Sign up now on News Verse for personalized, reliable news !!!
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-col items-center mb-4">
        <div className="border-t-8 border-slate-600 w-[10rem] rounded-lg mb-8"></div>
        <div>
          <p style={oswald.style} className="text-xl">
            Contact us at{" "}
            <a href="mailto:contact@newsverse.com" className="text-blue-400">
              contact@newsverse.com
            </a>
          </p>
        </div>

        <div className="flex text-2xl py-3 gap-x-4">
          <BsFacebook className="cursor-pointer hover:text-main-one" />
          <BsInstagram className="cursor-pointer hover:text-main-one" />
          <BsYoutube className="cursor-pointer hover:text-main-one" />
          <BsDiscord className="cursor-pointer hover:text-main-one" />
        </div>

        <div>
          <div className="mb-0.5">
            <p className="text-center text-xl uppercase" style={lilita.style}>
              Helpful Links
            </p>
          </div>
          <div className="mb-1">
            <ul className="flex text-xl" style={oswald.style}>
              <li className="mx-2 cursor-pointer">Contact</li>
              {" | "}
              <li className="mx-2 cursor-pointer">Privacy</li>
              {" | "}
              <li className="mx-2 cursor-pointer">Terms</li>
              {" | "}
              <li className="mx-2 cursor-pointer">Advertise</li>
            </ul>
          </div>
        </div>

        <div className="text-sm" style={oswald.style}>
          <p>Copyright © {new Date().getFullYear()} News Verse</p>
        </div>
      </div>
    </>
  );
}
