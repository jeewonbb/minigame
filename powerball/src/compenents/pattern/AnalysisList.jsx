import React from "react";
export function AnalysisList({ roundid, roundno, result, date }) {
  let result1 = "";
  let result2 = "";
  let result3 = "";
  let result4 = "";
  let result5 = "";
  let round = roundno.split("-");
  if (result === undefined) {
    return;
  }
  if (result === undefined) {
    return null;
  } else {
    if (result.powerball_odd_even === "ODD")
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

    if (result.powerball_unover === "UNDER")
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

    if (result.sum_odd_even === "ODD")
      result3 = <span className="ball odd">홀</span>;
    else result3 = <span className="ball even">짝</span>;

    if (result.sum_unover === "UNDER")
      result4 = <span className="ball under">언</span>;
    else result4 = <span className="ball over">오</span>;

    if (result.sum_size === "H")
      result5 = <span className="ball large">대</span>;
    else if (result.sum_size === "M")
      result5 = <span className="ball middle">중</span>;
    else result5 = <span className="ball small">소</span>;
  }

  return (
    <li>
      <div className="panel-head">
        <p>
          {round[1]} 회차
          <span>({roundid})</span>
        </p>
        {date && <time dateTime={date}>{date}</time>}
      </div>
      <div className="panel-body">
        <AnalysisBall
          result1={result1}
          result2={result2}
          result3={result3}
          result4={result4}
          result5={result5}
        />
      </div>
    </li>
  );
}

export function AnalysisBall({ result1, result2, result3, result4, result5 }) {
  return (
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
  );
}
