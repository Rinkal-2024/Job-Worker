"use client";

import { useEffect, useState } from "react";

interface ImportLog {
  _id: string;
  fileName: string;
  timestamp: string;
  totalFetched: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: string[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).replace(",", "");
}

export default function ImportHistoryPage() {
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImportLogs();
  }, []);

  async function fetchImportLogs() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/import-history`);
      if (!res.ok) throw new Error("Failed to fetch import logs");
      const data = await res.json();
      setLogs(data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Import History</h1>
      {loading ? (
  <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        strokeWidth="10"
        stroke="#0070f3"
        strokeDasharray="164.93361431346415 56.97787143782138"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  </div>
) : logs.length === 0 ? (
        <p>No import logs found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ccc",
          }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>File Name</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>import Date Time</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Total Fetched</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>New Jobs</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Updated Jobs</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Failed Jobs Count</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td style={{ border: "1px solid #ccc", padding: "8px", maxWidth: 250, wordBreak: "break-word" }}>
                  {log.fileName}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {formatDate(log.timestamp)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.totalFetched}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.newJobs}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.updatedJobs}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{log.failedJobs?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
