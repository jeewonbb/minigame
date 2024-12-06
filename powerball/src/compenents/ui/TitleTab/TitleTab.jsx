import "./TitleTab.scss";
export const TitleTab = ({ tabItems, currentTab, onTabClick }) => {
  return (
    <header className="title-menu">
      {tabItems.map(({ id, text }) => (
        <TabItem
          key={id}
          isActive={currentTab === id}
          onClick={() => onTabClick(id)}
          text={text}
        ></TabItem>
      ))}
    </header>
  );
};

const TabItem = ({ text, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={isActive ? "current" : ""}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};
