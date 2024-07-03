import Image from "next/image";
import facebookSvg from "@/assets/svgs/facebook.svg";
import instagramSvg from "@/assets/svgs/instagram.svg";
import whatsappSvg from "@/assets/svgs/whatsapp.svg";
import linkedinSvg from "@/assets/svgs/linkedin.svg";
import ytSvg from "@/assets/svgs/yt.svg";
import discordSvg from "@/assets/svgs/discord.svg";

export default function SContact() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div
          className="flex items-center bg-[#262726] px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#3b3c3b] hover:shadow-lg hover:scale-105"
          onClick={() => {
            window.open("https://facebook.com/newsverseofficial", "_blank");
          }}
        >
          <Image
            src={facebookSvg}
            alt="Facebook Icon"
            width={35}
            className="mr-3 flex-shrink-0"
          />
          <p className="text-sm md:text-lg lg:text-xl font-semibold text-white truncate">
            Follow us on Facebook
          </p>
        </div>

        <div className="flex items-center bg-[#262726] px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#3b3c3b] hover:shadow-lg hover:scale-105">
          <Image
            src={instagramSvg}
            alt="Instagram Icon"
            width={35}
            className="mr-3 flex-shrink-0"
          />
          <p className="text-sm md:text-lg lg:text-xl font-semibold text-white truncate">
            Follow us on Instagram
          </p>
        </div>

        <div className="flex items-center bg-[#262726] px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#3b3c3b] hover:shadow-lg hover:scale-105">
          <Image
            src={whatsappSvg}
            alt="WhatsApp Icon"
            width={35}
            className="mr-3 flex-shrink-0"
          />
          <p className="text-sm md:text-lg lg:text-xl font-semibold text-white truncate">
            Connect on WhatsApp
          </p>
        </div>

        <div className="flex items-center bg-[#262726] px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#3b3c3b] hover:shadow-lg hover:scale-105">
          <Image
            src={linkedinSvg}
            alt="LinkedIn Icon"
            width={35}
            className="mr-3 flex-shrink-0"
          />
          <p className="text-sm md:text-lg lg:text-xl font-semibold text-white truncate">
            Connect on LinkedIn
          </p>
        </div>

        <div className="flex items-center bg-[#262726] px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#3b3c3b] hover:shadow-lg hover:scale-105">
          <Image
            src={ytSvg}
            alt="yt Icon"
            width={35}
            className="mr-3 flex-shrink-0"
          />
          <p className="text-sm md:text-lg lg:text-xl font-semibold text-white truncate">
            Subscribe on YouTube
          </p>
        </div>

        <div className="flex items-center bg-[#262726] px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#3b3c3b] hover:shadow-lg hover:scale-105">
          <Image
            src={discordSvg}
            alt="discord Icon"
            width={35}
            className="mr-3 flex-shrink-0"
          />
          <p className="text-sm md:text-lg lg:text-xl font-semibold text-white truncate">
            Join our Discord Server
          </p>
        </div>
      </div>
    </>
  );
}
