import React, { useState, useEffect } from "react";
import axios from "axios";
import { HistoryList } from "./HistoryList";

export function History() {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const API_URL = "https://pl.pz.team/minigame/data/credit.php";
  const API_PARAMS = {
    category: "history",
    token:
      "GEdR9jerB1iReqIkgl%2bxeOzYGfoKymrwLLOe7%2fzMvCbENOcqNa%2brlf3cUKu64Bt1maCx8%2f2Yr5Y%2feU9EpaKnmzHH%2bYwQuxH9",
    pageno: 1,
    pagesize: 100,
  };

  const fetchHistoryData = async () => {
    try {
      const response = await axios.post(
        API_URL,
        new URLSearchParams(API_PARAMS)
      );

      // console.log("성공:", response);

      const list = response.data.data.list;
      const formattedHistory = formatHistoryData(list);
      setHistoryList(formattedHistory);
    } catch (error) {
      // console.error("데이터 요청 실패:", error);
    } finally {
      console.log("데이터 요청 완료");
    }
  };

  const formatHistoryData = (list) => {
    let prevRoundId = "";
    const formattedList = [];

    for (const item of list) {
      const { roundinfo, betinfo, gameinfo } = item;
      const { roundid, roundno } = roundinfo;
      const { registerdate, betamount, winamount } = betinfo;
      const { extrainfo } = gameinfo;

      if (prevRoundId !== roundid) {
        formattedList.push({
          roundid,
          roundno,
          registerdate,
          result: extrainfo,
          betamount,
          winamount,
          list: [betinfo],
        });
      } else {
        const lastEntry = formattedList[formattedList.length - 1];
        lastEntry.list.push(betinfo);
        lastEntry.betamount += betamount;
        lastEntry.winamount += winamount;
      }

      prevRoundId = roundid;
    }

    return formattedList;
  };

  return (
    <ul className="bet-list">
      {historyList.map((array, index) => (
        <HistoryList
          key={index}
          roundid={array.roundid}
          roundno={array.roundno}
          date={array.registerdate}
          result={array.result}
          bet={array.list}
          betamount={array.betamount}
          winamount={array.winamount}
        />
      ))}
    </ul>
  );
}
