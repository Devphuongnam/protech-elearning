import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home";
import Signup from "../Login/Signup";
import PersonalPage from "../components/Page/PersonalPage/PersonalPage";
import CourseDetail from "../components/Page/course/CourseDetail";
import SearchPage from "../components/Page/SearchPage/SearchPage";
import Header from "../components/Header/Header";
import MyCourse from "../components/Page/mycoure/MyCourse";

const AuthLayout = () => {
  return <Outlet />;
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Header />,
      },
      {
        element: <Signup />,
        path: "/signup",
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <PersonalPage />,
        path: "/personal-page",
      },
      {
        element: <CourseDetail />,
        path: "/course/:id",
      },
      {
        element: <SearchPage />,
        path: "/search",
      },
      {
        element: <MyCourse />,
        path: "/my-course",
      },
    ],
  },
]);
