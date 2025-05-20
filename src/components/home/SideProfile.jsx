"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetProfile, GetFollowers } from "@/services/gitHubServices";
import { Avatar, Box, Typography, Stack } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const SideProfile = () => {
  const [userData, setUserData] = useState({});
  const [userFollowerList, setUserFollowerList] = useState([]);

  const router = useRouter();
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      try {
        const [profileRes, followersRes] = await Promise.all([
          GetProfile(username),
          GetFollowers(username),
        ]);
        setUserData(profileRes);
        setUserFollowerList(followersRes);
      } catch (error) {
        console.error("Error fetching profile/followers:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="min-h-[600px] w-full flex justify-center items-start bg-white">
      <div className="w-full flex flex-col space-y-4">
        <div className="w-full aspect-square relative">
          <img
            src={userData.avatar_url}
            alt="Avatar"
            className="object-cover w-full h-full rounded-full border-2 border-gray-300"
          />
        </div>

        <div className="w-full space-y-1 text-center sm:text-left">
          <h2 className="text-lg font-semibold">{userData.name}</h2>
          <h3 className="text-sm text-gray-600">{userData.login} · he/him</h3>
        </div>

        <button className="w-full py-2 text-sm font-medium border-2 rounded-xl border-gray-300 hover:bg-gray-100 transition">
          Follow
        </button>

        <p className="text-sm text-gray-600 px-2 py-2 text-center sm:text-left">
          {userData.bio}
        </p>

        {userData.followers > 0 || userData.following > 0 ? (
          <Box px={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {userData.followers > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <GroupIcon sx={{ fontSize: 16, color: "gray" }} />
                  <Typography variant="body2" color="text.secondary">
                    <span className="font-bold text-gray-600">
                      {userData.followers}
                    </span>{" "}
                    <span
                      className="cursor-pointer hover:text-gray-600"
                      onClick={() =>
                        router.push(`/pages/home/${username}/followers`)
                      }
                    >
                      followers
                    </span>
                  </Typography>
                </Stack>
              )}
              {userData.following > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <PersonAddIcon sx={{ fontSize: 16, color: "gray" }} />
                  <Typography variant="body2" color="text.secondary">
                    <span className="font-bold text-gray-600">
                      {userData.following}
                    </span>{" "}
                    <span
                      className="cursor-pointer hover:text-gray-600"
                      onClick={() =>
                        router.push(`/pages/home/${username}/followings`)
                      }
                    >
                      following
                    </span>
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        ) : (
          <Box px={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              className="text-gray-500"
            >
              This user has no followers or following yet.
            </Typography>
          </Box>
        )}

        <div className="w-full flex flex-col gap-1 px-2 text-sm text-gray-600">
          {userData.user_view_type && (
            <div className="flex items-center gap-2">
              <AdminPanelSettingsIcon sx={{ fontSize: 18 }} />
              <p>{userData.user_view_type}</p>
            </div>
          )}
          {userData.company && (
            <div className="flex items-center gap-2">
              <ApartmentIcon sx={{ fontSize: 18 }} />
              <p>{userData.company}</p>
            </div>
          )}
          {userData.location && (
            <div className="flex items-center gap-2">
              <LocationOnIcon sx={{ fontSize: 18 }} />
              <p>{userData.location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideProfile;
