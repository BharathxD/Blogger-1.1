import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useSelector } from "react-redux";

import Layout from "./components/layout/Layout";
import Posts from "./components/post/Posts";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import CreatePost from "./components/CreatePost/CreatePost";

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
