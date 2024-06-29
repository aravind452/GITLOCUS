import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import Repos from "../components/Repos";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(
    async (username = "aravind452") => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/profile/${username}`
        );
        const { userProfile, repos } = await res.json();

        setUserProfile(userProfile);

        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRepos(repos);
        // console.log(userProfile);
        // console.log("repos:", repos);
        return { userProfile, repos };
      } catch (error) {
        toast.error("Failed to fetch!", error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (event, username) => {
    event.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    const { userProfile, repos } = await getUserProfileAndRepos(username);
    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType("recent");
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === "stars") {
      const bool = repos.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      console.log(bool);
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }

    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className=" m-4 border-2 text-center p-2">
      HomePage
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
