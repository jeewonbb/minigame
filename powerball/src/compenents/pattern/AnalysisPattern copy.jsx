import React, { useEffect, useState } from "react";

let start_flag = 1;
let analysis_list1 = "";
let analysis_list2 = "";
let analysis_list3 = "";
let analysis_list4 = "";
let consecutive_arr = [];
let break_arr = [];
let fondant_arr = [];
function AnalysisPattern(props) {
  // list = props.list;
  // console.log(list);
  const [analysisPatternlist1, setanalysisPatternlist1] = useState("");
  const [analysisPatternlist2, setanalysisPatternlist2] = useState("");
  const [analysisPatternlist3, setanalysisPatternlist3] = useState("");
  const [analysisPatternlist4, setanalysisPatternlist4] = useState("");
  const [analysisSize1, setaanalysisSize1] = useState(0);
  const [analysisSize2, setaanalysisSize2] = useState(0);
  const [analysisSize3, setaanalysisSize3] = useState(0);
  const [analysisSize4, setaanalysisSize4] = useState(0);

  useEffect(() => {
    // if ( start_flag == 1 )
    fn_analysis_grid(props);
  }, [props]);
  const ptnKind = {
    ODD_EVEN: {
      1: { type: "P", className: "odd", viewText: "odd_s" },
      2: { type: "B", className: "even", viewText: "even_s" },
      0: { type: "T", className: "draw", viewText: "draw_s" },
    },
    UNDER_OVER: {
      1: { type: "P", className: "under", viewText: "under_s" },
      2: { type: "B", className: "over", viewText: "over_s" },
      0: { type: "T", className: "draw", viewText: "draw_s" },
    },
  };

  let baseElm, blueElm, redElm;
  let widthNum = 20;
  const viewTextType = "R";
  let list1 = [];
  let list2 = [];
  let list3 = [];
  let list4 = [];
  let mptnList = [];
  let str = "";

  const fn_analysis_grid = (props) => {
    let list = props.list;
    start_flag = 0;

    let _other_data_arr = [0, 0];
    var currentmark1 = 0;
    var currentmark2 = 0;
    var currentmark3 = 0;
    var currentmark4 = 0;
    var currentmax = [0, 0, 0, 0];
    var currentpongdang = [0, 0, 0, 0];
    let prev_index = [-1, -1, -1, -1];
    let other_fall = [0, 0, 0, 0];
    let other_pong = [0, 0, 0, 0];
    let other_maxi = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];

    list1 = JSON.parse(JSON.stringify(list));
    list2 = JSON.parse(JSON.stringify(list));
    list3 = JSON.parse(JSON.stringify(list));
    list4 = JSON.parse(JSON.stringify(list));

    for (var i = 0; i < list.length; i++) {
      let _array = { ...list[i].result.value };

      let _sum_odd_even = list[i].result.extrainfo.sum_odd_even;
      let _sum_unover = list[i].result.extrainfo.sum_unover;
      let _powerball_odd_even = list[i].result.extrainfo.powerball_odd_even;
      let _powerball_unover = list[i].result.extrainfo.powerball_unover;

      if (_sum_odd_even === "ODD") list1[i].result.value = 1;
      else list1[i].result.value = 2;

      if (_sum_unover === "UNDER") list2[i].result.value = 1;
      else list2[i].result.value = 2;

      if (_powerball_odd_even === "ODD") list3[i].result.value = 1;
      else list3[i].result.value = 2;

      if (_powerball_unover === "UNDER") list4[i].result.value = 1;
      else list4[i].result.value = 2;

      let _round = list1[i].round.split("-");
      list1[i].round = _round[0] + "-" + parseInt(_round[1]);
      list2[i].round = _round[0] + "-" + parseInt(_round[1]);
      list3[i].round = _round[0] + "-" + parseInt(_round[1]);
      list4[i].round = _round[0] + "-" + parseInt(_round[1]);

      if (prev_index[0] !== list1[i].result.value) other_fall[0]++;
      if (prev_index[1] !== list2[i].result.value) other_fall[1]++;
      if (prev_index[2] !== list3[i].result.value) other_fall[2]++;
      if (prev_index[3] !== list4[i].result.value) other_fall[3]++;

      prev_index[0] = list1[i].result.value;
      prev_index[1] = list2[i].result.value;
      prev_index[2] = list3[i].result.value;
      prev_index[3] = list4[i].result.value;

      if (currentmark1 !== list1[i].result.value) {
        if (currentmax[0] > 0) {
          if (currentmax[0] === 1) {
            currentpongdang[0]++;
          } else {
            if (currentpongdang[0] > other_pong[0]) {
              other_pong[0] = currentpongdang[0];
            }
            currentpongdang[0] = 0;
          }
        }
        currentmark1 = list1[i].result.value;
        currentmax[0] = 0;
      }
      if (currentmark2 !== list2[i].result.value) {
        if (currentmax[1] > 0) {
          if (currentmax[1] === 1) {
            currentpongdang[1]++;
          } else {
            if (currentpongdang[1] > other_pong[1]) {
              other_pong[1] = currentpongdang[1];
            }
            currentpongdang[1] = 0;
          }
        }
        currentmark2 = list2[i].result.value;
        currentmax[1] = 0;
      }
      if (currentmark3 !== list3[i].result.value) {
        if (currentmax[2] > 0) {
          if (currentmax[2] === 1) {
            currentpongdang[2]++;
          } else {
            if (currentpongdang[2] > other_pong[2]) {
              other_pong[2] = currentpongdang[2];
            }
            currentpongdang[2] = 0;
          }
        }
        currentmark3 = list3[i].result.value;
        currentmax[2] = 0;
      }
      if (currentmark4 !== list4[i].result.value) {
        if (currentmax[3] > 0) {
          if (currentmax[3] === 1) {
            currentpongdang[3]++;
          } else {
            if (currentpongdang[3] > other_pong[3]) {
              other_pong[3] = currentpongdang[3];
            }
            currentpongdang[3] = 0;
          }
        }
        currentmark4 = list4[i].result.value;
        currentmax[3] = 0;
      }

      currentmax[0]++;
      currentmax[1]++;
      currentmax[2]++;
      currentmax[3]++;

      if (currentmax[0] > other_maxi[0][currentmark1 - 1])
        other_maxi[0][currentmark1 - 1] = currentmax[0];
      if (currentmax[1] > other_maxi[1][currentmark2 - 1])
        other_maxi[1][currentmark2 - 1] = currentmax[1];
      if (currentmax[2] > other_maxi[2][currentmark3 - 1])
        other_maxi[2][currentmark3 - 1] = currentmax[2];
      if (currentmax[3] > other_maxi[3][currentmark4 - 1])
        other_maxi[3][currentmark4 - 1] = currentmax[3];
    }

    consecutive_arr.push(other_maxi[0][0]);
    consecutive_arr.push(other_maxi[0][1]);
    consecutive_arr.push(other_maxi[1][0]);
    consecutive_arr.push(other_maxi[1][1]);
    consecutive_arr.push(other_maxi[2][0]);
    consecutive_arr.push(other_maxi[2][1]);
    consecutive_arr.push(other_maxi[3][0]);
    consecutive_arr.push(other_maxi[3][1]);
    break_arr.push(other_fall[0]);
    break_arr.push(other_fall[1]);
    break_arr.push(other_fall[2]);
    break_arr.push(other_fall[3]);
    fondant_arr.push(other_pong[0]);
    fondant_arr.push(other_pong[1]);
    fondant_arr.push(other_pong[2]);
    fondant_arr.push(other_pong[3]);

    displayKindTab(1, "ODD_EVEN");
    displayKindTab(2, "UNDER_OVER");
    displayKindTab(3, "ODD_EVEN");
    displayKindTab(4, "UNDER_OVER");
  };

  function displayKindTab(cnt, opt) {
    if (cnt === 1) {
      mptnList = list1;
      drawLimitElement(
        calcLocation(opt, mptnList, 6, calcSquidResultValue, true, "0"),
        opt,
        "analysis_list1",
        undefined,
        undefined,
        undefined
      );
    } else if (cnt === 2) {
      mptnList = list2;
      drawLimitElement(
        calcLocation(opt, mptnList, 6, calcSquidResultValue, true, "0"),
        opt,
        "analysis_list2",
        undefined,
        undefined,
        undefined
      );
    } else if (cnt === 3) {
      mptnList = list3;
      drawLimitElement(
        calcLocation(opt, mptnList, 6, calcSquidResultValue, true, "0"),
        opt,
        "analysis_list3",
        undefined,
        undefined,
        undefined
      );
    } else if (cnt === 4) {
      mptnList = list4;
      drawLimitElement(
        calcLocation(opt, mptnList, 6, calcSquidResultValue, true, "0"),
        opt,
        "analysis_list4",
        undefined,
        undefined,
        undefined
      );
    }
  }

  const calcSquidResultValue = function (opt, resValue, tie, tieValue) {
    if (resValue.result.extraValue !== undefined)
      return resValue.result.extraValue;
    else return resValue.result.value;
  };

  const calcLocation = (
    opt,
    dataList,
    maxLocValue,
    fn_calc,
    tieBool,
    tieValue
  ) => {
    let locArray = new Array();
    let thisValue = null;
    let preValue = null;
    let xloc = 0;
    let yloc = 0;
    let rxloc = 0;

    dataList.forEach((element, idx) => {
      thisValue = fn_calc(opt, element, tieBool, tieValue);

      if (tieBool && thisValue === null) {
        thisValue = tieValue;
      }

      if (tieBool || thisValue !== null) {
        if (idx === 0) {
          locArray[0] = new Array();
          if (element.round.indexOf("value-") > -1) {
            locArray[0][0] = [thisValue, element.round];
          } else {
            locArray[0][0] = [thisValue, element.round.split("-")[1]];
          }
          preValue = thisValue;
        } else {
          if (
            preValue === thisValue ||
            (tieBool && thisValue === tieValue) ||
            preValue === tieValue
          ) {
            if (
              yloc + 1 < maxLocValue &&
              (locArray[rxloc][yloc + 1] === null ||
                locArray[rxloc][yloc + 1] === "undefined")
            ) {
              if (
                locArray[rxloc][yloc + 2] == undefined ||
                (locArray[rxloc][yloc + 2][0] !== thisValue &&
                  locArray[rxloc][yloc + 2][0] !== tieValue)
              ) {
                if (
                  (locArray[rxloc - 1] &&
                    locArray[rxloc - 1][yloc + 1] &&
                    locArray[rxloc - 1][yloc + 1][0] === thisValue) ||
                  (locArray[rxloc - 1] &&
                    locArray[rxloc - 1][yloc + 1] &&
                    thisValue === tieValue) ||
                  (locArray[rxloc - 1] &&
                    locArray[rxloc - 1][yloc + 1] &&
                    locArray[rxloc - 1][yloc + 1][0] === tieValue &&
                    rxloc > 1)
                ) {
                  rxloc++;
                } else {
                  yloc++;
                }
              } else {
                rxloc++;
              }
            } else {
              rxloc++;
            }
          } else if (preValue !== thisValue) {
            xloc++;
            yloc = 0;
            rxloc = xloc;
          }

          while (
            (locArray[rxloc] && locArray[rxloc][yloc]) ||
            (locArray[rxloc] &&
              locArray[rxloc][yloc + 1] &&
              locArray[rxloc][yloc + 1][0] === tieValue)
          ) {
            rxloc++;
          }
          if (!locArray[rxloc]) {
            locArray[rxloc] = new Array();
          }

          if (element.round.indexOf("value-") > -1) {
            locArray[rxloc][yloc] = [thisValue, element.round];
          } else {
            locArray[rxloc][yloc] = [thisValue, element.round.split("-")[1]];
          }
        }
        if (!tieBool || thisValue !== tieValue) {
          preValue = thisValue;
        }
      }
    });

    return locArray;
  };

  const drawLimitElement = function (
    locArray,
    opt,
    drawObjId,
    drawType,
    prediction,
    combineFunction
  ) {
    let lesListIdx = 0;
    let className = "";
    let substr = "";
    let str = "";
    let viewText = "";

    locArray.forEach((element, index, arr) => {
      str += "<dl>";

      for (let idx = 0; idx < 6; idx++) {
        if (element[idx] !== undefined) {
          className = ptnKind[opt][element[idx][0]]["class"];
          if (prediction && element[idx][1].indexOf("value-") > -1) {
            viewText = getViewText(
              opt,
              viewTextType,
              element[idx][1].replace("value-", ""),
              element[idx][0]
            );
          } else {
            viewText = getViewText(
              opt,
              viewTextType,
              element[idx][1],
              element[idx][0]
            );
          }

          if (prediction && element[idx][1].indexOf("value-") > -1) {
            str +=
              '<dd><span className="' +
              className +
              ' blink">' +
              viewText +
              "</span></dd>";
          } else {
            if (combineFunction !== null && combineFunction !== undefined) {
            }

            str +=
              '<dd><span className="' +
              className +
              '">' +
              viewText +
              substr +
              "</span></dd>";
          }

          lesListIdx++;
        } else {
          str += "<dd><span></span></dd>";
        }
      }

      str += "</dl>";
    });

    if (drawObjId === "analysis_list1") {
      setanalysisPatternlist1(str);
      setaanalysisSize1(locArray.length);
      analysis_list1 = str;
    } else if (drawObjId === "analysis_list2") {
      setanalysisPatternlist2(str);
      setaanalysisSize2(locArray.length);
      analysis_list2 = str;
    } else if (drawObjId === "analysis_list3") {
      setanalysisPatternlist3(str);
      setaanalysisSize3(locArray.length);
      analysis_list3 = str;
    } else if (drawObjId === "analysis_list4") {
      setanalysisPatternlist4(str);
      setaanalysisSize4(locArray.length);
      analysis_list4 = str;
    }
  };

  const getViewText = function (opt, textType, text, value) {
    let viewText = "";

    if (textType === "R") {
      viewText = text;
    } else if (textType === "C") {
      viewText = ptnKind[opt][value]["viewText"];
    } else if (textType === "N") {
      viewText = "";
    } else {
      viewText = text;
    }
    return viewText;
  };

  // fn_analysis_grid();
  return (
    <>
      <div>
        상단데이타 : {consecutive_arr[0]} {consecutive_arr[1]}{" "}
        {consecutive_arr[2]} {consecutive_arr[3]} {consecutive_arr[4]}{" "}
        {consecutive_arr[5]} {consecutive_arr[6]} {consecutive_arr[7]}
        <br />
        {break_arr[0]} {break_arr[1]} {break_arr[2]} {break_arr[3]}
        <br />
        {fondant_arr[0]} {fondant_arr[1]} {fondant_arr[2]} {fondant_arr[3]}
      </div>
      <div>
        1번 : 사이즈 {analysisSize1}
        {analysis_list1}
      </div>
      <div>
        2번 : 사이즈 {analysisSize2}
        {analysis_list2}
      </div>
      <div>
        3번 : 사이즈 {analysisSize3}
        {analysis_list3}
      </div>
      <div>
        4번 : 사이즈 {analysisSize4}
        {analysis_list4}
      </div>
    </>
  );
}

export default AnalysisPattern;
