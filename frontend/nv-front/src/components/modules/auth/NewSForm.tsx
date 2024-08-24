"use client";
import { useForm, Controller } from "react-hook-form";
import "./signupStyle.css";
import { useState, useMemo, useEffect, useRef, memo } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MdArrowBackIos } from "react-icons/md";
import {
  TextField,
  styled,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import CheckMail from "./auth_components/CheckMail";

const WhiteBackgroundTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

const topics = [
  "international",
  "sports",
  "politics",
  "technology",
  "business",
  "entertainment",
  "lifestyle",
  "weather",
  "bangladesh",
  "travel",
  "health",
  "markets",
  "jobs",
  "consumer",
  "cybersecurity",
  "automation",
  "privacy",
  "climate",
  "science",
  "disasters",
  "conservation",
  "research",
  "healthcare",
  "mental",
  "athletes",
  "teams",
  "tournaments",
  "film",
  "music",
  "celebrities",
  "art",
  "literature",
  "society",
  "education",
  "food",
  "global",
  "crime",
  "opinion",
];

export default function NewForm() {
  const [step, setStep] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showTopicWarning, setShowTopicWarning] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [emailNotExist, setEmailNotExist] = useState(false);
  const [usernameNotExist, setUsernameNotExist] = useState(false);
  const [passStrong, setPassStrong] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState(false);
  const [showLanguageWarning, setShowLanguageWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");
  const [passStrongMessage, setPassStrongMessage] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const [enSelect, setEnSelect] = useState(false);
  const [bnSelect, setBnSelect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  // const handleTopicClick = (topic: string) => {
  //   setSelectedTopics((prevSelectedTopics) => {
  //     const newTopics = prevSelectedTopics.includes(topic)
  //       ? prevSelectedTopics.filter((t) => t !== topic)
  //       : [...prevSelectedTopics, topic];
  //     return newTopics;
  //   });
  // };

  const checkEmail = async (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_email: inputValue }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setEmailNotExist(true);
          setErr(false);
        } else if (response.status === 500) {
          setErr(true);
          setEmailNotExist(false);
        } else {
          setErr(true);
          setEmailNotExist(false);
        }
      } else {
        setEmailNotExist(false);
        setErr(false);
      }
    } catch (error) {
      // Network or other fetch related errors
      console.error("Fetch error:", error);
    }
  };

  const checkUsername = async (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-username/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: inputValue }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          setUsernameNotExist(true);
          setErr(false);
        } else if (response.status === 500) {
          setErr(true);
          setUsernameNotExist(false);
        }
      } else {
        setUsernameNotExist(false);
        setErr(false);
      }
    } catch (error) {
      // Network or other fetch related errors
      console.error("Fetch error:", error);
    }
  };

  const checkPassStrongorNot = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Password strength criteria
    const hasUpperCase = /[A-Z]/.test(inputValue);
    const hasLowerCase = /[a-z]/.test(inputValue);
    const hasDigit = /\d/.test(inputValue);
    const hasSpecialChar = /[#@$!%*?&]/.test(inputValue);
    const hasMinLength = inputValue.length >= 8;

    // Determine the strength of the password
    const isPasswordStrong =
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar &&
      hasMinLength;

    // Set password strength flag
    setPassStrong(!isPasswordStrong);

    // Set the message based on which criteria are not met
    if (!hasUpperCase) {
      setPassStrongMessage(
        "Password must include at least one uppercase letter."
      );
    } else if (!hasLowerCase) {
      setPassStrongMessage(
        "Password must include at least one lowercase letter."
      );
    } else if (!hasDigit) {
      setPassStrongMessage("Password must include at least one number.");
    } else if (!hasSpecialChar) {
      setPassStrongMessage(
        "Password must include at least one special character (@, $, !, %, *, ?, &)."
      );
    } else if (!hasMinLength) {
      setPassStrongMessage("Password must be at least 8 characters long.");
    } else {
      setPassStrongMessage(""); // No issues, clear any previous messages
    }
  };

  useEffect(() => {
    setValue("favourite_topics", selectedTopics);
  }, [selectedTopics, setValue]);

  const Step1 = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false); // Controls the visibility of the password
    const [confirmShowPassword, setConfirmShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

    // Toggle function for confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
      setConfirmShowPassword((prevState) => !prevState);
    };

    return (
      <div>
        <h2 className="text-center py-2 text-2xl uppercase font-semibold">
          Create a <span className="text-main-one">News Verse</span> account
        </h2>

        {/* Email input field with validation */}
        <div className="mb-3">
          <div className="inputBox">
            <input
              placeholder=" "
              type="email" // Specifies the input type for email
              {...register("email", {
                required: "Email is required", // Email is required
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for email validation
                  message: "Enter a valid email address", // Custom error message for invalid email format
                },
              })}
              onBlur={checkEmail}
            />
            <i>Email</i>
            {/* Display error message if the email is invalid */}
            {errors.email && (
              <span className="text-red-500">
                {errors.email?.message?.toString()}
              </span> // Safely extract and cast the error message
            )}
            {/* Display email warning if email format is invalid */}
            {emailWarning && (
              <span className="text-red-500">{emailWarning}</span>
            )}

            {emailNotExist && (
              <p className="text-red-500 text-center mt-4">
                The email address already exists
              </p>
            )}
          </div>
        </div>

        {/* Username, full name, password, and confirm password input fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-4">
          <div className="inputBox">
            <input
              placeholder=" "
              {...register("username", { required: "Username is required" })}
              onBlur={checkUsername}
            />
            <i>Username</i>
            {/* Display error message if the username is not provided */}
            {errors.username && (
              <span className="text-red-500">
                {errors.username?.message?.toString()}
              </span> // Safely extract and cast the error message
            )}
          </div>
          <div className="inputBox">
            <input
              placeholder=" "
              {...register("full_name", { required: "Full Name is required" })}
            />
            <i>Full Name</i>
            {errors.full_name && (
              <span className="text-red-500">
                {errors.full_name?.message?.toString()}
              </span> // Safely extract and cast the error message
            )}
          </div>

          <div className="inputBox">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password type based on visibility
              placeholder=" "
              {...register("password", { required: "Password is required" })}
              onBlur={checkPassStrongorNot}
            />
            <i>Password</i>
            {/* Toggle password visibility icon */}
            {showPassword ? (
              <IoMdEyeOff
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoMdEye
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            )}
            {/* Display error message if the password is not provided */}
            {errors.password && (
              <span className="text-red-500">
                {errors.password?.message?.toString()}
              </span> // Safely extract and cast the error message
            )}
          </div>

          <div className="inputBox">
            <input
              type={confirmShowPassword ? "text" : "password"} // Toggle between text and password type based on visibility
              placeholder=" "
              {...register("confirm_password", {
                required: "Confirm password is required",
              })}
            />
            <i>Confirm Password</i>
            {/* Toggle confirm password visibility icon */}
            {confirmShowPassword ? (
              <IoMdEyeOff
                className="password-icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <IoMdEye
                className="password-icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
            {/* Display error message if the confirm password is not provided */}
            {errors.confirm_password && (
              <span className="text-red-500">
                {errors.confirm_password?.message?.toString()}
              </span>
            )}
          </div>
        </div>

        {/* Display warning message if not all fields are filled */}
        {showWarning && (
          <p className="text-red-500 text-center mt-4">
            Please fill in all required fields to proceed to the next step.
          </p>
        )}
        {/* Display warning message if passwords do not match */}
        {passwordCheck && (
          <p className="text-red-500 text-center mt-4">
            Password & Confirm Password should be the same.
          </p>
        )}

        {usernameNotExist && (
          <p className="text-red-500 text-center mt-4">
            Username is already taken
          </p>
        )}

        {passStrong && (
          <p className="text-red-500 text-center mt-4">{passStrongMessage}</p>
        )}
      </div>
    );
  };

  const Step2 = () => {
    const GenderField = register("gender", { required: true });

    return (
      <div>
        <h2 className="text-center py-2 text-2xl uppercase font-semibold">
          Birthdate <span className="text-main-one">&</span> Gender
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-4">
          <div style={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="date_of_birth"
                control={control}
                defaultValue={null} // Set a default value
                render={({ field }) => (
                  <DatePicker
                    slots={{
                      textField: WhiteBackgroundTextField,
                    }}
                    format="YYYY-MM-DD"
                    value={field.value ? dayjs(field.value) : null} // Convert field.value to a dayjs object if it's not null
                    onChange={(newValue) => {
                      // Check if newValue is a valid dayjs object
                      if (newValue && newValue.isValid && newValue.isValid()) {
                        // Convert newValue (dayjs object) to a string in the desired format
                        const formattedDate = newValue.format("YYYY-MM-DD");
                        // Call the onChange handler from field with the formatted date
                        field.onChange(formattedDate);
                      } else {
                        // If newValue is not a valid dayjs object, set field value to null
                        field.onChange(null);
                      }
                    }}
                    sx={{ width: "100%" }} // Ensure the DatePicker itself takes full width
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#222",
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              >
                <InputLabel id="gender-select-label" sx={{ color: "white" }}>
                  Gender
                </InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue="" // Default to an empty string
                  render={({ field }) => (
                    <Select
                      labelId="gender-select-label"
                      id="gender-select"
                      label="Gender"
                      value={field.value || ""} // Show placeholder if no value is selected
                      onChange={(e) => field.onChange(e.target.value)} // Update the form value
                      sx={{ color: "white" }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
          </div>
        </div>
        {showWarning && (
          <p className="text-red-500 text-center mt-4">
            Please fill in all required fields to proceed to the next step.
          </p>
        )}
      </div>
    );
  };

  const Step3 = () => {
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");

    useEffect(() => {
      // Update form values based on selection state
      const selectedLanguages = [];
      if (enSelect) selectedLanguages.push("en");
      if (bnSelect) selectedLanguages.push("bn");

      // Update the form state with selected languages
      setValue("lang", selectedLanguages);
      const [country, language] = watch(["country", "language"]);
      setCountry(country);
    }, [enSelect, bnSelect, setValue, showWarning]);

    return (
      <div>
        <h2 className="text-center py-2 text-2xl uppercase font-semibold">
          Enter your <span className="text-main-one">address</span> to receive
          <span className="text-main-one"> our</span> best
        </h2>

        <div className="">
          <div className="styledSelectBox mb-4">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountryDropdown
                  value={field.value || country} // Use local state for the value
                  onChange={(val) => {
                    setCountry(val); // Update local state
                    field.onChange(val); // Update form state
                  }}
                />
              )}
            />
          </div>

          <div className="styledSelectBox mb-4">
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <RegionDropdown
                  country={country} // Use country state to filter regions
                  value={field.value || region} // Use local state for the value
                  onChange={(val) => {
                    setRegion(val); // Update local state
                    field.onChange(val); // Update form state
                  }}
                />
              )}
            />
          </div>

          <div className="inputBox mb-2">
            <input
              type="text"
              placeholder=" "
              {...register("address", {
                required: "Present address is required",
              })}
            />
            <i>Present Address</i>
          </div>

          {showWarning && (
            <p className="text-red-500 text-center mt-4">
              Please fill in all required fields to proceed to the next step.
            </p>
          )}
          <div>
            <h4 className="text-center py-4 text-xl font-semibold select-none">
              Select Your <span className="text-main-one">Preferred</span>{" "}
              Language(s): Choose <span className="text-main-one">one</span> or{" "}
              <span className="text-main-one">both</span>
            </h4>

            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`${enSelect
                      ? "langField bg-main-one text-black"
                      : "langField bg-[#323332] text-white"
                      }`}
                    onClick={() => setEnSelect(!enSelect)}
                  >
                    <p className="uppercase text-center text-lg font-semibold select-none">
                      English
                    </p>
                  </div>
                  <div
                    className={`${bnSelect
                      ? "langField bg-main-one text-black"
                      : "langField bg-[#323332] text-white"
                      }`}
                    onClick={() => setBnSelect(!bnSelect)}
                  >
                    <p className="uppercase text-center text-lg font-semibold select-none">
                      Bangla
                    </p>
                  </div>
                </div>
              )}
            />
            {showLanguageWarning && (
              <p className="text-red-500 text-center mt-4">
                Please choose at least one language to continue
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };


  const Step4 = () => {
    const [topicN, setTopicN] = useState<string[]>(() => {
      const savedTopics = sessionStorage.getItem('selectedTopics');
      return savedTopics ? JSON.parse(savedTopics) : [];
    });

    const getTopicButtonClass = (topic: string) => {
      return topicN.includes(topic)
        ? "bg-main-one text-black rounded-lg"
        : "bg-[#131213] text-white rounded-lg";
    };

    useEffect(() => {
      // Save selected topics to sessionStorage whenever topicN changes
      sessionStorage.setItem('selectedTopics', JSON.stringify(topicN));
      setValue('favourite_topics', topicN);
    }, [topicN]);

    const handleTopicClick = (topic: string) => {
      if (!topicN.includes(topic)) {
        setTopicN([...topicN, topic]);
      } else {
        setTopicN(topicN.filter((t) => t !== topic)); // Remove topic if already selected
      }
    };

    return (
      <div>
        <h2 className="text-center py-2 text-2xl uppercase font-semibold">
          Select your <b className="text-main-one">favourite</b> topics
        </h2>

        <div
          className="scrollable-div"
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxHeight: "200px",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          }}
        >
          {topics.map((val) => (
            <button
              key={val}
              type="button"
              style={{
                margin: "5px",
                cursor: "pointer",
              }}
              className={getTopicButtonClass(val)}
              onClick={() => handleTopicClick(val)}
            >
              <p className="inline-block rounded-lg px-3 py-2 select-none">
                {val}
              </p>
            </button>
          ))}
        </div>

        {showTopicWarning && (
          <p className="text-red-500 text-center mt-4">
            Please select at least three of your favorite topics to continue.
          </p>
        )}
      </div>
    );
  };


  const Step5 = () => {
    return (
      <>
        <CheckMail />
      </>
    );
  };
  const steps = useMemo(
    () => [
      <Step1 key="step1" />,
      <Step2 key="step2" />,
      <Step3 key="step3" />,
      <Step4 key="step4" />,
      <Step5 key="step5" />,
    ],
    [
      showWarning,
      passwordCheck,
      emailWarning,
      selectedTopics,
      showTopicWarning,
      showLanguageWarning,
      enSelect,
      bnSelect,
      emailNotExist,
      usernameNotExist,
      passStrong,
      passStrongMessage,
    ]
  );

  const signupRequest = async (data: any) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      setLoading(false);
    }
  };


  const nextStep = () => {
    const step1Values = watch([
      "email",
      "username",
      "full_name",
      "password",
      "confirm_password",
    ]);

    const complete = step1Values.every((value: any) => value?.trim() !== "");

    const step2Values = watch(["date_of_birth", "gender"]);

    const [password, confirm_password] = watch([
      "password",
      "confirm_password",
    ]);

    const address_and_language = watch([
      "country",
      "region",
      "address",
      "lang",
    ]);

    const email = watch("email");
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isEmailValid) {
      setEmailWarning("Enter a valid email address");
    } else {
      setEmailWarning("");
    }

    if (password !== confirm_password) {
      setPasswordCheck(true);
      setShowWarning(false);
    } else if (
      complete &&
      isEmailValid &&
      password === confirm_password &&
      !emailNotExist &&
      !usernameNotExist &&
      !passStrong &&
      step === 0
    ) {
      setShowWarning(false);
      setPasswordCheck(false);
      setStep((prevStep) => prevStep + 1);
    } else if (!complete) {
      setShowWarning(true);
      setPasswordCheck(false);
    }

    if (step === 1) {
      const [date_of_birth, gender] = step2Values;

      if (!date_of_birth?.trim() || !gender?.trim()) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
        setStep((prevStep) => prevStep + 1);
      }
    }

    if (step === 2) {
      const [country, region, address, language] = address_and_language;

      if (!country?.trim() || !region?.trim() || !address?.trim()) {
        const [language] = watch(["language"]);
        setShowWarning(true);
      } else if (language.length < 1) {
        setShowLanguageWarning(true);
        setShowWarning(false);
      } else {
        setShowLanguageWarning(false);
        setShowWarning(false);
        setStep((prevStep) => prevStep + 1);
      }
    }

    if (step === 3) {
      const ST = sessionStorage.getItem("selectedTopics");
      const parsedTopic = ST ? JSON.parse(ST) : [];
      if(parsedTopic.length < 3) {
        setShowTopicWarning(true);
      } else if (parsedTopic.length >= 3) {
        setShowTopicWarning(false);
        handleSubmit(signupRequest)();
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      nextStep();
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center" onKeyPress={handleKeyPress} tabIndex={0}>
        <div
          style={{ boxShadow: "0 15px 35px rgba(0, 0, 0, 0.9)" }}
          className="bg-[#222] lg:w-3/6 w-11/12 lg:px-12 lg:py-10 py-5 px-5"
        >
          {
            step !== 4 && (
              <MdArrowBackIos className={
                step === 0
                  ? "text-2xl cursor-pointer invisible"
                  : "text-2xl cursor-pointer"
              } onClick={prevStep} />
            )
          }
          <div>{steps[step]}</div>
          {step !== 4 && (
            <div className="flex justify-between mt-4">
              <div></div>
              <button
                onClick={nextStep}
                className="bg-main-one text-[#222] font-semibold px-4 py-1 text-2xl rounded select-none"
              // disabled={showWarning ? true : false}
              >
                {step === 3 ? loading ? "Loading..." : "Create Account" : "Next"}
              </button>
            </div>
          )}
          {/* <button onClick={handleSubmit(signupRequest)}>Get Data</button> */}
        </div>
      </div>
    </>
  );
}
