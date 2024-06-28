import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LikesPage from "./pages/LikesPage";
import SignupPage from "./pages/SignupPage";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex text-white">
      <Sidebar />
      <div className="max-w-5xl my-5 mx-auto flex-1 text-white  transition-all duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/likes" element={<LikesPage />} />
        </Routes>
        <Toaster />
        <footer>Footer</footer>
      </div>
    </div>
  );
}

export default App;
