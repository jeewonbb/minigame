import React from "react";

// 숫자에 콤마 추가 및 제거 유틸리티 함수
const formatNumber = (num) => {
  return num.toLocaleString("en-US");
};

export function HistoryBet({ betcode, betvalue, betamount, winamount }) {
  return (
    <tr>
      <td>
        {betcode} {betvalue}
      </td>
      <td>{formatNumber(betamount)}</td>
      <td className={winamount > 0 ? "winning" : undefined}>
        {formatNumber(winamount)}
      </td>
    </tr>
  );
}
