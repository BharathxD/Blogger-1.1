import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout";
import Posts from "./components/post/Posts";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import CreatePost from "./components/CreatePost/CreatePost";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<Home/>} />
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
