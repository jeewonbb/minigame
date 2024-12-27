import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import * as Sound from "../../js/sound.js";
import * as Function from "../../function.js";
import * as Lang from "../../js/lang.js";
import guideko from "../../guide/info_ko.txt";
import guideen from "../../guide/info_en.txt";

let betlist_complete = [];
let betlist_check = [];
var betlist_prev = [];
let betlimits = [];
let betlimit_min = 0;
let betlimit_max = 0;
let bet_types = "";
// let bet_types = "bothside";
let currency = "KRW";
let betlist = [];
let bet_total = 0;
let win_money = 0;

let end_time_grab = 0;
let begin_time = "";
let end_time = "";
let now_time = "";
let stop_evo_bet = "";
let cutting_cnt = "";
let roundid_now = "";
let round_bet_possible = false;
let round_now = "";
let setinterval_status = "";

let bet_status = {
  1: { 1: { amount: [], active: [], picked: [], lock: [] } },
};

// 베팅판 변경관련
let soundBgmFlag = true;
let soundEffectFlag = true;

function Menu2(props) {
  console.log("bet init");
  betlimits = props.betlimits;
  betlimit_max = props.betlimit_max;
  betlimit_min = props.betlimit_min;

  const [rebet, setRebet] = useState(false);
  const [betCancel, setBetCancel] = useState(false);
  const [betComplete, setBetComplete] = useState(false);
  const [betCompleteActive, setBetCompleteActive] = useState(false);
  const [balance, setBalance] = useState(0);
  const [betchip, setBetchip] = useState(0);
  const [betchange, setBetchange] = useState("");

  // 베팅판 변경관련
  let url_analysis =
    "analysis/index.html?lang=" + props.lang + "&cointype=" + props.gametype;
  let background_sound_flag = true;
  let dimensionsWidth = 0;
  let dimensionsHeight = 0;

  const targetRef = useRef();
  const targetLeft = useRef();
  const targetRight = useRef();
  const [subMenu, setSubMenu] = useState(false);
  const [menualView, setMenualView] = useState(false);
  const [menualHtml, setMenualHtml] = useState("");

  const [betBoardType, setBetBoardType] = useState(false); // betBoardType true : 칩 / false : 입력창
  const [betBoardTypeExtend, setBetBoardTypeExtend] = useState(false); // true : 입력창 기본 / false 입력창 확장
  const [chipActive, setChipActive] = useState(1); // 값 1~6까지 chip active
  const [chipInputReadOnly, setChipInputReadOnly] = useState(true); // input 태그 readonly
  const [betMoneyInput, setBetMoneyInput] = useState("0"); // input value
  const [chipMin, setChipMin] = useState(true); // - 버튼 lock 여부
  const [chipMax, setChipMax] = useState(false); // + 버튼 lock 여부
  const [soundBgm, setSoundBgm] = useState(true); // 사운드 bgm 여부
  const [soundEffect, setSoundEffect] = useState(true); // 사운드 effect 여부
  const [landscape, setLandscape] = useState(false); // 가로창 표시 여부
  const [scale, setScale] = useState(1); // 가로창 표시 여부
  const [sideWindowLeft, setSideWindowLeft] = useState(true); // 왼쪽 메뉴 여부
  const [sideWindowRight, setSideWindowRight] = useState(true); // 오른쪽 메뉴 여부
  const [background, setBackground] = useState(""); // 오른쪽 메뉴 여부

  useEffect(() => {
    setBetchip(Function.removeComma(betMoneyInput));
  }, [betMoneyInput]);

  useEffect(() => {
    console.log("Bet - useEffect");

    if (Function.ismobile() == true) setTimeout(fn_zoom, 3000);
    else fn_zoom();

    fn_orientation_rotate();
    fn_bet_init();
    api_status();
    clearInterval(setinterval_status);
    fn_bet_complete_view();
    setinterval_status = setInterval(api_status, 1000);
    setBackground("#" + Function.getQueryString("bg", "232d3b"));
  }, [props]);

  useLayoutEffect(() => {
    fn_dimensions();
    fn_zoom();
  }, []);

  useEffect(() => {
    guide_html();

    window.addEventListener("blur", (e) => {
      console.log("blur");
      console.log(document.activeElement);
      let value = String(document.activeElement);
      console.log(value);
      console.log(value.search("HTMLIFrameElement"));
      if (value.search("HTMLIFrameElement") === -1) {
        Sound.setMuteSound_bgm(true);
        Sound.setMuteSound_effect(true);
      } else {
        setTimeout(function () {
          window.focus();
        }, 500);
      }
    });

    window.addEventListener("focus", () => {
      fn_volumn_setting();
      fn_bg_sound();
    });

    window.addEventListener("resize", () => {
      setTimeout(fn_dimensions, 100);
      if (Function.ismobile() == false) fn_zoom();
    });

    window.addEventListener("click", (e) => {
      if (background_sound_flag == true) {
        fn_bg_sound();
        background_sound_flag = false;
      }

      handleCloseModal(e);
    });

    window.addEventListener("orientationchange", function () {
      fn_orientation_rotate();
    });
  }, []);

  const handleCloseModal = (e) => {
    if (
      sideWindowLeft &&
      (!targetLeft.current || !targetLeft.current.contains(e.target))
    )
      setSideWindowLeft(false);
    if (
      sideWindowRight &&
      (!targetRight.current || !targetRight.current.contains(e.target))
    )
      setSideWindowRight(false);
  };

  const fn_bg_sound = () => {
    Sound.playSound("bgm", true, 0);
  };

  const fn_dimensions = () => {
    if (targetRef.current) {
      dimensionsWidth = targetRef.current.offsetWidth;
      dimensionsHeight = targetRef.current.offsetHeight;
    }
  };

  const fn_orientation_rotate = () => {
    if (Function.ismobile() == true) {
      if (window.orientation == 0 || window.orientation == 180) {
        setTimeout(fn_zoom, 100);
        setLandscape(false);
      } else {
        setLandscape(true);
      }
    } else {
      setLandscape(false);
    }
  };

  const fn_zoom = () => {
    console.log("fn_zoom");

    if (window.innerWidth < 1100) {
      fn_zoon_check();
    } else {
      if (window.outerHeight < 920) {
        fn_zoon_check();
      } else {
        setScale(1);
      }
    }
  };

  const fn_zoon_check = () => {
    var maxwidth = window.innerWidth;
    var maxheight = window.outerHeight;
    var scaleX = maxwidth / dimensionsWidth;
    var scaleY = maxheight / dimensionsHeight;

    let scale_check = scaleX > scaleY ? scaleY : scaleX;
    setScale(scale_check);
  };

  const api_status = async () => {
    const url = process.env.REACT_APP_API_ADDRESS;
    await axios
      .post(
        url + "status.php",
        new URLSearchParams({
          category: "status",
          gamecode: process.env.REACT_APP_GAME_CODE,
          token: encodeURIComponent(props.game_token),
          gametype: props.gametype,
          group: process.env.REACT_APP_GAME_GROUP,
        })
      )
      .then(function (response) {
        let _res = response.data;
        console.log(_res);
        fn_status_info(_res);
      })
      .catch(function (error) {})
      .then(function () {});
  };

  const guide_html = async () => {
    if (props.lang === "ko") {
      fetch(guideko)
        .then((r) => r.text())
        .then((text) => {
          setMenualHtml(text);
        });
    } else {
      fetch(guideen)
        .then((r) => r.text())
        .then((text) => {
          setMenualHtml(text);
        });
    }
  };

  // 베팅판 클릭

  const fn_status_info = (_res) => {
    if (end_time_grab === 0) end_time_grab = _res.stop_bet_before;
    begin_time = Math.floor(+new Date(_res.begin) / 1000);
    end_time = Math.floor(+new Date(_res.end) / 1000);
    now_time = Math.floor(+new Date() / 1000) + end_time_grab;

    if (_res.stop_evo_bet != undefined) {
      stop_evo_bet = _res.stop_evo_bet;
      cutting_cnt = _res.cutting_cnt;

      if (stop_evo_bet === true) {
        if (props.lang === "ko")
          fn_alert(
            getLang("general", "rest_time1") +
              "<BR>" +
              getLang("general", "rest_time2") +
              _res.stop_origin_bet_begin +
              "~" +
              _res.stop_origin_bet_end
          );
        else
          fn_alert(
            getLang("general", "rest_time1") +
              "<BR>" +
              _res.stop_origin_bet_begin +
              "~" +
              _res.stop_origin_bet_end +
              getLang("general", "rest_time2")
          );

        fn_bet_close();

        return;
      }

      if (now_time > end_time) {
        round_bet_possible = false;
        fn_bet_close();
      } else {
        round_bet_possible = true;
        fn_bet_open();
      }
    } else {
      if (now_time > end_time) {
        round_bet_possible = false;
        fn_bet_close();
      } else {
        round_bet_possible = true;
        fn_bet_open();
      }
    }

    if (roundid_now != _res.roundid && roundid_now != "") {
      round_bet_possible = true;
      if (betlist_complete.length > 0) betlist_prev = betlist_complete;
      betlist_complete = [];
      betlist = [];
      fn_init();
      fn_bet_open();
      props.setRefresh("refresh" + roundid_now);
      fn_api_ajax("balance", "");
      bet_total = 0;
      // setBetchange(round_now);
      setBetComplete(true);
      setBetCancel(true);
      setRebet(true);
    }

    roundid_now = _res.roundid;
    round_now = _res.round;

    if (end_time - now_time > 0) {
      let _time_gab = end_time - now_time;
      let min = parseInt(_time_gab / 60);
      let sec = parseInt(_time_gab - min * 60);
      console.log(min + ":" + sec);
    } else {
    }
  };

  const fn_init = () => {
    bet_status = {
      1: {
        1: {
          amount: [0, 0, 0],
          active: [false, false, false],
          picked: [false, false, false],
          lock: [false, false, false],
        },
      },
    };
  };

  const fn_bet_open = () => {
    if (betlist_complete.length == 0) setRebet(true);
  };

  const fn_bet_close = () => {
    console.log("fn_bet_close");
    bet_status["1"]["1"]["lock"] = [true, true, true];

    for (var i = 0; i < betlist_complete.length; i++) {
      bet_status[betlist_complete[i].betgroup][betlist_complete[i].betcode][
        "active"
      ][betlist_complete[i].betvalue - 1] = true;
      bet_status[betlist_complete[i].betgroup][betlist_complete[i].betcode][
        "picked"
      ][betlist_complete[i].betvalue - 1] = true;
      bet_status[betlist_complete[i].betgroup][betlist_complete[i].betcode][
        "lock"
      ][betlist_complete[i].betvalue - 1] = false;
    }

    if (betlist.length > 0) {
      for (var i = 0; i < betlist.length; i++) {
        bet_status[betlist[i].betgroup][betlist[i].betcode]["picked"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup][betlist[i].betcode]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup][betlist[i].betcode]["lock"][
          betlist[i].betvalue - 1
        ] = true;
        bet_status[betlist[i].betgroup][betlist[i].betcode]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
      }
    }

    setBetComplete(false);
    setBetCancel(false);
    setRebet(false);
  };

  const fn_bet_click = (_group, _code, _value, _rebet, _amount) => {
    if (round_bet_possible === false) return;
    if (bet_status[_group][_code]["picked"][0] === true) return;
    if (bet_status[_group][_code]["picked"][1] === true) return;
    if (bet_status[_group][_code]["picked"][2] === true) return;

    Sound.playSound("button_bet", false, 0);

    let _betcode_min = 0;
    let _betcode_max = 0;
    let _betchip_pick = 0;
    let _exists_code_flag = -1;
    let _bet_money = 0;
    let _bet_money_group = 0;
    let _bet_money_complete = 0;
    let betting_first = 0;
    let betting_last = 0;

    for (var i = 0; i < betlist.length; i++) {
      betting_first += Number(betlist[i].amount);
    }

    for (var i = 0; i < betlist.length; i++) {
      if (bet_types === "bothside") {
        if (
          betlist[i].betgroup === _group &&
          betlist[i].betcode === _code &&
          betlist[i].betvalue === _value
        )
          _exists_code_flag = i;

        if (betlist[i].betgroup !== _group) _bet_money += betlist[i].amount;

        if (
          betlist[i].betgroup === _group &&
          (betlist[i].betcode !== _code || betlist[i].betvalue !== _value)
        )
          _bet_money_group += betlist[i].amount;
      } else {
        if (betlist[i].betgroup === _group) _exists_code_flag = i;
        else _bet_money += betlist[i].amount;
      }
    }

    for (var i = 0; i < betlist_complete.length; i++) {
      _bet_money_complete += betlist_complete[i].amount;

      if (
        betlist_complete[i].betgroup === _group &&
        (betlist_complete[i].betcode !== _code ||
          betlist_complete[i].betvalue !== _value)
      ) {
        _bet_money_group += betlist_complete[i].amount;
      }
    }

    for (var i = 0; i < betlist.length; i++) {
      if (
        betlist[i].betgroup === _group &&
        betlist[i].betcode === _code &&
        betlist[i].betvalue === _value
      )
        _betchip_pick += betlist[i].amount;
    }

    if (_rebet === true) _betchip_pick = _amount;
    else _betchip_pick += betchip;

    if (_betchip_pick > balance - (_bet_money + _bet_money_group)) {
      _betchip_pick = balance - _bet_money - _bet_money_group;
    }

    for (var i = 0; i < betlimits.length; i++) {
      if (betlimits[i].betcode === _code) {
        _betcode_min = betlimits[i].min;
        _betcode_max = betlimits[i].max;
        break;
      }
    }

    if (_betcode_min > _betchip_pick) {
      fn_alert(
        getLang("general", "game_111_5") +
          Function.changeUnit(_betcode_min) +
          ")"
      );
      return;
    }

    if (_betcode_max < _betchip_pick + _bet_money_group) {
      fn_alert(
        getLang("general", "game_111_6") +
          Function.changeUnit(_betcode_max) +
          ")"
      );
      return;
    }

    if (
      betlimit_min >
      _bet_money + _betchip_pick + _bet_money_group + _bet_money_complete
    ) {
      fn_alert(
        getLang("general", "game_111_5") +
          Function.changeUnit(betlimit_min) +
          ")"
      );
      return;
    }

    if (
      betlimit_max <
      _bet_money + _betchip_pick + _bet_money_group + _bet_money_complete
    ) {
      fn_alert(
        getLang("general", "game_111_6") +
          Function.changeUnit(betlimit_max) +
          ")"
      );
      return;
    }

    if (_exists_code_flag > -1) betlist.splice(_exists_code_flag, 1);

    betlist.push({
      betgroup: _group,
      betcode: _code,
      betvalue: _value,
      amount: _betchip_pick,
    });

    if (bet_types !== "bothside") {
      bet_status[_group][_code]["active"] = [];
      bet_status[_group][_code]["amount"] = [];
    }
    bet_status[_group][_code]["amount"][_value - 1] = _betchip_pick;
    bet_status[_group][_code]["active"][_value - 1] = true;

    if (betlist.length > 0) setBetCompleteActive(true);

    for (var i = 0; i < betlist.length; i++) {
      betting_last += Number(betlist[i].amount);
    }

    setBalance(balance + betting_first - betting_last);
    setBetchange(_group + "_" + _code + "_" + _value + "_" + _betchip_pick);
  };

  const getLang = (a, b) => {
    return a + b;
  };

  const fn_alert = (a) => {
    alert(a);
  };

  // 버튼에 베팅 배당율 표시
  const fn_bet_init = () => {
    console.log("betlimit");
    console.log(props);
    setBalance(props.balance);
    setBetchip(props.betchip);
  };

  // 베팅 버튼
  const fn_bet_complete = () => {
    // log_check("fn_bet_complete");

    Sound.playSound("button_confirm", false, 0);

    setBetComplete(false);
    setTimeout(() => {
      setBetComplete(true);
    }, 500);

    if (round_bet_possible === true) {
      if (betlist.length === 0) {
        fn_alert(getLang("general", "nobet"));
        return;
      }

      for (var i = 0; i < betlist.length; i++) {
        bet_status[betlist[i].betgroup][betlist[i].betcode]["active"][
          betlist[i].betvalue - 1
        ] = true;
      }

      let _betlist = JSON.stringify(betlist);
      fn_api_ajax("bet", _betlist);
      setRebet(false);
      setBetCompleteActive(false);
    }
  };

  // 베팅 , 벨런스 요청
  const fn_api_ajax = async (category, _data) => {
    const url = process.env.REACT_APP_API_ADDRESS;
    await axios
      .post(
        url + "game.php",
        new URLSearchParams({
          category: category,
          token: encodeURIComponent(props.game_token),
          gamecode: process.env.REACT_APP_GAME_CODE,
          data: _data,
          gametype: 1,
          group: 1,
        })
      )
      .then(function (response) {
        console.log("베팅/잔액", response.data);
        if (category === "bet") fn_game_bet(response.data.message);
        else setBalance(response.data.message.user_balance.credit);
      })
      .catch(function (error) {})
      .then(function () {});
  };

  // 베팅 api 보낸후 받을때 액션
  const fn_game_bet = (_res) => {
    let list = _res.bet_result;
    setBalance(_res.user_balance.credit);
    for (var i = 0; i < list.length; i++) {
      if (list[i].error.code !== 0)
        fn_alert(getLang("general", list[i].error.code));

      if (list[i].error.code === 5005 || list[i].error.code === 5012) {
        break;
      } else if (list[i].error.code === 5001) {
        for (var j = 0; j < betlist.length; j++) {
          if (
            list[i].betcode === betlist[j].betcode &&
            list[i].betvalue === betlist[j].betvalue
          ) {
            bet_status[betlist[j].betgroup][list[i].betcode]["picked"][
              list[i].betvalue - 1
            ] = false;
            bet_status[betlist[j].betgroup][list[i].betcode]["active"][
              list[i].betvalue - 1
            ] = false;
          }
        }
      } else {
        let _betgroup = 0;
        for (var j = 0; j < betlist.length; j++) {
          if (
            list[i].betcode === betlist[j].betcode &&
            list[i].betvalue === betlist[j].betvalue
          ) {
            _betgroup = betlist[j].betgroup;
            break;
          }
        }
        betlist_complete.push({
          betgroup: Number(_betgroup),
          betcode: list[i].betcode,
          betvalue: list[i].betvalue,
          amount: list[i].amount,
        });
      }
    }

    for (var i = 0; i < betlist_complete.length; i++) {
      let _betgroup = 0;
      for (var j = 0; j < betlist.length; j++) {
        if (
          list[i].betcode === betlist_complete[j].betcode &&
          list[i].betvalue === betlist_complete[j].betvalue
        ) {
          _betgroup = betlist_complete[j].betgroup;
          bet_status[_betgroup][betlist_complete[i].betcode]["picked"] = [
            false,
            false,
            false,
          ];
          bet_status[_betgroup][betlist_complete[i].betcode]["active"] = [
            false,
            false,
            false,
          ];
          // bet_status[_betgroup][betlist_complete[i].betcode]["lock"] = [ true , true , true ];

          bet_status[_betgroup][betlist_complete[i].betcode]["picked"][
            betlist_complete[i].betvalue - 1
          ] = true;
          bet_status[_betgroup][betlist_complete[i].betcode]["active"][
            betlist_complete[i].betvalue - 1
          ] = true;
          bet_status[_betgroup][betlist_complete[i].betcode]["lock"][
            betlist_complete[i].betvalue - 1
          ] = false;
        }
      }

      // bet_status[_betgroup][betlist_complete[i].betcode]["lock"] = [ true , true , true ];
      if (bet_types === "bothside") {
        bet_status[_betgroup][betlist_complete[i].betcode]["lock"][
          betlist_complete[i].betvalue - 1
        ] = false;
      }
    }

    if (betlist_complete.length > 0) setRebet(false);

    betlist = [];
    setBetComplete(false);
    fn_bet_calculate();
  };

  // 총 베팅 금액 계산
  const fn_bet_calculate = () => {
    let _bet_money = 0;
    for (var i = 0; i < betlist_complete.length; i++) {
      _bet_money += betlist_complete[i].amount;
    }
    bet_total = _bet_money;
  };

  // 베팅 취소
  const fn_bet_cancel = () => {
    Sound.playSound("button_cancel", false, 0);

    let balance_tmp = 0;
    if (betlist.length === 0) {
      if (betlist_complete.length > 0) {
        fn_alert(getLang("general", "betCannotBeReset"));
        return;
      }
    }

    for (var i = 0; i < betlist.length; i++) {
      balance_tmp +=
        bet_status[betlist[i].betgroup][betlist[i].betcode]["amount"][
          betlist[i].betvalue - 1
        ];
      bet_status[betlist[i].betgroup][betlist[i].betcode]["active"][
        betlist[i].betvalue - 1
      ] = false;
      bet_status[betlist[i].betgroup][betlist[i].betcode]["picked"][
        betlist[i].betvalue - 1
      ] = false;
      bet_status[betlist[i].betgroup][betlist[i].betcode]["amount"][
        betlist[i].betvalue - 1
      ] = 0;
    }

    setBalance(balance + balance_tmp);
    setBetCompleteActive(false);
    betlist = [];
  };

  // 재베팅
  const fn_rebet = () => {
    console.log("fn_rebet");
    console.log(betlist_prev);
    if (rebet === false) return;

    var _exists_code_flag = -1;

    Sound.playSound("button_rebet", false, 0);

    if (betlist_prev.length === 0) {
      fn_alert(getLang("general", "notHavePrevBet"));
      return;
    }

    for (var i = 0; i < betlist.length; i++) {
      bet_status[betlist[i].betgroup][betlist[i].betcode]["active"][
        betlist[i].betvalue - 1
      ] = false;
      bet_status[betlist[i].betgroup][betlist[i].betcode]["amount"][
        betlist[i].betvalue - 1
      ] = 0;
    }
    betlist = [];

    for (var i = 0; i < betlist_prev.length; i++) {
      _exists_code_flag = 0;

      for (var j = 0; j < betlist_complete.length; j++) {
        if (betlist_prev[i].betcode === betlist_complete[j].betcode) {
          _exists_code_flag = 1;
          break;
        }
      }

      if (_exists_code_flag === 0) {
        bet_status[betlist_prev[i].betgroup][betlist_prev[i].betcode]["amount"][
          betlist_prev[i].betvalue - 1
        ] = Number(betlist_prev[i].amount);
        fn_bet_click(
          betlist_prev[i].betgroup,
          betlist_prev[i].betcode,
          betlist_prev[i].betvalue,
          true,
          betlist_prev[i].amount
        );
      }
    }

    fn_bet_calculate();
    // fn_tooltip();
  };

  // 이전 베팅 확인
  const fn_bet_complete_view = () => {
    betlist_check = props.betlistCheck;
    console.log(betlist_check);
    if (betlist_check.length == 0) return;

    betlist_complete = [];
    for (var i = 0; i < betlist_check.length; i++) {
      bet_status["1"][betlist_check[i].betcode]["active"][
        betlist_check[i].betvalue - 1
      ] = true;
      bet_status["1"][betlist_check[i].betcode]["picked"][
        betlist_check[i].betvalue - 1
      ] = true;
      bet_status["1"][betlist_check[i].betcode]["amount"][
        betlist_check[i].betvalue - 1
      ] = betlist_check[i].amount;
      betlist_complete.push({
        betgroup: 1,
        betcode: betlist_check[i].betcode,
        betvalue: betlist_check[i].betvalue,
        amount: betlist_check[i].amount,
      });
    }
    fn_bet_calculate();
    betlist_check = [];
    setRebet(false);
  };

  // 베팅 칩 선택
  const fn_chip_choice = (value, index) => {
    Sound.playSound("button_slip", false, 0);

    setBetchip(Number(value));
    setChipActive(index);
  };

  //  서브 메뉴 및 베팅판 변경

  // 서브창 열고 닫기
  const fn_leftmenu_sub_view = () => {
    if (subMenu === true) setSubMenu(false);
    else setSubMenu(true);
  };

  // 메뉴얼 열기
  const fn_menual_view = () => {
    Sound.playSound("ui_function", false, 0);

    setMenualView(true);
  };

  // 메뉴얼 닫기
  const fn_menual_close = () => {
    Sound.playSound("ui_function", false, 0);

    setMenualView(false);
  };

  // 분석표 열기
  const fn_analysis_view = () => {
    Sound.playSound("ui_function", false, 0);

    window.open(
      url_analysis,
      "",
      "scrollbars=yes,resizable=yes,top=100,left=100,width=1050,height=600"
    );
  };

  // 베팅판 변경 ( 1 칩 , 2 입력창 )
  const fn_betting_board_turn = (_num) => {
    if (_num === 1) {
      setBetBoardType(true);
      setBetBoardTypeExtend(false);
      setChipActive(1);
    } else {
      setBetMoneyInput(props.betslips[0]);
      setBetBoardType(false);
    }
    setChipInputReadOnly(true);
    setBetchip(props.betslips[0]);
    setBetMoneyInput(Function.addComma(betchip));
  };

  // 베팅 입력창 확장
  const fn_betting_board_detail_view = () => {
    setBetBoardTypeExtend(true);
    setChipInputReadOnly(false);
  };

  // 베팅 입력창 축소
  const fn_betting_board_detail_close = () => {
    setBetBoardTypeExtend(false);
    setChipInputReadOnly(true);
  };

  // 베팅판 입력시에 단위별 콤마 처가 및 베팅 리미트 설정
  const fn_betting_comma_change = (e) => {
    console.log("fn_betting_comma_change");
    console.log(e.target.value);

    setBetMoneyInput(Function.addComma(Function.removeComma(e.target.value)));

    if (Function.removeComma(e.target.value) > betlimit_max)
      setBetMoneyInput(Function.addComma(betlimit_max));

    if (Function.removeComma(e.target.value) < betlimit_min)
      setBetMoneyInput(Function.addComma(betlimit_min));
  };

  // 베팅판 숫자 입력
  const fn_betting_board_total_money = (_money) => {
    let _now_money;
    if (_money == "-1") {
      _now_money = "";
    } else {
      _now_money = betMoneyInput;
      if (_now_money == "") _now_money = _now_money;
      else _now_money = Number(Function.removeComma(_now_money));

      if (_money > 10) _now_money = Number(_now_money) + Number(_money);
      else _now_money += _money;
    }

    if (_now_money > betlimit_max) _now_money = betlimit_max;

    if (_now_money < betlimit_min) _now_money = betlimit_min;

    setBetMoneyInput(Function.addComma(_now_money));
  };

  // 베팅판 최소/최대/-/+ 버튼
  const fn_betchip_change = (_category) => {
    if (_category == "min") {
      setBetMoneyInput(Function.addComma(props.betslips[0]));
      setChipMin(true);
      setChipMax(false);
    } else if (_category == "max") {
      setBetMoneyInput(
        Function.addComma(props.betslips[props.betslips.length - 1])
      );
      setChipMin(false);
      setChipMax(true);
    } else if (_category == "-") {
      if (props.betslips[0] >= betchip) {
        setBetMoneyInput(Function.addComma(props.betslips[0]));
        setChipMin(true);
        setChipMax(false);
      } else {
        setBetMoneyInput(
          Function.addComma(Number(betchip) - Number(props.betslips[0]))
        );
        setChipMax(false);
        if (betchip == props.betslips[0]) setChipMin(true);
      }
    } else if (_category == "+") {
      if (props.betslips[props.betslips.length - 1] <= betchip) {
        setBetMoneyInput(
          Function.addComma(props.betslips[props.betslips.length - 1])
        );
        setChipMin(false);
        setChipMax(true);
      } else {
        setBetMoneyInput(
          Function.addComma(Number(betchip) + Number(props.betslips[0]))
        );
        setChipMin(false);
        if (betchip == props.betslips[props.betslips.length - 1])
          setChipMax(true);
      }
    }
  };

  // 사운드 BGM 설정
  const fn_bgm_turn = (_category) => {
    if (soundBgm) {
      Sound.setMuteSound_bgm(true);
      setSoundBgm(false);
      soundBgmFlag = false;
    } else {
      Sound.setMuteSound_bgm(false);
      setSoundBgm(true);
      soundBgmFlag = true;
    }
  };

  // 사운드 이펙트 설정
  function fn_effect_turn() {
    if (soundEffect) {
      Sound.setMuteSound_effect(true);
      setSoundEffect(false);
      soundEffectFlag = false;
    } else {
      Sound.setMuteSound_effect(false);
      setSoundEffect(true);
      soundEffectFlag = true;
    }
  }

  //
  const fn_volumn_setting = () => {
    let value = String(document.activeElement);

    if (value.search("HTMLIFrameElement") === -1) {
      if (soundBgmFlag === true) Sound.setMuteSound_bgm(false);
      else Sound.setMuteSound_bgm(true);

      if (soundEffectFlag === true) Sound.setMuteSound_effect(false);
      else Sound.setMuteSound_effect(true);
    }
  };

  return (
    <div>
      <div>
        칩 정보 :
        {props.betslips.map((array, index) => (
          <span
            onClick={() => {
              fn_chip_choice(array);
            }}
            key={index}
            value={array}
          >
            {Function.changeUnit(array, props.currency)}
          </span>
        ))}
        <br />
        기본 칩 :{betchip}
      </div>
      서브 메뉴 :
      <a
        onClick={fn_leftmenu_sub_view}
        className={"menu-btn " + (subMenu ? "open" : "")}
      >
        보기/닫기
      </a>
      {subMenu && (
        <div className="drop_set_box">
          <div className="inner">
            <ul>
              <li>
                <a className="ic-manual" onClick={fn_menual_view}>
                  {Lang.getLang("general", "guide", props.lang)}
                </a>
              </li>
              <li>
                <a className="ic-stats" onClick={fn_analysis_view}>
                  {Lang.getLang("general", "analysis", props.lang)}
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <p className="ic-bgm" href="#!">
                  {Lang.getLang("general", "sound_1", props.lang)}
                </p>
                <label className={soundBgm ? " switch-checked" : ""}>
                  <input
                    role="switch"
                    type="checkbox"
                    defaultChecked={soundBgm}
                    onChange={fn_bgm_turn}
                  />
                </label>
              </li>
              <li>
                <p className="ic-effect" href="#!">
                  {Lang.getLang("general", "sound_2", props.lang)}
                </p>
                <label className={soundEffect ? " switch-checked" : ""}>
                  <input
                    role="switch"
                    type="checkbox"
                    defaultChecked={soundEffect}
                    onChange={fn_effect_turn}
                  />
                </label>
              </li>
            </ul>
            <ul>
              <li>
                <p className="ic-bet1" href="#!">
                  {Lang.getLang("general", "betting_type1", props.lang)}
                </p>
                <label>
                  <input
                    name="betting_board"
                    type="radio"
                    defaultChecked="true"
                    onClick={() => {
                      fn_betting_board_turn(1);
                    }}
                  />
                </label>
              </li>
              <li>
                <p className="ic-bet2" href="#!">
                  {Lang.getLang("general", "betting_type2", props.lang)}
                </p>
                <label>
                  <input
                    name="betting_board"
                    type="radio"
                    onClick={() => {
                      fn_betting_board_turn(2);
                    }}
                  />
                </label>
              </li>
            </ul>
          </div>
        </div>
      )}
      {menualView && (
        <div id="manual-view" className="nav-tool-wrap type2">
          <div className="nav-collapse panel">
            <div className="panel-head">
              <h2 data-lang="general->guide"></h2>
              <div className="nav-close" onClick={fn_menual_close}>
                <i className="icon">닫기</i>
              </div>
            </div>
            <div className="panel-body">
              <div className="panel-content">
                <div
                  className="tab-content current"
                  dangerouslySetInnerHTML={{ __html: menualHtml }}
                ></div>
                <div className="menual_view_2 tab-content"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={"bet-type2" + (betBoardTypeExtend ? " active" : "")}>
        {!betBoardType && (
          <div className="price-bar">
            <button
              type="button"
              className="min-btn"
              onClick={() => {
                fn_betchip_change("min");
              }}
              data-lang="general->min"
            ></button>
            <button
              type="button"
              className={"minus-btn" + (chipMin ? " lock" : "")}
              onClick={() => {
                fn_betchip_change("-");
              }}
            >
              -
            </button>
            <input
              type="text"
              readOnly={chipInputReadOnly}
              onClick={fn_betting_board_detail_view}
              onChange={fn_betting_comma_change}
              value={betMoneyInput}
            />
            <button
              type="button"
              className={"plus-btn" + (chipMax ? " lock" : "")}
              onClick={() => {
                fn_betchip_change("+");
              }}
            >
              +
            </button>
            <button
              type="button"
              className="max-btn"
              onClick={() => {
                fn_betchip_change("max");
              }}
              data-lang="general->max"
            ></button>
          </div>
        )}
        {betBoardType && (
          <div className="function_bar">
            <div className="chip-select">
              {props.betslips.map((array, index) => (
                <div
                  className={
                    "chip chip_0" +
                    (index + 1) +
                    (chipActive === index + 1 ? " active" : "")
                  }
                  onClick={() => {
                    fn_chip_choice(array, index + 1);
                  }}
                  key={index}
                  value={array}
                >
                  {Function.changeUnit(array, props.currency)}
                </div>
              ))}
            </div>
          </div>
        )}
        {!betBoardType && betBoardTypeExtend && (
          <div className="input-form">
            <ul className="paper" id="bet_chip_list">
              {props.betslips.map((array, index) => (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      fn_betting_board_total_money(array);
                    }}
                    key={index}
                  >
                    {Function.changeUnit(array, props.currency)}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="coin">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("1");
                  }}
                >
                  1
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("2");
                  }}
                >
                  2
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("3");
                  }}
                >
                  3
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("4");
                  }}
                >
                  4
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("5");
                  }}
                >
                  5
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("6");
                  }}
                >
                  6
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("7");
                  }}
                >
                  7
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("8");
                  }}
                >
                  8
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("9");
                  }}
                >
                  9
                </button>
              </li>
            </ul>
            <ul className="txt">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("0");
                  }}
                >
                  0
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    fn_betting_board_total_money("00");
                  }}
                >
                  00
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn del"
                  onClick={() => {
                    fn_betting_board_total_money("-1");
                  }}
                >
                  {Lang.getLang("general", "del", props.lang)}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn confirm"
                  onClick={fn_betting_board_detail_close}
                >
                  {Lang.getLang("general", "confirm1", props.lang)}
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="btn-bar">
          <button type="button" className="btn cancle" onClick={fn_bet_cancel}>
            {Lang.getLang("general", "betcancel", props.lang)}
          </button>
          <button type="button" className="btn place" onClick={fn_bet_complete}>
            {Lang.getLang("general", "place_bet", props.lang)}
          </button>
          <button type="button" className="btn" onClick={fn_rebet}>
            {Lang.getLang("general", "rebet", props.lang)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Menu2);
