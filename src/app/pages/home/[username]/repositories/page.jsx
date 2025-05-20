"use client";

import RepoCard from "@/components/home/RepoUi";
import { GetRepositories } from "@/services/gitHubServices";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Repositories = () => {
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  const GetRepos = async () => {
    try {
      setLoading(true);
      const response = await GetRepositories(username);
      setUserRepos(response);
    } catch (error) {
      console.error("Error fetching repositories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRepos.length === 0 && username) {
      GetRepos();
    }
  }, [username]);

  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center p-4">
      {loading ? (
        <div className="loader my-8"></div>
      ) : userRepos.length > 0 ? (
        <div className="grid gap-4 w-full">
          {userRepos.map((repo, index) => (
            <RepoCard
              key={index}
              full_name={repo?.full_name}
              topics={repo?.topics}
              visibility={repo?.visibility}
              description={repo?.description}
              language={repo?.language}
              created_at={repo?.created_at}
              stargazers_count={repo?.stargazers_count}
              updated_at={repo?.updated_at}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No repositories found.</p>
      )}
    </div>
  );
};

export default React.memo(Repositories);
