import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUpModal from "../features/sign-up/SignUpModal";
import Reviews from "../features/reviews/Reviews";
import LoginModal from "../features/login/LoginModal";
import { TypewriterEffectSmooth } from "../components/TypewriterEffect";
import { googleSignin } from "../services/user-service.ts";

export default function Index(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && JSON.parse(currentUser).username !== "default") {
      navigate("/home");
    }
  }, []);

  const words = [
    {
      text: "Find",
    },
    {
      text: "your",
    },
    {
      text: "next",
    },
    {
      text: "meal",
    },
    {
      text: "with",
    },
    {
      text: "Foodie",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Finds.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <div className="h-[43rem] w-full relative">
        <div className="flex flex-col items-center justify-center h-[15rem]  ">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <SignUpModal />
            <LoginModal />
          </div>
          <div className="flex mt-2">
            <GoogleLogin
              onSuccess={async (credRes) => {
                console.log(credRes);
                const res = await googleSignin(credRes);
                localStorage.setItem("currentUser", JSON.stringify(res));
                res._id ? navigate("/home") : console.log(res);
              }}
              onError={() => console.log("Fuck")}
            />
          </div>
        </div>
        <Reviews />
      </div>
    </>
  );
}
