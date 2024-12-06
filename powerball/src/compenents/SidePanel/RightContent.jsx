import { useState } from "react";
import { TitleTab } from "../ui/TitleTab/TitleTab";
import { TabContent4, TabContent5 } from "./TabContent";
import { RoundResults } from "./RoundResults";

export function RightContent() {
  const [currentTab, setCurrentTab] = useState({ tab3: "GameResults" });
  const tabItems3 = [
    { id: "GameResults", text: "라운드 결과" },
    { id: "betting", text: "베팅 내역" },
  ];

  const handleTabClick = (tabName, selectedTab) => {
    setCurrentTab((prev) => ({
      ...prev,
      [tabName]: selectedTab,
    }));
  };
  const tabContents = {
    GameResults: <TabContent4 />,
    betting: <TabContent5 />,
  };

  // 사용 예시
  const results = [
    { id: 1, name: "Player1", score: 95 },
    { id: 2, name: "Player2", score: 85 },
    { id: 3, name: "Player3", score: 100 },
  ];
  return (
    <div className="inner">
      <section>
        <TitleTab
          tabItems={tabItems3}
          currentTab={currentTab.tab3}
          onTabClick={(selectedTab) => {
            handleTabClick("tab3", selectedTab);
          }}
        />
        {/* <RoundResults results={results} /> */}
        {tabContents[currentTab.tab3] || <div>기본 내용</div>}
      </section>
    </div>
  );
}
