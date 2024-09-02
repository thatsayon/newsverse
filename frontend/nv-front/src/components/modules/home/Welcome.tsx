import { BsFacebook, BsInstagram, BsTwitterX, BsTelegram } from "react-icons/bs";
import { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Link, animateScroll as scroll } from "react-scroll"; // Import Link from react-scroll
import "./HomeStyle.css";
import styles from '@/utils/customFont.module.css';

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
      <div className="flex relative h-[60vh] md:h-[75vh] lg:h-[75vh] sm:h-[60vh]">
        <h1
          className={`md:text-8xl text-5xl md:px-14 px-6 flex-1 place-content-center ${styles.oswaldFont}`}
        >
          Explore the latest updates <br />
          in the{" "}
          <span className="text-main-one md:font-semibold font-bold cursor-pointer hover-on-span hover:text-main-one-deep">
            news
          </span>{" "}
          with insightful <br />
          commentary in our{" "}
          <span className="text-main-one md:font-semibold font-bold hover:text-main-one-deep cursor-pointer">
            verse
          </span>
          .
        </h1>
        <h2
          className={`hidden md:inline-block absolute md:top-16 top-4 md:right-12 right-4 md:text-2xl text-xl text-center border-2 md:p-4 p-3 rounded-full ${styles.oswaldFont}`}
        >
          All your news <br />
          in one place
        </h2>
      </div>

      <button
        onClick={() => scroll.scrollToTop({ duration: 500 })} // Smooth scroll to top in 500ms
        className={`scroll-to-top-button ${showScrollTopButton ? "visible" : "hidden"
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
          <p className={`text-4xl font-bold text-black ${styles.lalitaOneFont}`}
          // style={lilita.style}
          >
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
            className={`bg-white text-black px-2 text-xl font-bold py-1 dancing rounded-lg ${styles.lalitaOneFont}`}
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
            <p className={`px-2 text-5xl md:text-6xl mb-8 text-center ${styles.oswaldFont}`}>
              Finding reliable <span className="text-main-one font-bold md:font-semibold">news</span> is
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
                  className={`bg-white text-black px-2 text-xl font-bold py-1 dancing rounded-lg ${styles.lalitaOneFont}`}
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
            <p className={`text-4xl font-bold text-black ${styles.lalitaOneFont}`}>
              Solution
            </p>
          </div>
          <div className="">
            <p className={`text-6xl mb-8 text-center ${styles.oswaldFont}`}>
              Finding Reliable News Just Got Easier with{" "}
              <span className="text-main-one md:font-semibold font-bold">News Verse</span>.
            </p>
            <div className="flex justify-center">
              <Link
                to="answer-section" // Target ID of the element to scroll to
                smooth={true} // Enables smooth scrolling
                duration={500} // Scrolling duration in milliseconds
                className="text-center inline-block cursor-pointer"
              >
                <p
                  className={`bg-white text-black px-2 text-xl font-bold py-1 dancing rounded-lg ${styles.lalitaOneFont}`}
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
            <p className={`text-4xl font-bold text-black ${styles.lalitaOneFont}`}>
              Answer
            </p>
          </div>
          <div className="">
            <p className={`text-5xl mb-8 text-center ${styles.oswaldFont}`}>
              With our advanced algorithm,{" "}
              <span className="text-main-one font-bold md:font-semibold">News Verse</span> finds the news
              you need from the entire web.
            </p>
            <div className="flex justify-center">
              <a href="/signup">
                <p
                  className={`bg-white text-black px-2 text-xl font-bold py-1 dancing mx-8 rounded-lg text-center ${styles.lalitaOneFont}`}
                >
                  Sign up now on News Verse for personalized, reliable news !!!
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-col items-center mb-4">
        <div className="border-t-8 border-slate-600 w-[10rem] rounded-lg mb-8"></div>
        <div>
          <p className={`text-lg md:text-xl ${styles.oswaldFont}`}>
            Contact us at{" "}
            <a href="mailto:contact@newsverse.com" className="text-blue-400">
              contact@newsverse.com
            </a>
          </p>
        </div>

        <div className="flex text-2xl py-3 gap-x-4">
          <a href="https://facebook.com/newsverseglobal/" target="_blank">
            <BsFacebook className="cursor-pointer hover:text-main-one" />
          </a>
          <a href="https://instagram.com/newsverseglobal/" target="_blank">
            <BsInstagram className="cursor-pointer hover:text-main-one" />
          </a>
          <a href="https://x.com/newsverseglobal/" target="_blank">
            <BsTwitterX className="cursor-pointer hover:text-main-one" />
          </a>
          <a href="https://t.me/NewsVerseGlobal/" target="_blank">
            <BsTelegram className="cursor-pointer hover:text-main-one" />
          </a>
        </div>

        <div>
          <div className="mb-0.5">
            <p className={`text-center text-xl uppercase ${styles.lalitaOneFont}`}>
              Helpful Links
            </p>
          </div>
          <div className="mb-1">
            <ul className={`flex text-xl ${styles.oswaldFont}`}>
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

        <div className={`text-sm ${styles.oswaldFont}`}>
          <p>Copyright © {new Date().getFullYear()} News Verse</p>
        </div>
      </div>
    </>
  );
}
