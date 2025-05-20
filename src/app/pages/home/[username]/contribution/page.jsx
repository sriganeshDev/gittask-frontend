"use client";

import ContributionGraph from "@/components/home/ContributionUi";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function GitHubPage() {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    if (!username) return;

    const fetchContributions = async () => {
      try {
        setLoading(true);
        const from = "2024-05-01T00:00:00Z";
        const to = "2025-05-15T23:59:59Z";

        const res = await fetch("/api/github-contributions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, from, to }),
        });

        const data = await res.json();
        setCalendar(data.contributionCalendar);
      } catch (error) {
        console.error("Error fetching contributions:", error);
        setCalendar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  const hasContributions =
    calendar &&
    Array.isArray(calendar.weeks) &&
    calendar.weeks.some((week) =>
      week.contributionDays.some((day) => day.contributionCount > 0)
    );

  return (
    <div className="w-full justify-center items-center flex flex-col min-h-[300px]">
      <h1 className="text-xl font-bold mb-4">GitHub Contribution Calendar</h1>

      {loading ? (
        <div className="loader my-8"></div>
      ) : !calendar ? (
        <p className="text-red-500">Failed to load contribution data.</p>
      ) : hasContributions ? (
        <ContributionGraph contributionCalendar={calendar} />
      ) : (
        <div className="text-center mt-6 text-gray-600">
          <p className="text-lg font-medium mb-2">
            No contributions found for user:{" "}
            <span className="font-bold">{username}</span>
          </p>
          <p className="text-sm text-gray-500">
            Try searching a different username or timeframe.
          </p>
        </div>
      )}
    </div>
  );
}
