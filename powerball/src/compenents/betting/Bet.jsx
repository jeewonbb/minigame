import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as Sound from "../../js/sound.js";
import * as Function from "../../function.js";
import "./Bet.scss";
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
let langcode = "ko";
let round_now = "";
let setinterval_status = "";
let bet_status = {
  1: { 1: { amount: [], active: [], picked: [], lock: [] } },
  2: { 2: { amount: [], active: [], picked: [], lock: [] } },
  3: { 3: { amount: [], active: [], picked: [], lock: [] } },
  4: { 4: { amount: [], active: [], picked: [], lock: [] } },
  5: { 5: { amount: [], active: [], picked: [], lock: [] } },
  6: { 6: { amount: [], active: [], picked: [], lock: [] } },
  8: {
    8: { amount: [], active: [], picked: [], lock: [] },
    9: { amount: [], active: [], picked: [], lock: [] },
    10: { amount: [], active: [], picked: [], lock: [] },
    11: { amount: [], active: [], picked: [], lock: [] },
  },
  12: {
    12: { amount: [], active: [], picked: [], lock: [] },
    15: { amount: [], active: [], picked: [], lock: [] },
  },
  13: { 13: { amount: [], active: [], picked: [], lock: [] } },
};

let bet_status_base = {
  1: { 1: { amount: [], active: [], picked: [], lock: [] } },
  2: { 2: { amount: [], active: [], picked: [], lock: [] } },
  3: { 3: { amount: [], active: [], picked: [], lock: [] } },
  4: { 4: { amount: [], active: [], picked: [], lock: [] } },
  5: { 5: { amount: [], active: [], picked: [], lock: [] } },
  6: { 6: { amount: [], active: [], picked: [], lock: [] } },
  8: {
    8: { amount: [], active: [], picked: [], lock: [] },
    9: { amount: [], active: [], picked: [], lock: [] },
    10: { amount: [], active: [], picked: [], lock: [] },
    11: { amount: [], active: [], picked: [], lock: [] },
  },
  12: {
    12: { amount: [], active: [], picked: [], lock: [] },
    15: { amount: [], active: [], picked: [], lock: [] },
  },
  13: { 13: { amount: [], active: [], picked: [], lock: [] } },
};
let bet_dividend = {
  1: { dividend: 0 },
  2: { dividend: 0 },
  3: { dividend: 0 },
  4: { dividend: 0 },
  5: { dividend: 0 },
  6: { dividend: 0 },
  8: { dividend: 0 },
  9: { dividend: 0 },
  10: { dividend: 0 },
  11: { dividend: 0 },
  12: { dividend: 0 },
  15: { dividend: 0 },
  13: { dividend: 0 },
};

function Bet(props) {
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
  useEffect(() => {
    fn_bet_init();
    clearInterval(setinterval_status);
    setinterval_status = setInterval(api_status, 0);
  }, [props]);

  const api_status = async () => {
    await axios
      .post(
        "https://pl.pz.team/minigame/data/status.php",
        new URLSearchParams({
          category: "status",
          gamecode: "powerball_dh",
          token:
            "GEdR9jerB1iReqIkgl%2bxeOzYGfoKymrwLLOe7%2fzMvCbENOcqNa%2brlf3cUKu64Bt1maCx8%2f2Yr5Y%2feU9EpaKnmzHH%2bYwQuxH9",
          gametype: 1,
          group: 1,
        })
      )
      .then(function (response) {
        console.log("성공1", response);
        console.log(response.data);
        let _res = response.data;

        fn_status_info(_res);
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log("실패", error);
      })
      .then(function () {});
  };

  Sound.playSound("bgm");
  // 베팅판 클릭

  const fn_status_info = (_res) => {
    if (end_time_grab == 0) end_time_grab = _res.stop_bet_before;
    begin_time = Math.floor(+new Date(_res.begin) / 1000);
    end_time = Math.floor(+new Date(_res.end) / 1000);
    now_time = Math.floor(+new Date() / 1000) + end_time_grab;

    if (_res.stop_evo_bet != undefined) {
      stop_evo_bet = _res.stop_evo_bet;
      cutting_cnt = _res.cutting_cnt;

      if (stop_evo_bet == true) {
        if (langcode == "ko")
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

        if (roundid_now == 288 && _res.roundid == 1) {
          props.setRefresh("refresh" + roundid_now);
          fn_api_ajax("balance", "");
          roundid_now = _res.roundid;
        }
        return;
      }

      if (now_time > end_time) {
        round_bet_possible = false;
        fn_bet_close();
      } else {
        if (end_time - now_time < 272) {
          round_bet_possible = true;
          fn_bet_open();
        }
      }
    } else {
      if (now_time > end_time) {
        round_bet_possible = false;
        fn_bet_close();
      } else {
        if (end_time - now_time < 272) {
          round_bet_possible = true;
          fn_bet_open();
        }
      }
    }

    if (roundid_now != _res.roundid && roundid_now != "") {
      setTimeout(() => {
        round_bet_possible = true;
        if (betlist_complete.length > 0) betlist_prev = betlist_complete;
        betlist_complete = [];
        fn_init();
        fn_bet_open();
        props.setRefresh("refresh" + roundid_now);
        fn_api_ajax("balance", "");
        bet_total = 0;
      }, 12000);
    }

    roundid_now = _res.roundid;
    round_now = _res.round;

    if (end_time - now_time > 0) {
      let _time_gab = end_time - now_time;
      let _time_gab_m = _time_gab;
      let min = parseInt(_time_gab / 60);
      let sec = parseInt(_time_gab - min * 60);
      console.log(min + ":" + sec);
    }
  };

  const fn_init = () => {
    bet_status = bet_status_base;
  };

  const fn_bet_open = () => {
    console.log("fn_bet_open");

    bet_status["1"]["1"]["lock"] = [false, false];
    bet_status["2"]["2"]["lock"] = [false, false];
    bet_status["3"]["3"]["lock"] = [false];
    bet_status["4"]["4"]["lock"] = [false, false];
    bet_status["5"]["5"]["lock"] = [false, false];
    bet_status["6"]["6"]["lock"] = [false, false];
    bet_status["8"]["8"]["lock"] = [false, false];
    bet_status["8"]["9"]["lock"] = [false];
    bet_status["8"]["10"]["lock"] = [false, false];
    bet_status["8"]["11"]["lock"] = [false];
    bet_status["12"]["12"]["lock"] = [false, false];
    bet_status["12"]["15"]["lock"] = [false, false];
    bet_status["13"]["13"]["lock"] = [false, false, false, false];
    bet_status["1"]["1"]["active"] = [false, false];
    bet_status["2"]["2"]["active"] = [false, false];
    bet_status["3"]["3"]["active"] = [false];
    bet_status["4"]["4"]["active"] = [false, false];
    bet_status["5"]["5"]["active"] = [false, false];
    bet_status["6"]["6"]["active"] = [false, false];
    bet_status["8"]["8"]["active"] = [false, false];
    bet_status["8"]["9"]["active"] = [false];
    bet_status["8"]["10"]["active"] = [false, false];
    bet_status["8"]["11"]["active"] = [false];
    bet_status["12"]["12"]["active"] = [false, false];
    bet_status["12"]["15"]["active"] = [false, false];
    bet_status["13"]["13"]["active"] = [false, false, false, false];
    bet_status["1"]["1"]["picked"] = [false, false];
    bet_status["2"]["2"]["picked"] = [false, false];
    bet_status["3"]["3"]["picked"] = [false];
    bet_status["4"]["4"]["picked"] = [false, false];
    bet_status["5"]["5"]["picked"] = [false, false];
    bet_status["6"]["6"]["picked"] = [false, false];
    bet_status["8"]["8"]["picked"] = [false, false];
    bet_status["8"]["9"]["picked"] = [false];
    bet_status["8"]["10"]["picked"] = [false, false];
    bet_status["8"]["11"]["picked"] = [false];
    bet_status["12"]["12"]["picked"] = [false, false];
    bet_status["12"]["15"]["picked"] = [false, false];
    bet_status["13"]["13"]["picked"] = [false, false, false, false];
    console.log(bet_status);
    for (var i = 0; i < betlist_complete.length; i++) {
      bet_status[betlist_complete[i].betgroup][betlist_complete[i].betcode][
        "active"
      ][betlist_complete[i].betvalue - 1] = true;
      bet_status[betlist_complete[i].betgroup][betlist_complete[i].betcode][
        "picked"
      ][betlist_complete[i].betvalue - 1] = true;
    }

    if (betlist.length > 0) {
      for (var i = 0; i < betlist.length; i++) {
        bet_status[betlist[i].betgroup][betlist[i].betcode]["active"][
          betlist[i].betvalue - 1
        ] = true;
        bet_status[betlist[i].betgroup][betlist[i].betcode]["picked"][
          betlist[i].betvalue - 1
        ] = true;
      }
    }

    setBetComplete(true);
    setBetCancel(true);
    setRebet(true);
  };

  const fn_bet_close = () => {
    console.log("fn_bet_close");

    bet_status["1"]["1"]["lock"] = [true, true];
    bet_status["2"]["2"]["lock"] = [true, true];
    bet_status["3"]["3"]["lock"] = [true];
    bet_status["4"]["4"]["lock"] = [true, true];
    bet_status["5"]["5"]["lock"] = [true, true];
    bet_status["6"]["6"]["lock"] = [true, true];
    bet_status["8"]["8"]["lock"] = [true, true];
    bet_status["8"]["9"]["lock"] = [true];
    bet_status["8"]["10"]["lock"] = [true, true];
    bet_status["8"]["11"]["lock"] = [true];
    bet_status["12"]["12"]["lock"] = [true, true];
    bet_status["12"]["15"]["lock"] = [true, true];
    bet_status["13"]["13"]["lock"] = [true, true, true, true];
    bet_status["1"]["1"]["amount"] = [0, 0];
    bet_status["2"]["2"]["amount"] = [0, 0];
    bet_status["3"]["3"]["amount"] = [0];
    bet_status["4"]["4"]["amount"] = [0, 0];
    bet_status["5"]["5"]["amount"] = [0, 0];
    bet_status["6"]["6"]["amount"] = [0, 0];
    bet_status["8"]["8"]["amount"] = [0, 0];
    bet_status["8"]["9"]["amount"] = [0];
    bet_status["8"]["10"]["amount"] = [0, 0];
    bet_status["8"]["11"]["amount"] = [0];
    bet_status["12"]["12"]["amount"] = [0, 0];
    bet_status["12"]["15"]["amount"] = [0, 0];
    bet_status["13"]["13"]["amount"] = [0, 0, 0, 0];

    console.log(bet_status);
    for (var i = 0; i < betlist_complete.length; i++) {
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
        bet_status[betlist[i].betgroup][betlist[i].betcode]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
      }
    }

    setBetComplete(false);
    setBetCancel(false);
    setRebet(false);
  };

  const fn_bet_click = (_group, _code, _value, _rebet) => {
    console.log(_group);
    console.log(_code);
    console.log(_value);

    if (round_bet_possible === false) return;

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

    if (_rebet === true) _betchip_pick = _betchip_pick;
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
    console.log(betlimits);
    for (let i = 0; i < betlimits.length; i++) {
      if (bet_dividend[betlimits[i].betcode] !== undefined)
        bet_dividend[betlimits[i].betcode].dividend = betlimits[i].dividend;
    }
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
  const fn_api_ajax = (category, _data) => {
    axios
      .post(
        "https://pl.pz.team/minigame/data/game.php",
        new URLSearchParams({
          category: category,
          token:
            "k7aTkaJ%2ByeMSfPCVHPxM2jnb49Twx%2BOUTu0ECcsLRLZnRnYzgd%2FERYTtP69OhceDocZUDcrTleitGjoyOO3F89CD%2BzLSQ2Ww2rCmMfb1p%2FH%2Fzr%2BYp%2BBn4mP6eC%2FfUoM4RpMq1BiTDIg%2BbskJ8UGTXPfg%2BQEYatVOcXSjZ7yn0Jq6g2fhboLDOD4yKvSGFWfnnjUKvSjDktI5In4WzuLBVh%2Ft2jj18nPpRZKYPSYRPhtSLDiBt08dMDpd%2BIXhvEZxmy8r0Pz7gnHtt5XR7mpCyHY41t5%2F5YnLUyOJU4hGVof0GkYLZt2nyVc2gxdzNpqAKvZQBOFpzTI%2BiAPPCMakHmI2WmaP8EteEQxMbf4qI7nyGSY7U6VSR%2FNYBnxuNwG6pKC%2Far5xR4QiXLPNRAQOFbcpgBkiLRL5xJi455WNnsJJGRHNnDc0MPEzKHJdqMlz%2BTdkvRF5QrAqLrQJ7crqqlEC2zoylRV3kZunfSAn%2BCj%2F%2BOIolYC69Tw0sQbaUgq42XIBX0rq0h6WUayRmoLn5asjMJSkfu6dyOZ%2FRNy3oqKBwt6DXkMfFmEhO0VzZ5FfxvipZEdnLBfPhahVO4l01TdypoeGtIcmcffF%2BA6zCQ4WpJMJktUsueJ36pDr6pDRrJ%2FPvCo3VpRqu6fL1garabOYMTwkk0XGX%2B5MLbG6t%2F45X3xwUCEs2KVANw6AWiSWXOjl0lvs9Y5bbqDckSR4tlMW0JTm%2FwbcVqnUEYkOlg1syu8CgQv96c0vHvznqICXNh9nhUzDgIAGmz7oo%2BrTEBFw4ZRiPEIqnj79K%2Fz5qK9l0F3naYla2%2BAfZhpW4Xnd35n4gcKWsxVowdEx5vsNIPlWZPjMTI%2BIdRCY3iExSCNf5JZPkXVW%2FiGZCJrtxRJHBrj9T6SO%2B7FksOINcSzxJhCBzJUxofrp%2B%2FT3bTYVlUOMriGkFZHPpNSkjQipcYEmnDVFztsjXFE8Fk3sn0o97RATFxNxJngXrHyH82n7AzjEQGKE208eCRhV5ZV%2BrI%2FjhXD%2BZXgxsOt3reykNFBTqpZurAx2GI3wvqNydyCdZF7bQxCR5eDVCg9Mlboa0lIArdeLzG%2BUO5wd4azl5tfS78Bhz7qtQvvUAOHQs9pWe%2FRUGN80cHSJb0GcRuRO890ccNiy3tonqT6AifkmH1B2p0LxriXRAi%2BS1b3L8zRIXdMUDZsHpbuWhsHmWjJKV4gQwzjJCGiFfk4Krt%2BxGf9TtTiKNNjdh9lzU8movVhJ9cytvUqGj5MGVqLj0AA4wVq0uv7JPPsvVPqxMJ6vDnhtjCS3W4QQQQzumyOhpXXa0oXcg8p%2BOv4ML8ICVLQZKJZgYLPIEbZCTonjvYRNx%2Fx5o9ezs2Y2UylZ8%2BH1y77Eb1fZVDL8nFBtKr%2FjpkMzOM0Cua6CW%2FnLMjF19pjSM%2Bq60drBpzlhqkd5nyfzerm8%2B660vymlv%2BgrhSDldFNS1us2c0N3wG0PAqlhiXOLfc0Pn3RAGZDvvGEy85aQVbb7QANHFSqgnChUguGOvZpM9vjWbBcolfRjZ5M918psscnS0N1RmzSOkTDausVKeIIJ6JdqZoZgwxuvSFM2T1POs67OrFxBgN1e%2FkwloVSNVfUbtZh8JgtKdxPCb23Oic4QcK52Zd26rIpgTCS%2B74LvDlctu%2FOYX%2FmMJjuaWfeUvfsekTRPci2thh7BvEcXWVQE1M5midI7Nm%2B0YbSUZ1Wa2DZ3ykQIK1%2B3ta%2BOjFPaOu3%2FZiduNX3imyGzkMn9%2FW2G5TFTcXUlamhYPlUV2ynX4ZVTO%2Be22hzTSMTv1TUPKisIVmHYeNFvUcugYYKzyT2J7RQf8G2VfGbfzaUD3U4hfFxclF%2BNkt5IjLByn4af%2FCn4JQw06aEMaNQgPhE8GqvFnFl4cUuki8a8oqEBa0wp3lz%2FK3ulaGKBtDlmlQJe6jkcli5tuoWjtarQP%2BBrKUfhghaCq%2BZDnwSuiuft2pRmb0jFBQq36izLP%2FisOyyuyY7luqLpqpQzOCkrad8Un98LFhpc0pOJ40lxJSUP1rUGHpVW2UgI1xEKFtzTV0%2B64FXL%2FBla1idVA7vtnJUBv09sgAMpZncRq5XSk3YaIgmSl9qCLy2vVryv",
          gamecode: "powerball_dh",
          data: _data,
          gametype: 1,
          group: 1,
        })
      )
      .then(function (response) {
        console.log("성공", response);
        console.log(response.data.message);
        if (category === "bet") fn_game_bet(response.data.message);
        else setBalance(response.data.message.user_balance.credit);
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log("실패", error);
      })
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

      if (bet_types === "bothside") {
        bet_status[_betgroup][betlist_complete[i].betcode]["lock"][
          betlist_complete[i].betvalue - 1
        ] = true;
      } else {
        if (_betgroup === 8) {
          bet_status[_betgroup]["8"]["lock"][betlist[i].betvalue - 1] = true;
          bet_status[_betgroup]["9"]["lock"][betlist[i].betvalue - 1] = true;
          bet_status[_betgroup]["10"]["lock"][betlist[i].betvalue - 1] = true;
          bet_status[_betgroup]["11"]["lock"][betlist[i].betvalue - 1] = true;
        } else if (_betgroup === 12) {
          bet_status[_betgroup]["12"]["lock"][betlist[i].betvalue - 1] = true;
          bet_status[_betgroup]["15"]["lock"][betlist[i].betvalue - 1] = true;
        } else {
          bet_status[_betgroup][betlist[i].betcode]["lock"][
            betlist[i].betvalue - 1
          ] = true;
        }
      }
    }

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
    if (rebet === false) return;

    var _exists_code_flag = -1;

    Sound.playSound("button_rebet", false, 0);

    if (betlist_prev.length === 0) {
      fn_alert(getLang("general", "notHavePrevBet"));
      return;
    }

    for (var i = 0; i < betlist.length; i++) {
      if (betlist[i].betgroup === 8) {
        bet_status[betlist[i].betgroup]["8"]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup]["9"]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup]["10"]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup]["11"]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup]["8"]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
        bet_status[betlist[i].betgroup]["9"]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
        bet_status[betlist[i].betgroup]["10"]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
        bet_status[betlist[i].betgroup]["11"]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
      } else if (betlist[i].betgroup === 12) {
        bet_status[betlist[i].betgroup]["12"]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup]["15"]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup]["12"]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
        bet_status[betlist[i].betgroup]["15"]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
      } else {
        bet_status[betlist[i].betgroup][betlist[i].betcode]["active"][
          betlist[i].betvalue - 1
        ] = false;
        bet_status[betlist[i].betgroup][betlist[i].betcode]["amount"][
          betlist[i].betvalue - 1
        ] = 0;
      }
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
          true
        );
      }
    }

    // fn_bet_calculate();
    // fn_tooltip();
  };

  // 베팅 칩 선택
  const fn_chip_choice = (value) => {
    Sound.playSound("button_slip", false, 0);

    setBetchip(Number(value));
  };

  const formatCurrency = (value) => {
    if (value >= 10000) {
      return `${value / 10000}만원`;
    } else if (value >= 1000) {
      return `${value / 1000}천원`;
    }
    return `${value}원`;
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleChipClick = (array, index) => {
    setActiveIndex(index);
    fn_chip_choice(array);
  };

  return (
    <div className="bet-area">
      <div className="pick-board">
        <p className="tit_pattern">파워볼</p>
        <div className="pick-grid column-4">
          <div className="pick_button">
            <button
              className={
                "btn under" +
                (bet_status["5"]["5"]["active"][0] ? " active" : "") +
                (bet_status["5"]["5"]["picked"][0] ? " picked" : "") +
                (bet_status["5"]["5"]["lock"][0] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(5, 5, 1);
              }}
              group="5"
            >
              <p>P홀</p>
              <small>{bet_dividend["5"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["5"]["5"]["amount"][0]}
              </div>
            </button>
          </div>
          <div className="pick_button">
            <button
              className={
                "btn over" +
                (bet_status["5"]["5"]["active"][1] ? " active" : "") +
                (bet_status["5"]["5"]["picked"][1] ? " picked" : "") +
                (bet_status["5"]["5"]["lock"][1] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(5, 5, 2);
              }}
              group="5"
            >
              <p>P짝</p>
              <small>{bet_dividend["5"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["5"]["5"]["amount"][1]}
              </div>
            </button>
          </div>

          <div className="pick_button">
            <button
              className={
                "btn under" +
                (bet_status["4"]["4"]["active"][0] ? " active" : "") +
                (bet_status["4"]["4"]["picked"][0] ? " picked" : "") +
                (bet_status["4"]["4"]["lock"][0] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(4, 4, 1);
              }}
              group="4"
            >
              <p>P언더</p>
              <small>{bet_dividend["4"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["4"]["4"]["amount"][0]}
              </div>
            </button>
          </div>
          <div className="pick_button">
            <button
              className={
                "btn over" +
                (bet_status["4"]["4"]["active"][1] ? " active" : "") +
                (bet_status["4"]["4"]["picked"][1] ? " picked" : "") +
                (bet_status["4"]["4"]["lock"][1] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(4, 4, 2);
              }}
              group="4"
            >
              <p>P오버</p>
              <small>{bet_dividend["4"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["4"]["4"]["amount"][1]}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="pick-board">
        <p className="tit_pattern">일반볼</p>
        <div className="pick-grid column-4">
          <div className="pick_button">
            <button
              className={
                "btn odd" +
                (bet_status["1"]["1"]["active"][0] ? " active" : "") +
                (bet_status["1"]["1"]["picked"][0] ? " picked" : "") +
                (bet_status["1"]["1"]["lock"][0] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(1, 1, 1);
              }}
              group="1"
            >
              <p>홀</p>
              <small>{bet_dividend["1"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["1"]["1"]["amount"][0]}
              </div>
            </button>
          </div>
          <div className="pick_button">
            <button
              className={
                "btn even" +
                (bet_status["1"]["1"]["active"][1] ? " active" : "") +
                (bet_status["1"]["1"]["picked"][1] ? " picked" : "") +
                (bet_status["1"]["1"]["lock"][1] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(1, 1, 2);
              }}
              group="1"
            >
              <p>짝</p>
              <small>{bet_dividend["1"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["1"]["1"]["amount"][1]}
              </div>
            </button>
          </div>

          <div className="pick_button">
            <button
              className={
                "btn under" +
                (bet_status["6"]["6"]["active"][0] ? " active" : "") +
                (bet_status["6"]["6"]["picked"][0] ? " picked" : "") +
                (bet_status["6"]["6"]["lock"][0] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(6, 6, 1);
              }}
              group="6"
            >
              <p>언더</p>
              <small>{bet_dividend["6"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["6"]["6"]["amount"][0]}
              </div>
            </button>
          </div>
          <div className="pick_button">
            <button
              className={
                "btn over" +
                (bet_status["6"]["6"]["active"][1] ? " active" : "") +
                (bet_status["6"]["6"]["picked"][1] ? " picked" : "") +
                (bet_status["6"]["6"]["lock"][1] ? " lock" : "")
              }
              onClick={(e) => {
                fn_bet_click(6, 6, 2);
              }}
              group="6"
            >
              <p>오버</p>
              <small>{bet_dividend["6"]["dividend"]}</small>
              <div className="bet_monedy">
                {bet_status["6"]["6"]["amount"][1]}
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="function_bar">
        <div className="f_left">
          <div
            className={"unit_btn" + (betCancel ? "" : " disabled")}
            onClick={fn_bet_cancel}
          >
            <div className="icon">
              <i className="cancel-betting"></i>
            </div>
            <p>실행취소</p>
          </div>
          <div
            className={"unit_btn" + (rebet ? "" : " disabled")}
            onClick={fn_rebet}
          >
            <div className="icon">
              <i className="re-betting"></i>
            </div>
            <p>재베팅</p>
          </div>
        </div>
        <div className="betting_chip">
          <div className="select-wrap">
            {props.betslips.map((array, index) => (
              <div
                className={`chip chip_${index + 1}`}
                onClick={() => fn_chip_choice(array)}
              >
                <span>{formatCurrency(array)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="f_right">
          <div
            className={
              "unit_btn" +
              (betComplete ? "" : " disabled") +
              (betCompleteActive ? " active" : "")
            }
            onClick={fn_bet_complete}
          >
            <div className="icon">
              <i className="bet_confirm"></i>
            </div>
            <p>베팅확인</p>
          </div>
        </div>
      </div> */}

      <div className="function-bar">
        <div className="betting-chip">
          {props.betslips.map((array, index) => (
            <div
              className={`chip chip_${index + 1} ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleChipClick(array, index)}
            >
              <span>{formatCurrency(array)}</span>
            </div>
          ))}
        </div>
        {/* {betchip} */}
        <div className="btn-bar">
          <button
            type="button"
            className={"unit_btn" + (betCancel ? "" : " disabled")}
            onClick={fn_bet_cancel}
          >
            실행취소
          </button>
          <button
            type="button"
            className={`betComplete ? "" : " disabled") +
              (betCompleteActive ? " active" : ""`}
            onClick={fn_bet_complete}
          >
            Place Bet
          </button>
          <button
            type="button"
            className={"unit_btn" + (rebet ? "" : " disabled")}
            onClick={fn_rebet}
          >
            재베팅
          </button>
        </div>
      </div>

      <div className="amount_bar">
        <div className="read_only">
          <div className="info_name">BET</div>
          <div className="info_amount">{bet_total}</div>
        </div>
        <div className="read_only">
          <div className="info_name">WIN</div>
          <div className="info_amount">{win_money}</div>
        </div>
        <div className="read_only">
          <div className="info_name">CREDIT</div>
          <div className="info_amount">
            {Function.changeUnit_tofixed(balance)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bet;
