"use client";
import Image from "next/image";
import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/navigation";
// import { useCommonContext } from "@/app/context/CommonContext";

const FollowerUi = ({ name, username, company, location, bio, image }) => {
  const router = useRouter();
  const ViewProfile = () => {
    router.push(`/pages/home/${username}`);
  };
  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Image
            src={image}
            width={64}
            height={64}
            className="rounded-full object-cover"
            alt={username}
          />

          <div className="flex flex-col gap-1 text-sm">
            <p
              className="text-base sm:text-lg  cursor-pointer"
              onClick={ViewProfile}
            >
              {username}
            </p>
            <p className="text-gray-600">@{username}</p>
            {bio && <p className="text-gray-700">{bio}</p>}

            {(company || location) && (
              <div className="flex flex-wrap gap-4 mt-1 text-gray-700">
                {company && (
                  <div className="flex items-center gap-1">
                    <ApartmentIcon sx={{ fontSize: 18 }} />
                    <span>{company}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-1">
                    <LocationOnIcon sx={{ fontSize: 18 }} />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sm:self-center">
          <button className="px-4 py-1 text-black text-sm border rounded border-gray-300 hover:bg-gray-300 w-full transition-all sm:w-auto">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowerUi;
