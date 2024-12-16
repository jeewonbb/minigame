import React from "react";

function Game() {
  let lang = "ko"; // 파라미터에서 읽어야함
  let other_url =
    "&gametype=1&loadingvisible=true&resizable=false&useerrmsg=false&useclosemsg=false&usebetmsg=true&usebettime=true&resulttype=2";
  let game_url =
    "https://games.pz.team/powerball_dh/board/v2.0.0.8/anim.html?lang=" + lang;

  return (
    <>
      <div className="iframe-wrapper" style={{ textAlign: "center" }}>
        <iframe src={game_url} width="450" height="410" />
      </div>
    </>
  );
}

export default Game;
