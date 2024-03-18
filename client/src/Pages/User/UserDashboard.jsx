import React, { useState } from "react";
import Profile from "./Profile";
import Notes from "./NotesCard";

function UserDasboard() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note 1",
      description: "Description of Note 1",
      likes: "4",
      comments: [
        {
          name: "Alex Flex",
          text: "Best Note ever",
        },
        {
          name: "Alex Flex",
          text: "Best Note ever",
        },
        {
          name: "Alex Flex",
          text: "Best Note ever",
        },
      ],
    },
    {
      id: 2,
      title: "Note 2",
      description: "Description of Note 2",
      likes: "56",
      comments: [],
    },
    {
      id: 3,
      title: "Note 3",
      description: "Description of Note 3",
      likes: "90",
      comments: [
        {
          name: "Alex Flex",
          text: "Best Note ever",
        },
        {
          name: "Alex Flex",
          text: "Best Note ever",
        },
      ],
    },
  ]);
  return (
    <div className="flex">
      <Profile />
      <div className="flex flex-col items-center basis-[100%] p-4">
        <div className="banner bg-slate-600 text-white self-stretch h-52 flex items-center justify-center relative rounded-lg text-5xl font-semibold">
          MY NOTES
        </div>
        <div className="flex flex-col items-start gap-5">
          {notes.map((note) => {
            return (
              <Notes
                {...note}
                key={note.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default UserDasboard;
