import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
const ExplorePage = () => {
  // https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=10
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  useEffect(() => {
    const savedLanguage = localStorage.getItem("explore_language");
    const savedRepos = localStorage.getItem("explore_repos");

    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    if (savedRepos) {
      setRepos(JSON.parse(savedRepos));
    }
  }, []);
  const exploreRepos = async (language) => {
    setLoading(true);
    setRepos([]);
    try {
      const res = await fetch(`/api/explore/repos/${language}`);
      const { repos } = await res.json();
      localStorage.setItem("explore_languages", language);
      localStorage.setItem("explore_repos", JSON.stringify(repos));
      setRepos(repos);
      setSelectedLanguage(language);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <div className="bg-glass max-w-2xl mx-auto  p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap font-bold text-center justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("javascript")}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("typescript")}
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("c++")}
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("python")}
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("java")}
          />
        </div>
        {repos.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span>{selectedLanguage.toUpperCase()} </span>Repositories
          </h2>
        )}
        {!loading && repos.length > 0 && (
          <Repos repos={repos} alwaysFullWidth />
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default ExplorePage;
