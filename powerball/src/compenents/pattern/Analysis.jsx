import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnalysisList } from "./AnalysisList";
import { AnalysisGraph } from "./AnalysisGraph";
import { AnalysisData } from "./AnalysisData";

export function Analysis() {
  const [analysisData, setAnalysisData] = useState({
    list: [],
    graphList: [],
    patternList: [],
  });
  const { list, graphList, patternList } = analysisData;

  const updateAnalysisData = (key, value) => {
    setAnalysisData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log("API 요청 시작");
    fetchAnalysisData();
  }, []);

  const displayDate = (date, separator) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${separator}${month}${separator}${day}`;
  };

  const fetchAnalysisData = async () => {
    const targetDate = new Date();
    const formattedDate = displayDate(targetDate, "-");

    try {
      const response = await axios.post(
        "https://pl.pz.team/minigame/data/credit.php",
        new URLSearchParams({
          category: "analysis",
          gamecode: "powerball_dh",
          startdate: formattedDate,
          enddate: formattedDate,
          gametype: 1,
        })
      );

      //   console.log("데이터 요청 성공:", response);
      const list = response.data.data.list;

      setAnalysisData({
        list: list.slice(0, 30),
        graphList: list.slice(0, 50).reverse(),
        patternList: list.slice(0, 50).reverse(),
      });
    } catch (error) {
      console.error("데이터 요청 실패:", error);
    } finally {
      console.log("데이터 요청 완료");
    }
  };

  return (
    <ul className="bet-list">
      {/* <AnalysisGraph list={graphList} />
      <AnalysisData list={patternList} /> */}
      {list.map((item, index) => (
        <AnalysisList
          key={index}
          roundid={item.info.roundid}
          roundno={item.round}
          result={item.result.extrainfo}
        />
      ))}
    </ul>
  );
}
