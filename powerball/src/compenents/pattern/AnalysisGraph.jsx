import React from "react";

export function AnalysisGraph(props) {
  let _total = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ];
  let _percent = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ];
  let _total1 = 0;
  let _total2 = 0;
  let _total3 = 0;
  let _total4 = 0;
  let _total5 = 0;
  let _total6 = 0;
  let _total7 = 0;
  let _total8 = 0;
  let _total9 = 0;
  let _total10 = 0;
  let _total11 = 0;
  console.log(props);
  for (let i = 0; i < props.list.length; i++) {
    if (props.list[i].result.extrainfo.powerball_odd_even === "ODD")
      _total1 += 1;
    else _total2 += 1;

    if (props.list[i].result.extrainfo.powerball_unover === "UNDER")
      _total3 += 1;
    else _total4 += 1;

    if (props.list[i].result.extrainfo.sum_odd_even === "ODD") _total5 += 1;
    else _total6 += 1;

    if (props.list[i].result.extrainfo.sum_unover === "UNDER") _total7 += 1;
    else _total8 += 1;

    if (props.list[i].result.extrainfo.sum_size === "L") _total9 += 1;
    else if (props.list[i].result.extrainfo.sum_size === "M") _total10 += 1;
    else _total11 += 1;
  }
  _total[0][0] = _total1;
  _total[0][1] = _total2;
  _total[1][0] = _total3;
  _total[1][1] = _total4;
  _total[2][0] = _total5;
  _total[2][1] = _total6;
  _total[3][0] = _total7;
  _total[3][1] = _total8;
  _total[4][0] = _total9;
  _total[4][1] = _total10;
  _total[4][2] = _total11;
  _percent[0][0] = parseFloat(
    ((_total1 / (_total1 + _total2)) * 100).toFixed(2)
  );
  _percent[0][1] = parseFloat(
    ((_total2 / (_total1 + _total2)) * 100).toFixed(2)
  );
  _percent[1][0] = parseFloat(
    ((_total3 / (_total3 + _total4)) * 100).toFixed(2)
  );
  _percent[1][1] = parseFloat(
    ((_total4 / (_total3 + _total4)) * 100).toFixed(2)
  );
  _percent[2][0] = parseFloat(
    ((_total5 / (_total5 + _total6)) * 100).toFixed(2)
  );
  _percent[2][1] = parseFloat(
    ((_total6 / (_total5 + _total6)) * 100).toFixed(2)
  );
  _percent[3][0] = parseFloat(
    ((_total7 / (_total7 + _total8)) * 100).toFixed(2)
  );
  _percent[3][1] = parseFloat(
    ((_total8 / (_total7 + _total8)) * 100).toFixed(2)
  );
  _percent[2][1] = parseFloat(
    ((_total9 / (_total9 + _total10 + _total11)) * 100).toFixed(2)
  );
  _percent[3][0] = parseFloat(
    ((_total10 / (_total9 + _total10 + _total11)) * 100).toFixed(2)
  );
  _percent[3][1] = parseFloat(
    ((_total11 / (_total9 + _total10 + _total11)) * 100).toFixed(2)
  );

  // console.log(_total);

  return (
    <>
      <div>
        <p>파워볼</p>
        {_total.slice(0, 2).map((row, rowIndex) => (
          <div key={rowIndex} className="bar-graph">
            <div className="left-label">{rowIndex === 0 ? "홀" : "언"}</div>
            <div className="bar">
              {row.map((item, index) => (
                <span
                  key={index}
                  className={index === 0 ? "left" : "right"}
                  style={{ width: item + "%" }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="right-label">{rowIndex === 0 ? "짝" : "오"}</div>
          </div>
        ))}
      </div>

      <div>
        <p>일반볼</p>
        {_total.slice(2, 4).map((row, rowIndex) => (
          <div key={rowIndex} className="bar-graph">
            <div className="left-label">{rowIndex === 0 ? "홀" : "언"}</div>
            <div className="bar">
              {row.map((item, index) => (
                <span key={index} className={index === 0 ? "left" : "right"}>
                  {item}
                </span>
              ))}
            </div>
            <div className="right-label">{rowIndex === 0 ? "짝" : "오"}</div>
          </div>
        ))}
      </div>
      <strong className="percent">{props.percent}</strong>
    </>
  );
}
