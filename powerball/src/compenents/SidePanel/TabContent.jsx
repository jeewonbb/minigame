import { History } from "../pattern/History";
import { Analysis } from "../pattern/Analysis";
import { AnalysisBar } from "../pattern/AnalysisBar";
import { AnalysisPattern } from "../pattern/AnalysisPattern";
import { AnalysisPattern2 } from "../pattern/AnalysisPattern2";

export const TabContent1 = () => <AnalysisPattern />;

export const TabContent2 = () => <AnalysisPattern2 />;

export const TabContent3 = () => <AnalysisBar />;

export const TabContent4 = () => <Analysis></Analysis>;

export const TabContent5 = () => <History></History>;
