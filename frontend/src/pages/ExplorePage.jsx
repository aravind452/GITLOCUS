import React from "react";

const ExplorePage = () => {
  return (
    <div className="p-4">
      <div className="bg-glass max-w-2xl mx-auto border-2 p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap font-bold text-center justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/typescript.svg"
            alt="TypeScript"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
