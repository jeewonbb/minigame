import React, { useState, useEffect } from "react";
import axios from "axios";
import { HistoryList } from "./HistoryList";

export function History() {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    apiTest();
  }, []);

  const apiTest = () => {
    axios
      .post(
        "https://pl.pz.team/minigame/data/credit.php",
        new URLSearchParams({
          category: "history",
          token:
            "GEdR9jerB1iReqIkgl%2bxeOzYGfoKymrwLLOe7%2fzMvCbENOcqNa%2brlf3cUKu64Bt1maCx8%2f2Yr5Y%2feU9EpaKnmzHH%2bYwQuxH9",
          pageno: 1,
          pagesize: 100,
        })
      )
      .then(function (response) {
        console.log("성공", response);

        let prev_round = "";
        let historyList = [];

        for (let i = 0; i < response.data.data.list.length; i++) {
          if (prev_round !== response.data.data.list[i].roundinfo.roundid) {
            historyList.push({
              roundid: response.data.data.list[i].roundinfo.roundid,
              roundno: response.data.data.list[i].roundinfo.roundno,
              registerdate: response.data.data.list[i].betinfo.registerdate,
              result: response.data.data.list[i].gameinfo.extrainfo,
              betamount: response.data.data.list[i].betinfo.betamount,
              winamount: response.data.data.list[i].betinfo.winamount,
              list: [response.data.data.list[i].betinfo],
            });
          } else {
            historyList[historyList.length - 1].list.push(
              response.data.data.list[i].betinfo
            );
            historyList[historyList.length - 1].betamount =
              historyList[historyList.length - 1].betamount +
              response.data.data.list[i].betinfo.betamount;
            historyList[historyList.length - 1].winamount =
              historyList[historyList.length - 1].winamount +
              response.data.data.list[i].betinfo.winamount;
          }
          prev_round = response.data.data.list[i].roundinfo.roundid;
        }
        // console.log(historyList);
        setHistoryList(historyList);
      })
      .catch(function (error) {
        console.log("실패", error);
      })
      .then(function () {
        console.log("데이터 요청 완료");
      });
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
