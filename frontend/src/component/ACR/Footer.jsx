import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-500 text-white py-3 px-6">
      <div className="flex items-center justify-between text-sm">
        <div>© TheDailyCompliance 2025</div>
        <div className="flex items-center space-x-4">
          <span>All rights reserved</span>
          <span>|</span>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
