import React from "react";
import TimerIcon from "@mui/icons-material/Timer";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const StatFeatureSection = () => {
  return (
    <div className=" w-full  flex flex-col items-start justify-start  ">
      <div className="max-w-7xl relative top-36 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-12">
        <div className="bg-[#f6f3fe] p-10 rounded-xl shadow-md flex flex-col justify-between lg:col-span-2">
          <div>
            <TimerIcon className="text-black mb-4" />
            <h3 className="text-xl font-semibold mb-4">
              See how <span className="text-purple-600">Lockheed Martin</span>{" "}
              saves time, money, <br />
              and tech muscle with Git Profiler
            </h3>

            <div className="space-y-3 flex flex-col mb-6">
              <div className="bg-white rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm font-medium w-fit">
                <ArrowUpwardIcon className="text-black" />
                80x{" "}
                <span className="text-gray-600">faster CI pipeline builds</span>
              </div>
              <div className="bg-white rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm font-medium w-fit">
                <ArrowDownwardIcon className="text-black" />
                90%{" "}
                <span className="text-gray-600">
                  less time spent on system maintenance
                </span>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="text-black font-medium flex items-center gap-1 hover:underline"
          >
            Read story <span>›</span>
          </a>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#f6f3fe] p-10 shadow-md  rounded-xl h-full flex flex-col justify-between">
            <MonetizationOnIcon className="text-black mb-4" />
            <div>
              <p className="font-semibold mb-2">
                How much is your toolchain costing you?
              </p>
              <a
                href="#"
                className="font-semibold hover:underline flex items-center gap-1"
              >
                Try our ROI calculator <span>›</span>
              </a>
            </div>
          </div>

          <div className="bg-[#f6f3fe] p-10 shadow-md   rounded-br-full h-full flex flex-col justify-between">
            <DescriptionIcon className="text-black mb-4" />
            <div>
              <p className="font-semibold mb-2">
                New to Git Profiler and not sure where to start?
              </p>
              <a
                href="#"
                className="font-semibold hover:underline flex items-center gap-1"
              >
                Explore resources <span>›</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#16121C] w-full text-white px-6 py-20">
        <div className="max-w-7xl relative top-14 mx-auto">
          <p className="text-lg font-semibold mb-2">
            <span className="text-gradient bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              DevSecOps
            </span>
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight">
            From planning to production, Git Profiler
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StatFeatureSection;
