import React, { useState } from "react";
import Button from "../../Components/Button";
function Profile() {
  const [userData, setUserdata] = useState({
    name: "Random",
    img: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    followers: "10",
    following: "10",
    dateJoined: "13/03/2024",
  });
  return (
    <>
      <div className="w-[480px] mx-2 my-4 customSlideLeft  top-0">
        <div className="rounded-lg shadow-lg shadow-black pt-6 ml-2 min-h-[95svh]">
          <img
            src={userData.img}
            alt="Profile Picture"
            className="rounded-full w-24 h-24 mx-auto border-4 border-black mb-4"
          />
          <h2 className="text-black text-2xl font-bold text-center mb-2">
            {userData.name}
          </h2>
          <p className="text-black text-sm text-center mb-2">
            Joined on {userData.dateJoined}
          </p>
          <div className="flex justify-around text-white">
            <div>
              <p className="text-lg text-black font-semibold">
                {userData.followers}
              </p>
              <p className="text-xs text-black">Followers</p>
            </div>
            <div>
              <p className="text-lg text-black font-semibold">
                {userData.following}
              </p>
              <p className="text-xs text-black">Following</p>
            </div>
          </div>
          <div className="bg-white text-gray-800 rounded-lg py-10 px-6 max-h-[100%]">
            <h3 className="text-lg font-bold mb-2">About Me</h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis
              lectus at leo malesuada volutpat ut ut eros. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis
              lectus at leo malesuada volutpat ut ut eros.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis
              lectus at leo malesuada volutpat ut ut eros.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              
            </p>
            <div className="flex justify-end mt-4">
              <Button
                text="Edit Profile"
                className="bg-black text-white p-2 border-2 rounded border-black"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
