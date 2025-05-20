import React from "react";
import Image from "next/image";

import { cardsData } from "../components/utils/Datas";
import StatFeatureGrid from "../components/onboardingScreen/StatFeature";

import Headers from "../components/headers/Headers";

const OnboardingScreen = () => {
  return (
    <div className="relative">
      <Headers />

      <section className="relative flex flex-col justify-evenly min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(
                circle at top right,
                #efbec4 0%,
                #f5d4d6 10%,

                #eddaec 20%,      
                #f6f0fa 30%,      
                transparent 80%
              )
            `,
            opacity: 1,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Balance speed and security in a single platform
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Automate software delivery, boost productivity, and secure your
              end-to-end software supply chain.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="bg-black text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-900">
                Discover the platform
              </button>
              <a href="#" className="text-black font-medium hover:underline">
                What is Git Profiler? <span className="inline-block">→</span>
              </a>
            </div>
          </div>

          <div className="relative w-full h-[32rem]">
            <Image
              src="/mockupImage.png"
              alt="UI Mockup"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid relative mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-30">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-6 bg-white shadow shadow-gray-300 transition"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold whitespace-pre-line mb-2">
                {card.title}
              </h3>
              <p className="text-gray-700 mb-4">{card.description}</p>
              {card.button && (
                <button className="text-sm bg-purple-100 text-purple-800 px-4 py-1 rounded-full">
                  {card.button}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-start flex-col w-full">
          <StatFeatureGrid />
        </div>
      </section>
    </div>
  );
};

export default OnboardingScreen;
