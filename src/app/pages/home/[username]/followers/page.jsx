"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FollowerUi from "@/components/home/FollowerUi";

const Followers = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      const userToFetch = username;
      if (!userToFetch) return;

      try {
        setLoading(true);
        const res = await fetch("/api/github-followers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: userToFetch }),
        });

        const data = await res.json();
        setFollowers(data);
      } catch (error) {
        console.error("Error fetching followers:", error);
        setFollowers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div className="space-y-4 min-h-[200px] flex flex-col items-center justify-center">
      {loading ? (
        <div className="loader my-8"></div>
      ) : followers.length > 0 ? (
        followers.map((follower, index) => (
          <FollowerUi
            key={index}
            image={follower.avatarUrl}
            username={follower.login}
            name={follower.name}
            company={follower.company}
            location={follower.location}
            bio={follower.bio}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No followers found.</p>
      )}
    </div>
  );
};

export default Followers;
