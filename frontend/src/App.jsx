import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LikesPage from "./pages/LikesPage";
import SignupPage from "./pages/SignupPage";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/Authcontext";

function App() {
  const { authUser, loading } = useAuthContext();
  if (loading) {
    return null;
  }
  console.log("authenticated user", authUser);
  return (
    <div className="flex text-white">
      <Sidebar />
      <div className="max-w-5xl my-5 mx-auto flex-1 text-white  transition-all duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/explore"
            element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/likes"
            element={authUser ? <LikesPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
        <footer>Footer</footer>
      </div>
    </div>
  );
}

export default App;
