import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const name = selectedFriend?.name;

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => +e.target.value >= 0 && setBill(+e.target.value)}
      />

      <label>🧍Your expenses</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          +e.target.value >= 0 &&
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />

      <label>🧑‍🤝‍🧑 {name}'s expenses</label>
      <input type="text" value={paidByFriend} disabled />

      <label>🤑 who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
