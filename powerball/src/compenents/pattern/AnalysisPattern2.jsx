import React, { useState, useEffect } from "react";
import { fetchAnalysisData } from "./fetchAnalysisData";
import { AnalysisData } from "./AnalysisData";
import { AnalysisData2 } from "./AnalysisData2";

export function AnalysisPattern2() {
  const [analysisData, setAnalysisData] = useState({
    list: [],
    graphList: [],
    patternList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const targetDate = new Date();
      const formattedDate = targetDate.toISOString().split("T")[0];
      const data = await fetchAnalysisData(formattedDate);
      setAnalysisData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <AnalysisData2 list={analysisData.patternList} />
    </>
  );
}
