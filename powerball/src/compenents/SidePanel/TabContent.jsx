import { History } from "../pattern/History";
import { Analysis } from "../pattern/Analysis";
import { AnalysisBar } from "../pattern/AnalysisBar";

export const TabContent1 = () => {
  return (
    <>
      <p>1111</p>
    </>
  );
};

export const TabContent2 = () => {
  return (
    <>
      <p>22</p>
    </>
  );
};

export const TabContent3 = () => <AnalysisBar />;

export const TabContent4 = () => <Analysis></Analysis>;

export const TabContent5 = () => <History></History>;
