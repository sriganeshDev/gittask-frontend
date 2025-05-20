"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GetReadMe } from "@/services/gitHubServices";
import styles from "./OverView.module.css";
import Loader from "@/app/loading";

const base64ToUtf8 = (str) => {
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (error) {
    console.error("Failed to decode base64 content:", error);
    return "";
  }
};

const OverView = () => {
  const { username } = useParams();
  const [userReadMe, setUserReadMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadMe = async () => {
      try {
        setLoading(true);
        const response = await GetReadMe(username);
        if (response?.message !== "Not Found") {
          setUserReadMe(response);
        }
      } catch (error) {
        console.error("Error fetching README:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchReadMe();
  }, [username]);

  const decoded = base64ToUtf8(userReadMe?.content || "");

  return (
    <div className="p-4 overflow-y-auto min-h-[300px] flex justify-center items-center">
      {loading ? (
        <Loader />
      ) : userReadMe ? (
        <div
          className={styles.readmeWrapper}
          dangerouslySetInnerHTML={{ __html: decoded }}
        />
      ) : (
        <p className="border-2 text-gray-500 font-normal border-gray-300 p-8 rounded-xl">
          No README found for this GitHub user.
        </p>
      )}
    </div>
  );
};

export default OverView;
