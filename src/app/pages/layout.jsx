import Headers from "@/components/headers/Headers";
import SideProfile from "@/components/home/SideProfile";
import React from "react";

export default function HomeLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Headers />
      <div className="w-full flex lg:gap-3 bg-gray-50 lg:px-20 justify-around max-md:flex-col flex-1">
        <div className="lg:w-1/4 lg:pt-5 py-2 flex justify-center items-start">
          <div className="sticky top-20 w-full max-w-md lg:p-6 max-md:p-3 flex flex-col justify-center items-center rounded-2xl border-2 border-gray-200 lg:space-y-4 max-md:space-y-1.5 bg-white shadow-md">
            <SideProfile />
          </div>
        </div>

        <div className="w-3/4 pt-5 flex justify-center items-start max-md:w-full">
          <div
            className="w-full lg:p-6 p-4 flex flex-col  justify-center items-center rounded-2xl border-2 border-gray-200 lg:space-y-3 max-md:space-y-2 bg-white shadow-md"
            style={{ height: "85vh", overflowY: "auto" }}
          >
            <div className="w-full space-y-6 max-md:space-y-2 overflow-y-auto hide-scrollbar">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
