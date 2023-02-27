import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useSelector } from "react-redux";

import Layout from "./components/layout/Layout";
import Posts from "./pages/posts/Posts";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import CreatePost from "./pages/posts/components/CreatePost";
import { ISessionState } from "./types/Session.types";
import PostPage from "./pages/posts/components/PostPage";
import EditPost from "./pages/posts/components/EditPost";
import PrivateRoutes from "./utils/PrivateRoutes";

interface State {
  Session: Pick<ISessionState, "isLoggedIn">;
}

function App() {
  const isLoggedIn = useSelector((state: State) => {
    return state.Session.isLoggedIn;
  });
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/posts/create"
            element={<CreatePost />}
          />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route
            path="/posts/edit/:id"
            element={<EditPost />}
          />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
