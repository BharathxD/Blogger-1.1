import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useSelector } from "react-redux";

import Layout from "./components/layout/Layout";
import Posts from "./pages/posts/Posts";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import CreatePost from "./pages/posts/components/CreatePost";

function App() {
  const { isLoggedIn, username } = useSelector(
    (state: { Session: { isLoggedIn: boolean; username: string } }) => {
      return state.Session;
    }
  );
  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} />} />
        <Route
          path="/posts/create"
          element={<CreatePost isLoggedIn={isLoggedIn} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
