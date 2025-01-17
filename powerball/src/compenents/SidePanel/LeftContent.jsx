import { useState } from "react";
import { TitleTab } from "../ui/TitleTab/TitleTab";
import { TabContent1, TabContent2, TabContent3 } from "./TabContent";

export function LeftContent() {
  const [currentTabs, setCurrentTabs] = useState({
    tab1: "result1",
    tab2: "realtimedistribution",
  });

  const handleTabClick = (tabName, selectedTab) => {
    setCurrentTabs((prev) => ({
      ...prev,
      [tabName]: selectedTab,
    }));
  };

  //const renderContent = ()=>{}

  const tabItems1 = [
    { id: "result1", text: "파워볼" },
    { id: "result2", text: "일반볼" },
  ];
  const tabItems2 = [{ id: "realtimedistribution", text: "실시간 분포도" }];
  const tabContents = {
    result1: <TabContent1 />,
    result2: <TabContent2 />,
    realtimedistribution: <TabContent3 />,
  };
  return (
    <div className="inner">
      <section>
        <TitleTab
          tabItems={tabItems1}
          currentTab={currentTabs.tab1}
          onTabClick={(selectedTab) => {
            handleTabClick("tab1", selectedTab);
          }}
        />
        {tabContents[currentTabs.tab1] || <div>기본 내용11</div>}
      </section>
      <section>
        <TabContent3 />
      </section>

      <footer>
        <p className="copyright">
          Copyright ©2024.All Rights Reserved By SKYCITY
        </p>
      </footer>
    </div>
  );
}
