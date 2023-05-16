import React from "react";
import useUser from "../lib/client/useUser";

const Home = () => {
  const { user, isLoading } = useUser();
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Home;
