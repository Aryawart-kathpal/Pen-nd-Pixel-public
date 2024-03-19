import React, { useState } from "react";
import Profile from "./Profile";
import Notes from "./NotesCard";
import Button from "../../Components/Button";
import { FaBars } from "react-icons/fa6";

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
    {
      id: 4,
      title: "Note 4",
      description: "Description of Note 4",
      likes: "80",
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
    {
      id: 5,
      title: "Note 5",
      description: "Description of Note 5",
      likes: "20",
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
      id: 6,
      title: "Note 6",
      description: "Description of Note 6",
      likes: "0",
      comments: [
        {
          name: "Alex Flex",
          text: "Best Note ever",
        },
      ],
    },
  ]);
  return (
    <div className="flex max-h-screen">
      {/* <FaBars /> */}
      <Profile />
      <div className="flex flex-col items-center basis-[100%] p-4 ">
        <div className="banner bg-slate-800 text-white self-stretch h-48 flex items-center justify-center relative rounded-lg text-5xl font-semibold mb-2">
          MY NOTES
        </div>

        <div className="grid w-full gap-5 overflow-x-hidden overflow-y-scroll customScrollbar py-5 pt-3 max-h-[65%] sticky ">
          {notes.map((note) => {
            return <Notes {...note} key={note.id} />;
          })}
        </div>
        <div className=" flex justify-center mt-4">
              <Button
                text="Create new note"
                className="bg-slate-800 text-white p-2 border-2 rounded border-black"
              />
            </div>
      </div>
    </div>
  );
}
export default UserDasboard;
