import React from "react";

const DonationBanner = () => (
  <div className="w-full bg-gradient-to-r from-orange-700/75 via-green-700/75 to-white/75 py-4 px-6 flex justify-center items-center shadow-xl mb-8 rounded-xl">
    <span className="text-white text-lg font-semibold mr-4">
      We will never forget you, Alex!
    </span>
    <a
      href="https://suicideprevention.ca/ways-to-donate/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-pink-700 font-bold px-5 py-2 rounded shadow-md hover:bg-pink-100 transition"
    >
      Donate to Canadian suicide prevention
    </a>
  </div>
);

export default DonationBanner;
