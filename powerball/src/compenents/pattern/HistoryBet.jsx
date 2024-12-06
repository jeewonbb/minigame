import React from "react";

const addComma = (num) => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function HistoryBet({ betcode, betvalue, betamount, winamount }) {
  return (
    <tr>
      <td>{`${betcode} ${betvalue}`}</td>
      <td>{addComma(betamount)}</td>
      <td className={winamount > 0 ? "winning" : undefined}>
        {addComma(winamount)}
      </td>
    </tr>
  );
}
