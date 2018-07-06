import React from "react";
import Login from "./Login";
import Register from "./Register";

const Account = ({ login, register }) => {
  return (
    <div>
      <Login login={login} />
      <Register register={register} />
      {/* <Logout /> */}
    </div>
  );
};

export default Account;
