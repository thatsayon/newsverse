import React, { useEffect, useState } from "react";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import Cookies from "js-cookie";

interface CustomizeProps {
  onClose: () => void;
}

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#d7f64e",
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#d7f64e",
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const Customize: React.FC<CustomizeProps> = ({ onClose }) => {
  const [showVideo, setShowVideo] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('list');
  const [languageSelect, setLanguageSelect] = useState<('bn' | 'en')[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<Error | null>(null);

  const userToken = Cookies.get("token");

  // Fetch the current settings from the API
  const getCustomize = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/customize/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLayout(data.layout);
        setShowVideo(data.show_video_news);
        setSendEmail(data.send_email);
        setLanguageSelect(data.language); // Ensure this is an array of 'en' and/or 'bn'
        setLoading(false); // Data loaded
      } else {
        throw new Error('Failed to fetch customize data');
      }
    } catch (error) {
      setError(error as Error);
      console.error('Error fetching settings:', error);
      setLoading(false); // Stop loading on error
    }
  };

  // Update the settings on the server
  const patchCustomize = async () => {
    const payload = {
      layout,
      show_video_news: showVideo,
      send_email: sendEmail,
      language: languageSelect,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/customize/`,
        {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const data = await response.json();
      console.log('Updated settings:', data);
    } catch (error) {
      setError(error as Error);
      console.error('Error updating settings:', error);
    }
  };

  // Fetch the initial data on component mount
  useEffect(() => {
    getCustomize();
  }, []);

  // Update the settings when state changes
  useEffect(() => {
    if (userToken && !loading) { // Avoid patching while loading
      patchCustomize();
    }
  }, [showVideo, sendEmail, layout, languageSelect, loading]);

  // Toggle language selection
  const toggleLanguage = (language: 'bn' | 'en') => {
    setLanguageSelect(prev => 
      prev.includes(language) ? prev.filter(lang => lang !== language) : [...prev, language]
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] bg-[rgba(0,0,0,0.75)] overflow-auto font-[sans-serif]">
        <div className="text-gray-100">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.75)] overflow-auto font-[sans-serif]"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md bg-[#1e1e1e] shadow-lg rounded-lg p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center pb-3 border-b border-gray-600">
            <h3 className="text-2xl font-bold flex-1 text-gray-100">
              Customize
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-main-one"
              viewBox="0 0 320.591 320.591"
              onClick={onClose}
            >
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
            </svg>
          </div>

          <div className="mt-2">
            {/* Layout section */}
            <div>
              <div className="text-xl">
                <p>Layout</p>
              </div>

              <div className="flex mt-1">
                <div
                  className={
                    `cursor-pointer p-2 rounded-lg text-xl mr-2 ${layout === 'grid'
                      ? "bg-main-one text-black"
                      : "bg-black text-white"
                    }`
                  }
                  onClick={() => setLayout('grid')}
                >
                  <LuLayoutGrid />
                </div>
                <div
                  className={
                    `cursor-pointer p-2 rounded-lg text-xl ${layout === 'list'
                      ? "bg-main-one text-black"
                      : "bg-black text-white"
                    }`
                  }
                  onClick={() => setLayout('list')}
                >
                  <LuLayoutList />
                </div>
              </div>
            </div>

            {/* Preferences section */}
            <div className="mt-4">
              <div className="text-xl">
                <p>Preferences</p>
              </div>

              <div className="flex items-center mt-2">
                <PinkSwitch
                  {...label}
                  checked={showVideo}
                  onChange={(event) => {
                    setShowVideo(event.target.checked);
                  }}
                />
                <span className="ml-2">Show video news</span>
              </div>

              <div className="flex items-center mt-2">
                <PinkSwitch
                  {...label}
                  checked={sendEmail}
                  onChange={(event) => {
                    setSendEmail(event.target.checked);
                  }}
                />
                <span className="ml-2">Email newsletter update</span>
              </div>
            </div>

            {/* Language selection section */}
            <div className="mt-4">
              <div className="text-xl">
                <p>Language</p>
              </div>

              <div className="grid grid-flow-col mt-2 gap-x-4">
                <div
                  className={`text-center py-2 rounded-lg font-semibold cursor-pointer ${languageSelect.includes('bn') ? 'bg-main-one text-black' : 'bg-black text-white'}`}
                  onClick={() => toggleLanguage('bn')}
                >
                  <p>Bangla</p>
                </div>

                <div
                  className={`text-center py-2 rounded-lg font-semibold cursor-pointer ${languageSelect.includes('en') ? 'bg-main-one text-black' : 'bg-black text-white'}`}
                  onClick={() => toggleLanguage('en')}
                >
                  <p>English</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customize;
