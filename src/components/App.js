import FriendsList from "./FriendsList";
import FormAddFriend from "./FormAddFriend";
import FormSplitBill from "./FormSplitBill";
import Button from "./Button";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleOpenAddFriend() {
    setAddFriendOpen((open) => !open);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setAddFriendOpen(false);
    setSelectedFriend(friend);
  }

  function handleSelection(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setAddFriendOpen(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {addFriendOpen && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleOpenAddFriend}>
          {addFriendOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
