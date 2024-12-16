import React, { useEffect, useState } from "react";
import axios from "axios";
import Game from "./Game";
import Bet from "./Bet";

let currency = "";
let betslips = [];
let betlimits = [];
let balance = 0;
let betchip = 0;
let betlimit_min = 0;
let betlimit_max = 0;
let bet_types = 0;
let game_token = "";
let end_time_grab = 0;

function Main(props) {
  useEffect(() => {
    api();
  }, []);

  const [data, setData] = useState([]);

  const api = async () => {
    let limit = [];
    await axios
      .post(
        "https://pl.pz.team/minigame/data/game.php",
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
        console.log("게임 정보 읽어옴", response.data);

        // setData(response.data.message);
        // console.log(data)
        end_time_grab =
          response.data.message.user_info.bet.betlimits.stop_bet_before;
        betslips = response.data.message.user_info.bet.betslip;
        betlimits = response.data.message.user_info.bet.betlimits.betlimit;
        setData(response.data.message.user_info.bet.betlimits.betlimit);
        betlimit_min = response.data.message.user_info.bet.betlimits.min;
        betlimit_max = response.data.message.user_info.bet.betlimits.max;
        balance = response.data.message.user_info.user.balance;
        currency = response.data.message.user_info.user.currency;
        game_token = response.data.message.game_token;
        bet_types = response.data.message.user_info.bet.betlimits.bet_types;
        betchip = betslips[0];
        console.log(betslips);
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log("실패", error);
      })
      .then(function () {});
  };

  return (
    <>
      <Game />
      <Bet
        setRefresh={props.setRefresh}
        betlimits={betlimits}
        balance={balance}
        betlimit_min={betlimit_min}
        betlimit_max={betlimit_max}
        betslips={betslips}
        betchip={betchip}
      />
    </>
  );
}

export default Main;
