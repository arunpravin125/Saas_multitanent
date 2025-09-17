import React from "react";

const Header = () => {
  return (
    <div className="bg-white flex flex-row justify-between rounded-lg border border-gray-200 p-6 ">
      <div className="grid grid-cols-4 gap-6 text-sm">
        <div>
          <label className="text-gray-600 font-medium">ACR Number</label>
          <p className="text-gray-900">101686-30</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Create Date</label>
          <p className="text-gray-900">Friday, August 23, 2024</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Latest Update</label>
          <p className="text-gray-900">Friday, August 23, 2024</p>
        </div>
        <div>
          <label className="text-gray-600 font-medium">Create By</label>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <span className="text-gray-900">Justin Thomas</span>
          </div>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium">
        Action
      </button>
    </div>
  );
};

export default Header;
