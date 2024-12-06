import React from "react";

// 하위 컴포넌트: 개별 결과 항목
const ResultItem = ({ round1, round2, name, score }) => {
  return (
    <li>
      <span>
        라운드{round1}({round2})
      </span>
      - <span>{name}</span>: <span>{score}점</span>
    </li>
  );
};

// 상위 컴포넌트: 결과 목록
export const RoundResults = ({ results }) => {
  // 점수 내림차순 정렬
  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  return (
    <div>
      <h1>게임 결과</h1>
      <ul>
        {sortedResults.map((result, index) => (
          <ResultItem
            key={result.id}
            round1={index}
            name={result.name}
            score={result.score}
          />
        ))}
      </ul>
    </div>
  );
};
