import React from "react";

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    if (provider === "kakao") {
      window.location.href = "http://localhost:1271/social-signin/kakao";
      console.log(`${provider} 로그인 시도`);
    }
    if (provider === "google") {
      window.location.href = "http://localhost:1271/social-signin/google";
      console.log(`${provider} 로그인 시도`);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={() => handleSocialLogin("google")}
        className="w-[180px] mx-auto flex items-center justify-center py-2 px-4 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-sm"
      >
        <svg
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
            fill="#4285F4"
          />
        </svg>
        Google 로그인
      </button>

      <button
        onClick={() => handleSocialLogin("kakao")}
        className="w-[180px] mx-auto flex items-center justify-center py-2 px-4 rounded-md text-gray-800 font-medium bg-yellow-300 hover:bg-yellow-400 transition-colors duration-200 text-sm"
      >
        <svg
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C5.9 3 1 6.9 1 11.3c0 2.5 1.4 4.7 3.5 6.3-.4 1.6-1.4 5.2-1.5 5.6 0 .1 0 .2.1.3.1.1.3.2.5.1l6.6-3.7c.6.1 1.2.1 1.8.1 6.1 0 11-3.9 11-8.7S18.1 3 12 3"
            fill="#000000"
          />
        </svg>
        Kakao 로그인
      </button>
    </div>
  );
};

export default SocialLogin;
