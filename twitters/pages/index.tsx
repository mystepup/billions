import React from "react";
import useUser from "../lib/client/useUser";

const Home = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Hello {user?.name}</h1>
    </div>
  );
};

export default Home;
