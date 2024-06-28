import React from "react";
import Search from "../components/Search";
import Repos from "../components/Repos";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Spinner from "../components/Spinner";
const HomePage = () => {
  return (
    <div className=" m-4 border-2 text-center p-2">
      HomePage
      <Search />
      <SortRepos />
      <div className="flex flex-col lg:flex-row justify-center items-start">
        <ProfileInfo />
        <Repos />
        <Spinner/>
      </div>
    </div>
  );
};

export default HomePage;
