import { useEffect, useState } from "react";

interface DataItem {
  category: "Reaction" | "Memory" | "Verbal" | "Visual";
  score: number;
  icon: string;
}

export const useResultSummary = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [averageScore, setAverageScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText}`
          );
        }
        const jsonData = await response.json();
        setData(jsonData);

        // Calculate the total score from the fetched data
        const totalScore = jsonData.reduce(
          (sum: number, item: DataItem) => sum + item.score,
          0
        );

        // Calculate the average score, rounding to the nearest integer
        const calculatedAverage = Math.round(totalScore / jsonData.length);
        setAverageScore(calculatedAverage);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { data, averageScore, loading };
};
