import React from "react";
import Messages from "./Messages";
import Messagebox from "./Messagebox";
import Userlist from "./Userlist";

const Chatroom = ({ userName, logout, user }) => {
  return (
    <div className="Chatroom">
      <div className="Messages" id="shadow">
        <Messages userName={userName} />
      </div>
      <div className="Userlist">
        <Userlist className="userBox" />
      </div>
      <div className="Messagebox">
        <Messagebox className="messageBox" userName={userName} />
      </div>
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};

export default Chatroom;
