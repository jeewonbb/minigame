import { useState } from "react";

import Main from "./powerball_dh/betting/Main";
import Analysis from "./powerball_dh/analysis/Analysis";
import History from "./powerball_dh/history/History.jsx";

function App() {
  const [refresh, setRefresh] = useState("refresh");

  return (
    <>
      {/* <History /> */}
      <Analysis />
      {/* <Main setRefresh={setRefresh} /> */}
    </>
  );
}

export default App;
