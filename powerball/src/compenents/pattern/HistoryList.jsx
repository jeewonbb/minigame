import React from "react";
import dayjs from "dayjs";
import { HistoryBet } from "./HistoryBet";

export function HistoryList(props) {
  const addComma = (num) => {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let result1 = "";
  let result2 = "";
  let result3 = "";
  let result4 = "";
  let result5 = "";
  let round = props.roundno.split("-");
  if (props.result === undefined) {
    return;
  } else {
    if (props.result.powerball_odd_even === "ODD")
      result1 = (
        <>
          <span className="ball odd">홀</span>
          <i className="pwb">P</i>
        </>
      );
    else
      result1 = (
        <>
          <span className="ball even">짝</span>
          <i className="pwb">P</i>
        </>
      );

    if (props.result.powerball_unover === "UNDER")
      result2 = (
        <>
          <span className="ball under">언</span>
          <i className="pwb">P</i>
        </>
      );
    else
      result2 = (
        <>
          <span className="ball over">오</span>
          <i className="pwb">P</i>
        </>
      );

    if (props.result.sum_odd_even === "ODD")
      result3 = <span className="ball odd">홀</span>;
    else result3 = <span className="ball even">짝</span>;

    if (props.result.sum_unover === "UNDER")
      result4 = <span className="ball under">언</span>;
    else result4 = <span className="ball over">오</span>;

    if (props.result.sum_size === "H")
      result5 = <span className="ball large">대</span>;
    else if (props.result.sum_size === "M")
      result5 = <span className="ball middle">중</span>;
    else result5 = <span className="ball small">소</span>;
    // console.log(round);
  }

  return (
    <>
      <li>
        <div className="panel-head">
          <p>
            {round[1]}회차
            <span>({props.roundid})</span>
          </p>
          <time dateTime={props.date}>
            {dayjs(props.date).format("YYYY.MM.DD HH:mm:ss")}
          </time>
        </div>
        <div className="panel-body">
          <div className="result-ball">
            <div>
              <p>{result1}</p>
              <p>{result2}</p>
            </div>
            <div>
              <p>{result3}</p>
              <p>{result4}</p>
              <p>{result5}</p>
            </div>
          </div>
          <div className="bet-account">
            <p>총 베팅</p>
            <span>{addComma(props.betamount)}</span>
          </div>
          <div className="bet-winnings">
            <p>총 당첨</p>
            <span className={props.winamount > 0 ? "winning" : undefined}>
              {addComma(props.winamount)}
            </span>
          </div>
          <div className="bet-data-table">
            <table>
              <thead>
                <tr>
                  <th>베팅구역</th>
                  <th>베팅금</th>
                  <th>당첨금</th>
                </tr>
              </thead>
              <tbody>
                {props.bet.map((array, index) => (
                  <HistoryBet
                    key={index}
                    betcode={array.betcode}
                    betvalue={array.betvalue}
                    betamount={array.betamount}
                    winamount={array.winamount}
                  ></HistoryBet>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </li>
    </>
  );
}
