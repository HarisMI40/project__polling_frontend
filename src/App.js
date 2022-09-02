import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Utility/ProtectedRoute";
import { Layout } from "./Container/Index";
import {
  Login,
  PageNotFound,
  AllPoll,
  CreatePoll,
  Home,
  DetailPoll,
  Me,
  UserAllPoll,
  CreateContoh,
  UserVotePoll,
} from "./Pages/Index";
import User from "./Store/User";

function App() {
  const userContext = React.useContext(User);
  if (userContext.loading) return;
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Layout>
              {" "}
              <CreatePoll />
            </Layout>
          }
        />
        <Route
          exact
          path="/user/all"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <UserAllPoll />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/poll"
          element={
            <Layout>
              <AllPoll />
            </Layout>
          }
        />

        <Route
          exact
          path="/poll/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <DetailPoll />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/create-poll"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <CreatePoll />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/user/vote/:id"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <UserVotePoll />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/me"
          element={
            <ProtectedRoute>
              <Layout>
                {" "}
                <Me />{" "}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/create-contoh"
          element={
            <Layout>
              {" "}
              <CreateContoh />{" "}
            </Layout>
          }
        />
        <Route
          exact
          path="/login"
          element={userContext.isLogin ? <Navigate to="/poll" /> : <Login />}
        />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
