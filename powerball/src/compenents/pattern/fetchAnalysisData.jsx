// api.js
import axios from "axios";

export const fetchAnalysisData = async (formattedDate) => {
  try {
    const response = await axios.post(
      "https://pl.pz.team/minigame/data/credit.php",
      new URLSearchParams({
        category: "analysis",
        gamecode: "powerball_dh",
        startdate: formattedDate,
        enddate: formattedDate,
        gametype: 1,
      })
    );

    const list = response.data.data.list;
    return {
      list: list.slice(0, 30),
      graphList: list.slice(0, 50).reverse(),
      patternList: list.slice(0, 50).reverse(),
    };
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    return {
      list: [],
      graphList: [],
      patternList: [],
    };
  }
};
